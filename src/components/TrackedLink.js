"use client";

import Link from "next/link";
import { trackProjectClick } from "@/lib/analytics";

export default function TrackedLink({
  href,
  title,
  location = "homepage",
  className,
  children,
}) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => trackProjectClick({ title, href, location })}
    >
      {children}
    </Link>
  );
}
