"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { dsDivider } from "@/lib/designSystem";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  const scrollToAbout = (event) => {
    if (pathname !== "/") return;

    const about = document.getElementById("about");
    if (!about) return;

    event.preventDefault();
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    about.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
    window.history.pushState(null, "", "/#about");
  };

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/" || window.location.hash !== "#about") return;

    const about = document.getElementById("about");
    if (!about) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    requestAnimationFrame(() => {
      about.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "start",
      });
    });
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 z-50 flex w-full items-center justify-between px-6 py-6 text-white transition-colors duration-300 md:px-10 lg:px-[60px] ${
        isScrolled
          ? `${dsDivider.navbarBottomOnDark} bg-black/50 backdrop-blur-md`
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <Link
        href="/"
        className="relative block h-9 w-auto shrink-0 outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      >
        <Image
          src="/yen_logo.svg"
          alt="Yen"
          width={72}
          height={54}
          className="h-9 w-auto object-contain object-left"
          priority
          unoptimized
        />
      </Link>

      {/* 右側 導航 */}
      <div className="flex gap-8 text-sm font-medium">
        <Link
          href="/#about"
          onClick={scrollToAbout}
          className="transition-colors hover:text-gray-400"
        >
          About
        </Link>
        <Link
          href="mailto:yvettehuang.design@gmail.com"
          className="transition-colors hover:text-gray-400"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}