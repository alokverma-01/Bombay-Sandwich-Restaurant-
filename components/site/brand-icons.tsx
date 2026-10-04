import type { SVGProps } from 'react';

type P = SVGProps<SVGSVGElement>;

export function WhatsAppIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M12 2.2a9.8 9.8 0 0 0-8.4 14.8L2.3 21.7l4.8-1.3A9.8 9.8 0 1 0 12 2.2z" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
      <path d="M8.7 7.3c.2-.4.5-.4.8-.4h.6c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .6l-.5.7c-.1.2-.2.3 0 .6.4.8 1 1.5 1.7 2.1.7.6 1.4 1 2.1 1.3.3.1.4.1.6-.1l.7-.8c.2-.2.3-.2.6-.1l1.8.9c.3.1.4.2.4.4 0 .5-.1 1.3-.6 1.8-.6.6-1.6.9-2.4.8-1.5-.2-3.2-1-4.6-2.3-1.5-1.3-2.6-2.9-3-4.3-.3-1-.1-2 .4-2.6z" fill="currentColor" />
    </svg>
  );
}

export function InstagramIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M14 8h2.2V4.8h-2.6C10.9 4.8 9.8 6.5 9.8 9v2H7.8v3.2h2V21h3.3v-6.8h2.5l.5-3.2h-3V9.4c0-.9.3-1.4.9-1.4z" />
    </svg>
  );
}

export function VegMark({ className = '' }: { className?: string }) {
  return (
    <span
      title="Vegetarian"
      className={`inline-grid size-4 shrink-0 place-items-center rounded-[3px] border-2 border-[#138a3d] bg-white ${className}`}
    >
      <span className="size-1.5 rounded-full bg-[#138a3d]" />
      <span className="sr-only">Vegetarian</span>
    </span>
  );
}
