import { Sparkle } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = { items: string[]; className?: string; reverse?: boolean; duration?: number; textClass?: string };

/** CSS-only marquee. The list is rendered twice so the loop is seamless. */
export function Marquee({ items, className, reverse, duration = 32, textClass = 'text-turmeric' }: Props) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center gap-8 pr-8" aria-hidden={hidden || undefined}>
      {items.map((t, i) => (
        <li key={i} className={cn('flex items-center gap-8 whitespace-nowrap font-display text-2xl md:text-4xl', textClass)}>
          {t}
          <Sparkle className="size-6 fill-current md:size-8" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className={cn('marquee overflow-hidden border-y-2 border-ink py-4', className)}>
      <div className={cn('marquee-track flex w-max', reverse && 'marquee-reverse')} style={{ '--dur': `${duration}s` } as React.CSSProperties}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
