"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { dsFonts } from "@/lib/designSystem";

const socials = [
  {
    label: "Email",
    href: "mailto:yvettehuang.design@gmail.com",
    img: "/icon_email.png",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/yenyi-huang",
    external: true,
    img: "/icon_linkedin.png",
  },
  {
    label: "GitHub",
    href: "https://github.com/YvetteHuang",
    external: true,
    img: "/icon_github.png",
  },
];

// Pages whose content sits on a light background use the light footer.
const LIGHT_FOOTER_ROUTES = ["/work/design-system"];

export default function Footer({ variant }) {
  const pathname = usePathname();
  const resolvedVariant =
    variant ?? (LIGHT_FOOTER_ROUTES.includes(pathname) ? "light" : "dark");
  const isLight = resolvedVariant === "light";

  return (
    <footer
      className={`${dsFonts.body.className} mt-auto flex flex-col items-center justify-center gap-2 px-6 py-16 text-center ${
        isLight ? "bg-white" : "bg-black"
      }`}
    >
      <Image
        src="/yen_logo.svg"
        alt="YEN"
        width={72}
        height={54}
        className={`h-[54px] w-auto object-contain ${isLight ? "brightness-0" : ""}`}
        unoptimized
      />
      <p
        className={`text-sm font-light ${isLight ? "text-[#2b2b2b]" : "text-white"}`}
      >
        Let&rsquo;s build something together...
      </p>
      <div
        className={`flex items-center gap-3 py-1 ${isLight ? "text-[#2b2b2b]" : "text-white"}`}
      >
        {socials.map((social) => (
          <a
            key={social.label}
            href={social.href}
            aria-label={social.label}
            target={social.external ? "_blank" : undefined}
            rel={social.external ? "noopener noreferrer" : undefined}
            className={`rounded-full outline-none transition-opacity hover:opacity-70 focus-visible:ring-2 focus-visible:ring-offset-2 ${
              isLight
                ? "focus-visible:ring-black/40 focus-visible:ring-offset-white"
                : "focus-visible:ring-white/50 focus-visible:ring-offset-black"
            }`}
          >
            {social.img ? (
              <Image
                src={social.img}
                alt=""
                width={24}
                height={24}
                className={`size-6 ${isLight ? "brightness-0" : ""}`}
                aria-hidden="true"
                unoptimized
              />
            ) : (
              <svg
                viewBox="0 0 24 24"
                className="size-6 fill-current"
                aria-hidden="true"
              >
                {social.icon}
              </svg>
            )}
          </a>
        ))}
      </div>
      <p className="text-xs font-light text-[#989898]">
        © 2026 YEN. All rights reserved.
      </p>
    </footer>
  );
}
