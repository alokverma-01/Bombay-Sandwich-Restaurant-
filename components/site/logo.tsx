export function Logo({ size = 44 }: { size?: number }) {
  return (
    <span
      aria-hidden="true"
      className="grid shrink-0 place-items-center rounded-full border-2 border-ink bg-turmeric font-display text-ink shadow-[3px_3px_0_var(--ink)] transition-transform duration-500 group-hover:rotate-[360deg]"
      style={{ width: size, height: size, fontSize: size * 0.32 }}
    >
      TBS
    </span>
  );
}
