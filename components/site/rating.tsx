'use client';

import { animate, motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Star } from 'lucide-react';
import { site } from '@/lib/site';

/** Google rating from the public listing. The number counts up and the stars fill in when it scrolls into view. */
export function GoogleRating({ dark = false }: { dark?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [shown, setShown] = useState(0);
  const { value, count, checkedOn } = site.googleRating;

  useEffect(() => {
    if (!inView) return;
    const c = animate(0, value, { duration: 1.4, ease: 'easeOut', onUpdate: (v) => setShown(v) });
    return () => c.stop();
  }, [inView, value]);

  return (
    <div ref={ref} className={dark ? 'text-white' : 'text-ink'}>
      <p className="font-display text-[clamp(4.5rem,13vw,8.5rem)] leading-none" aria-label={`${value} out of 5 on Google`}>
        {shown.toFixed(1)}
      </p>
      <div className="mt-3 flex gap-1.5" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => {
          const fill = Math.max(0, Math.min(1, value - i));
          return (
            <span key={i} className="relative size-8">
              <Star className="absolute inset-0 size-8 stroke-ink" strokeWidth={2} />
              <motion.span
                className="absolute inset-0 overflow-hidden"
                initial={{ width: 0 }}
                animate={inView ? { width: `${fill * 100}%` } : {}}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.4 }}
              >
                <Star className="size-8 fill-turmeric stroke-ink" strokeWidth={2} />
              </motion.span>
            </span>
          );
        })}
      </div>
      <p className="mt-3 font-semibold">
        On Google, from {count} reviews <span className="font-normal opacity-75">(as of {checkedOn})</span>
      </p>
    </div>
  );
}
