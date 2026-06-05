import { dsFonts } from "@/lib/designSystem";

/**
 * Pill-style label used on project cards and case studies.
 *
 * @param {object} props
 * @param {import("react").ReactNode} props.children - Tag text
 * @param {string} [props.className] - Extra utility classes
 */
export default function Tag({ children, className = "" }) {
  return (
    <span
      className={`glass-edge ${dsFonts.body.className} inline-flex items-center whitespace-nowrap rounded-full bg-white/10 px-3 py-1 text-sm font-normal text-white shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md ${className}`}
    >
      {children}
    </span>
  );
}
