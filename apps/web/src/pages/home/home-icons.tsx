import type { SVGProps } from "react";

export function HappyMacIcon({ "aria-hidden": ariaHidden, className }: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden={ariaHidden} className={className} fill="currentColor" viewBox="0 0 32 32">
      <rect x="11.5" y="7" width="1" height="2" />
      <rect x="3.5" y="2" width="1" height="25" />
      <rect x="5.5" width="21" height="1" />
      <rect x="18.5" y="22" width="6" height="1" />
      <rect x="4.5" y="1" width="1" height="1" />
      <rect x="26.5" y="1" width="1" height="1" />
      <rect x="27.5" y="2" width="1" height="25" />
      <path d="M4.5,27v5h23v-5H4.5ZM26.5,31H5.5v-3h21v3Z" />
      <rect x="6.5" y="23" width="2" height="1" />
      <rect x="19.5" y="7" width="1" height="2" />
      <rect x="18.5" y="13" width="1" height="1" />
      <rect x="13.5" y="13" width="1" height="1" />
      <rect x="14.5" y="14" width="4" height="1" />
      <rect x="7.5" y="3" width="17" height="1" />
      <rect x="6.5" y="4" width="1" height="13" />
      <rect x="24.5" y="4" width="1" height="13" />
      <rect x="7.5" y="17" width="17" height="1" />
      <polygon points="16 7 16 11 15 11 15 12 16 12 17 12 17 7 16 7" />
    </svg>
  );
}

export function FaviconIcon({ "aria-hidden": ariaHidden, className }: SVGProps<SVGSVGElement>) {
  return (
    <img
      aria-hidden={ariaHidden}
      alt=""
      className={className}
      decoding="async"
      src="/favicon.svg"
    />
  );
}

export function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.32 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.1 20.45H3.53V9H7.1v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z" />
    </svg>
  );
}
