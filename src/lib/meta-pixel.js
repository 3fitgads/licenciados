export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

function hasFbq() {
  return typeof window !== "undefined" && typeof window.fbq === "function";
}

export function pageview() {
  if (!hasFbq()) return;
  window.fbq("track", "PageView");
}

export function track(eventName, params) {
  if (!hasFbq()) return;
  window.fbq("track", eventName, params ?? {});
}

