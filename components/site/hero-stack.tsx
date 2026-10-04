'use client';

import { motion, useAnimationControls, useReducedMotion } from 'framer-motion';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';

const layers = [
  { label: 'Bread', bg: 'var(--bread)', fg: 'var(--ink)', shape: 'rounded-t-[2.6rem] rounded-b-xl pt-5', grill: true },
  { label: 'Green chutney', bg: 'var(--chutney)', fg: 'var(--ink)' },
  { label: 'Aloo masala', bg: '#ffe08a', fg: 'var(--ink)' },
  { label: 'Beetroot', bg: 'var(--beet)', fg: '#ffffff' },
  { label: 'Tomato', bg: 'var(--tomato)', fg: 'var(--ink)' },
  { label: 'Cheese', bg: '#ffffff', fg: 'var(--ink)' },
  { label: 'Bread', bg: 'var(--bread)', fg: 'var(--ink)', shape: 'rounded-b-[2.6rem] rounded-t-xl pb-5', grill: true },
];
const tilts = [-2, 1.4, -1, 1.8, -1.4, 0.8, -0.6];
const DROP = 0.13;

/** The hero's signature moment: the sandwich assembles from the bottom up, gets pressed, then grilled. */
export function HeroStack() {
  const reduce = useReducedMotion();
  const press = useAnimationControls();
  const grill = useAnimationControls();
  const steam = useAnimationControls();

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      if (reduce) {
        grill.set({ clipPath: 'inset(0 0% 0 0)' });
        return;
      }
      await new Promise((r) => setTimeout(r, (0.35 + layers.length * DROP + 0.55) * 1000));
      if (cancelled) return;
      await press.start({ scaleY: [1, 0.86, 1.03, 1], transition: { duration: 0.7, times: [0, 0.35, 0.75, 1] } });
      if (cancelled) return;
      grill.start({ clipPath: 'inset(0 0% 0 0)', transition: { duration: 0.6, ease: 'easeOut' } });
      steam.start('rise');
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [reduce, press, grill, steam]);

  return (
    <div className="relative mx-auto w-full max-w-[32rem] pt-16" aria-hidden="true">
      {/* steam */}
      <div className="absolute left-1/2 top-0 flex -translate-x-1/2 gap-6">
        {[0, 1, 2].map((i) => (
          <motion.svg
            key={i}
            width="26"
            height="64"
            viewBox="0 0 26 64"
            initial={{ opacity: 0 }}
            animate={steam}
            variants={{
              rise: {
                opacity: [0, 0.9, 0],
                y: [16, -10],
                transition: { duration: 2.4, repeat: Infinity, delay: i * 0.6, ease: 'easeOut' },
              },
            }}
          >
            <path d="M13 62c-9-9 9-15 0-24s9-15 0-24 4-12 0-12" fill="none" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
          </motion.svg>
        ))}
      </div>

      {/* rotating sticker */}
      <motion.div
        initial={reduce ? false : { scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 2.4, type: 'spring', stiffness: 260, damping: 14 }}
        className="absolute -right-2 top-6 z-10 size-28 md:-right-8 md:size-32"
      >
        <div className="spin-slow size-full">
          <svg viewBox="0 0 120 120" className="size-full">
            <circle cx="60" cy="60" r="58" fill="var(--sky)" stroke="var(--ink)" strokeWidth="3" />
            <defs>
              <path id="sticker-circle" d="M60,60 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0" />
            </defs>
            <text style={{ fontFamily: 'var(--font-bungee)' }} fontSize="13" fill="var(--ink)" letterSpacing="2">
              <textPath href="#sticker-circle">Hot off the press * Hot off the press *</textPath>
            </text>
          </svg>
        </div>
        <span className="absolute inset-0 grid place-items-center text-3xl">🔥</span>
      </motion.div>

      <motion.div animate={press} style={{ originY: 1 }} className="relative flex flex-col gap-1.5">
        {layers.map((l, i) => (
          <motion.div
            key={i}
            initial={reduce ? false : { y: -320, opacity: 0, rotate: tilts[i] * 5 }}
            animate={{ y: 0, opacity: 1, rotate: tilts[i] }}
            transition={{ type: 'spring', stiffness: 260, damping: 17, delay: 0.35 + (layers.length - 1 - i) * DROP }}
            whileHover={{ x: i % 2 ? -14 : 14, rotate: tilts[i] * 2 }}
            className={cn(
              'relative overflow-hidden border-2 border-ink px-6 py-2.5 font-display text-[clamp(1.45rem,4.8vw,2.7rem)] leading-none shadow-[5px_5px_0_var(--ink)]',
              l.shape ?? 'rounded-2xl',
            )}
            style={{ background: l.bg, color: l.fg }}
          >
            <span className="relative z-10">{l.label}</span>
            {l.grill && (
              <motion.span className="grill absolute inset-0" initial={{ clipPath: 'inset(0 100% 0 0)' }} animate={grill} />
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
