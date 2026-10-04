'use client';

import { useEffect, useState } from 'react';
import { isOpenNow } from '@/lib/site';
import { cn } from '@/lib/utils';

/** "Open now / Closed now" in Lucknow time. Renders after mount to avoid a server/client mismatch. */
export function OpenBadge({ className }: { className?: string }) {
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const tick = () => setOpen(isOpenNow());
    tick();
    const t = setInterval(tick, 60_000);
    return () => clearInterval(t);
  }, []);

  return (
    <span
      className={cn(
        'inline-flex min-w-[7.5rem] items-center gap-2 rounded-full border-2 border-ink bg-white px-3 py-1.5 text-sm font-bold text-ink',
        className,
      )}
      aria-live="polite"
    >
      <span className="relative flex size-2.5">
        {open && <span className="ping-slow absolute inset-0 rounded-full bg-chutney" />}
        <span className={cn('relative size-2.5 rounded-full', open === null ? 'bg-gray-300' : open ? 'bg-chutney' : 'bg-beet')} />
      </span>
      {open === null ? 'Checking hours' : open ? 'Open now' : 'Closed now'}
    </span>
  );
}
