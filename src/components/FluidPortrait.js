"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const VERTEX = /* glsl */ `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform sampler2D uTexture;
  uniform vec2 uMouse;       // container uv [0,1], y already flipped
  uniform float uHover;      // 0..1 eased
  uniform vec2 uResolution;  // px
  uniform float uImageAspect;
  varying vec2 vUv;

  vec4 permute(vec4 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 1.0 / 7.0;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
  }

  void main() {
    float contAspect = uResolution.x / uResolution.y;

    // cover-fit so the portrait fills the box on any aspect ratio
    vec2 uv = vUv;
    if (contAspect > uImageAspect) {
      uv.y = (uv.y - 0.5) * (uImageAspect / contAspect) + 0.5;
    } else {
      uv.x = (uv.x - 0.5) * (contAspect / uImageAspect) + 0.5;
    }

    // aspect-corrected distance from cursor so the influence stays circular
    vec2 aspect = vec2(contAspect, 1.0);
    float d = distance(vUv * aspect, uMouse * aspect);
    float influence = smoothstep(0.34, 0.0, d);

    // flowing simplex field
    float t = uTime * 0.16;
    float scale = 3.0;
    float nx = snoise(vec3(uv * scale, t));
    float ny = snoise(vec3(uv * scale + 100.0, t));
    vec2 flow = vec2(nx, ny);

    float ampIdle = 0.006;
    float ampHover = 0.055;
    float amp = ampIdle + influence * uHover * ampHover;
    vec2 disp = flow * amp;

    // chromatic aberration: split channels along the flow direction
    float ca = 0.0015 + influence * uHover * 0.013;
    vec2 caDir = normalize(flow + 0.0001) * ca;

    vec2 baseUv = uv + disp;
    float r = texture2D(uTexture, baseUv + caDir).r;
    float g = texture2D(uTexture, baseUv).g;
    float b = texture2D(uTexture, baseUv - caDir).b;
    float a = texture2D(uTexture, baseUv).a;

    vec3 color = vec3(r, g, b);

    // blue / magenta rim glow on the high-displacement areas
    float edge = clamp(length(disp) * 28.0, 0.0, 1.0) * (0.35 + 0.65 * uHover);
    vec3 blue = vec3(0.25, 0.45, 1.0);
    vec3 magenta = vec3(1.0, 0.2, 0.7);
    color += edge * mix(blue, magenta, nx * 0.5 + 0.5) * 0.35;

    gl_FragColor = vec4(color, a);
  }
