import { track } from "@vercel/analytics";

export function trackProjectClick({ title, href, location = "homepage" }) {
  track("project_click", { title, href, location });
}
