"use client";

import Link from "next/link";
import { trackProjectClick } from "@/lib/analytics";

export default function TrackedLink({
  href,
  title,
  location = "homepage",
  className,
  target,
  rel,
  children,
}) {
  const usePlainAnchor =
    href.includes(".pdf") || href.startsWith("/design/portfolio");

  const onClick = () => trackProjectClick({ title, href, location });

  if (usePlainAnchor) {
    return (
      <a
        href={href}
        className={className}
        target={target}
        rel={rel}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={className}
      target={target}
      rel={rel}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
