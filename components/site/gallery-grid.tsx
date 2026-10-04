'use client';

import { AnimatePresence, motion, type PanInfo } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { gallery, type GalleryTag } from '@/lib/gallery';
import { SmartImage } from './smart-image';
import { cn } from '@/lib/utils';

const filters: ('All' | GalleryTag)[] = ['All', 'Sandwiches', 'Drinks', 'The vibe'];
const tints = ['var(--turmeric)', 'var(--beet)', 'var(--sky)', 'var(--chutney)', 'var(--tomato)'];

export function GalleryGrid() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('All');
  const [open, setOpen] = useState<number | null>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const items = useMemo(() => gallery.map((g, i) => ({ ...g, i })).filter((g) => filter === 'All' || g.tag === filter), [filter]);
  const pos = open === null ? -1 : items.findIndex((g) => g.i === open);

  const go = useCallback(
    (dir: 1 | -1) => {
      if (pos < 0) return;
      setOpen(items[(pos + dir + items.length) % items.length].i);
    },
    [pos, items],
  );
  const close = useCallback(() => {
    setOpen(null);
    lastTrigger.current?.focus();
  }, []);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, go, close]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -80) go(1);
    else if (info.offset.x > 80) go(-1);
  };

  const current = open === null ? null : gallery[open];

  return (
    <>
      <div role="group" aria-label="Filter photos" className="mb-10 flex flex-wrap gap-2">
        {filters.map((f, i) => {
          const active = f === filter;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={active}
              className="relative isolate rounded-full border-2 border-ink px-5 py-2.5 font-bold text-ink"
            >
              {active && (
                <motion.span
                  layoutId="gallery-filter"
                  className="absolute inset-0 -z-10 rounded-full"
                  style={{ background: tints[i % tints.length] }}
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                />
              )}
              {f}
            </button>
          );
        })}
      </div>

      <motion.ul layout className="columns-2 gap-4 md:columns-3 md:gap-6 [&>li]:mb-4 md:[&>li]:mb-6">
        <AnimatePresence mode="popLayout">
          {items.map((g, k) => (
            <motion.li
              key={g.i}
              layout
              initial={{ opacity: 0, scale: 0.8, rotate: k % 2 ? 4 : -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24, delay: k * 0.03 }}
              className="break-inside-avoid"
            >
              <button
                type="button"
                onClick={(e) => {
                  lastTrigger.current = e.currentTarget;
                  setOpen(g.i);
                }}
                className="group relative block w-full overflow-hidden rounded-[1.5rem] border-2 border-ink shadow-[5px_5px_0_var(--ink)] transition-transform hover:-rotate-1"
                data-cursor="View"
                aria-label={`Open photo: ${g.alt}`}
              >
                <motion.div layoutId={`photo-${g.i}`} className={cn('relative w-full', g.tall ? 'aspect-[3/4]' : 'aspect-[4/3]')} style={{ background: tints[g.i % tints.length] }}>
                  <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                    <SmartImage image={g.image} alt="" tint={tints[g.i % tints.length]} sizes="(max-width: 768px) 50vw, 33vw" />
                  </div>
                </motion.div>
                <span className="absolute bottom-3 left-3 rounded-full border-2 border-ink bg-white px-3 py-1 text-xs font-extrabold text-ink opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  {g.tag}
                </span>
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <AnimatePresence>
        {current && open !== null && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/92 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={current.alt}
          >
            <button ref={closeRef} type="button" onClick={close} aria-label="Close photo" className="btn btn-turmeric absolute right-4 top-4 z-10 p-3">
              <X className="size-6" aria-hidden="true" />
            </button>
            <button type="button" onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Previous photo" className="btn btn-white absolute left-3 top-1/2 z-10 hidden -translate-y-1/2 p-3 md:inline-flex">
              <ChevronLeft className="size-6" aria-hidden="true" />
            </button>
            <button type="button" onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Next photo" className="btn btn-white absolute right-3 top-1/2 z-10 hidden -translate-y-1/2 p-3 md:inline-flex">
              <ChevronRight className="size-6" aria-hidden="true" />
            </button>

            <motion.figure
              key={open}
              onClick={(e) => e.stopPropagation()}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.6}
              onDragEnd={onDragEnd}
              className="w-[min(92vw,1100px)]"
            >
              <motion.div
                layoutId={`photo-${open}`}
                className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.75rem] border-2 border-white"
                style={{ background: tints[open % tints.length] }}
              >
                <SmartImage image={current.image} alt={current.alt} tint={tints[open % tints.length]} sizes="92vw" priority />
              </motion.div>
              <figcaption className="mt-4 flex items-center justify-between gap-4 text-white">
                <span className="font-semibold">{current.alt}</span>
                <span className="shrink-0 text-sm text-white/70">
                  {pos + 1} / {items.length}
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
