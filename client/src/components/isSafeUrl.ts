// Only absolute https URLs are considered safe to render as external links.
export function isSafeUrl(href: string | undefined): href is string {
  if (!href) return false;
  try {
    return new URL(href).protocol === "https:";
  } catch {
    return false;
  }
}