`;

const PARTICLE_COLORS = [
  [130, 170, 255],
  [255, 120, 205],
  [235, 235, 255],
];

export default function FluidPortrait({ src, alt = "", className = "", sizes = "(max-width: 768px) 80vw, 40vw" }) {
  const containerRef = useRef(null);
  const glHolderRef = useRef(null);
  const particleCanvasRef = useRef(null);
  const [interactive, setInteractive] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const hoverOk = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setInteractive(hoverOk && !reduced);
  }, []);

  useEffect(() => {
    if (!interactive) return;

    const container = containerRef.current;
    const glHolder = glHolderRef.current;
    const particleCanvas = particleCanvasRef.current;
    if (!container || !glHolder || !particleCanvas) return;

    let disposed = false;
    let dispose = () => {};

    import("ogl")
      .then(({ Renderer, Program, Mesh, Triangle, Texture, Vec2 }) => {
        if (disposed) return;

        let renderer;
        try {
          renderer = new Renderer({
            dpr: Math.min(window.devicePixelRatio || 1, 2),
            alpha: true,
          });
        } catch (err) {
          setInteractive(false);
          return;
        }

        const gl = renderer.gl;
        gl.clearColor(0, 0, 0, 0);
        gl.canvas.style.position = "absolute";
        gl.canvas.style.inset = "0";
        gl.canvas.style.width = "100%";
        gl.canvas.style.height = "100%";
        glHolder.appendChild(gl.canvas);

        const geometry = new Triangle(gl);
        const texture = new Texture(gl, {
          generateMipmaps: false,
          wrapS: gl.CLAMP_TO_EDGE,
          wrapT: gl.CLAMP_TO_EDGE,
        });

        const program = new Program(gl, {
          vertex: VERTEX,
          fragment: FRAGMENT,
          transparent: true,
          uniforms: {
            uTime: { value: 0 },
            uTexture: { value: texture },
            uMouse: { value: new Vec2(0.5, 0.5) },
            uHover: { value: 0 },
            uResolution: { value: new Vec2(1, 1) },
            uImageAspect: { value: 1 },
          },
        });
        const mesh = new Mesh(gl, { geometry, program });

        const img = new window.Image();
        img.crossOrigin = "anonymous";
        img.src = src;
        img.onload = () => {
          if (disposed) return;
          texture.image = img;
          program.uniforms.uImageAspect.value =
            img.naturalWidth / img.naturalHeight;
          setReady(true);
        };

        const pctx = particleCanvas.getContext("2d");
        const resize = () => {
          const w = container.clientWidth;
          const h = container.clientHeight;
          if (!w || !h) return;
          renderer.setSize(w, h);
          program.uniforms.uResolution.value.set(w, h);
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          particleCanvas.width = Math.round(w * dpr);
          particleCanvas.height = Math.round(h * dpr);
          particleCanvas.style.width = `${w}px`;
          particleCanvas.style.height = `${h}px`;
          pctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        resize();

        const ro = new ResizeObserver(resize);
        ro.observe(container);

        const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
        let hover = 0;
        let hoverTarget = 0;
        let particles = [];

        const spawn = (px, py) => {
          for (let i = 0; i < 3; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 0.3 + Math.random() * 1.1;
            const c = PARTICLE_COLORS[(Math.random() * PARTICLE_COLORS.length) | 0];
            particles.push({
              x: px,
              y: py,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed - 0.25,
              life: 1,
              decay: 0.012 + Math.random() * 0.022,
              size: 0.8 + Math.random() * 2.4,
              c,
            });
          }
          if (particles.length > 420) particles = particles.slice(-420);
        };

        const drawParticles = (w, h) => {
          pctx.clearRect(0, 0, w, h);
          for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vx *= 0.95;
            p.vy *= 0.95;
            p.life -= p.decay;
            if (p.life <= 0) {
              particles.splice(i, 1);
              continue;
            }
            pctx.globalAlpha = Math.max(0, p.life) * 0.9;
            pctx.fillStyle = `rgb(${p.c[0]}, ${p.c[1]}, ${p.c[2]})`;
            pctx.beginPath();
            pctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            pctx.fill();
          }
          pctx.globalAlpha = 1;
        };

        const onMove = (e) => {
          const rect = container.getBoundingClientRect();
          const lx = e.clientX - rect.left;
          const ly = e.clientY - rect.top;
          mouse.tx = lx / rect.width;
          mouse.ty = ly / rect.height;
          spawn(lx, ly);
        };
        const onEnter = () => {
          hoverTarget = 1;
        };
        const onLeave = () => {
          hoverTarget = 0;
        };
        container.addEventListener("pointermove", onMove);
        container.addEventListener("pointerenter", onEnter);
        container.addEventListener("pointerleave", onLeave);

        let inView = true;
        const io = new IntersectionObserver(
          ([entry]) => {
            inView = entry.isIntersecting;
          },
          { threshold: 0 }
        );
        io.observe(container);

        let visible = true;
        const onVisibility = () => {
          visible = !document.hidden;
        };
        document.addEventListener("visibilitychange", onVisibility);

        const start = performance.now();
        let raf = 0;
        const update = (now) => {
          raf = requestAnimationFrame(update);
          if (!inView || !visible) return;

          const t = (now - start) * 0.001;
          mouse.x += (mouse.tx - mouse.x) * 0.1;
          mouse.y += (mouse.ty - mouse.y) * 0.1;
          hover += (hoverTarget - hover) * 0.08;

          program.uniforms.uTime.value = t;
          program.uniforms.uMouse.value.set(mouse.x, 1.0 - mouse.y);
          program.uniforms.uHover.value = hover;
          renderer.render({ scene: mesh });

          drawParticles(container.clientWidth, container.clientHeight);
        };
        raf = requestAnimationFrame(update);

        dispose = () => {
          cancelAnimationFrame(raf);
          ro.disconnect();
          io.disconnect();
          document.removeEventListener("visibilitychange", onVisibility);
          container.removeEventListener("pointermove", onMove);
          container.removeEventListener("pointerenter", onEnter);
          container.removeEventListener("pointerleave", onLeave);
          const lose = gl.getExtension("WEBGL_lose_context");
          if (lose) lose.loseContext();
          if (gl.canvas.parentNode === glHolder) {
            glHolder.removeChild(gl.canvas);
          }
        };
      })
      .catch(() => {
        setInteractive(false);
      });

    return () => {
      disposed = true;
      dispose();
    };
  }, [interactive, src]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes={sizes}
        className={`object-cover transition-opacity duration-700 ${
          interactive && ready ? "opacity-0" : "opacity-100"
        }`}
      />
      <div ref={glHolderRef} className="absolute inset-0" aria-hidden="true" />
      <canvas
        ref={particleCanvasRef}
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      />
    </div>
  );
}
