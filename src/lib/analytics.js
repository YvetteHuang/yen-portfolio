import { track } from "@vercel/analytics";

function gtagEvent(name, params) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
}

export function trackProjectClick({ title, href, location = "homepage" }) {
  track("project_click", { title, href, location });
  gtagEvent("project_click", { title, href, location });
}
