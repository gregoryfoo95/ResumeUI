import type { AnchorHTMLAttributes } from "react";
import { isSafeUrl } from "./isSafeUrl";

// Renders an external link only if it is an absolute https URL, always with
// noopener/noreferrer (no window.opener, no referrer leak).
export default function SafeLink({
  href,
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement>): JSX.Element | null {
  if (!isSafeUrl(href)) return <span>{children}</span>;
  return (
    <a {...rest} href={href} target="_blank" rel="noopener noreferrer nofollow">
      {children}
    </a>
  );
}
