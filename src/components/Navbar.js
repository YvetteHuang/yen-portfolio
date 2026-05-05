"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { dsDivider } from "@/lib/designSystem";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 flex w-full items-center justify-between px-8 py-6 text-white transition-colors duration-300 ${
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
        <Link href="/work" className="transition-colors hover:text-gray-400">
          Works
        </Link>
        <Link href="/about" className="transition-colors hover:text-gray-400">
          About
        </Link>
        <Link
          href="mailto:your-email@example.com"
          className="transition-colors hover:text-gray-400"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}