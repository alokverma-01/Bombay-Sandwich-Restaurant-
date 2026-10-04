'use client';

import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const BURST_COLORS = ['var(--turmeric)', 'var(--beet)', 'var(--chutney)', 'var(--sky)', 'var(--tomato)'];
type Burst = { id: number; x: number; y: number };

/**
 * A two-part cursor: a dot that tracks exactly and a ring that follows on a spring.
 * Over anything with data-cursor="Label" the ring becomes a label bubble.
 * Clicking throws a little burst of colour. Off on touch screens and with reduced motion.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [down, setDown] = useState(false);
  const [bursts, setBursts] = useState<Burst[]>([]);
  const nextId = useRef(0);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 520, damping: 38, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 520, damping: 38, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!fine.matches || reduce.matches) return;

    setEnabled(true);
    document.documentElement.classList.add('has-custom-cursor');

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = (e.target as Element | null)?.closest?.('[data-cursor], a, button, [role="button"], select, label, summary');
      setHover(Boolean(target));
      setLabel(target?.getAttribute('data-cursor') ?? null);
    };
    const leave = () => setVisible(false);
    const pressDown = (e: PointerEvent) => {
      setDown(true);
      const id = nextId.current++;
      setBursts((b) => [...b, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setBursts((b) => b.filter((p) => p.id !== id)), 700);
    };
    const up = () => setDown(false);

    window.addEventListener('pointermove', move);
    document.addEventListener('pointerleave', leave);
    window.addEventListener('pointerdown', pressDown);
    window.addEventListener('pointerup', up);
    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
      window.removeEventListener('pointerdown', pressDown);
      window.removeEventListener('pointerup', up);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, [x, y]);

  if (!enabled) return null;

  const size = label ? 76 : hover ? 54 : 34;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100]">
      <motion.div
        className="absolute left-0 top-0 grid place-items-center rounded-full font-display text-[11px] text-white"
        style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: size,
          height: size,
          opacity: visible ? 1 : 0,
          scale: down ? 0.82 : 1,
          backgroundColor: label ? 'rgba(217,16,95,1)' : hover ? 'rgba(255,194,26,.35)' : 'rgba(255,194,26,0)',
          borderWidth: label ? 0 : 2,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      >
        <span className="absolute inset-0 rounded-full border-2 border-beet" style={{ opacity: label ? 0 : 1 }} />
        <AnimatePresence>
          {label && (
            <motion.span key={label} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="relative">
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="absolute left-0 top-0 size-2 rounded-full bg-ink shadow-[0_0_0_2px_#fff]"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: visible && !label ? 1 : 0 }}
      />

      {bursts.map((b) =>
        BURST_COLORS.concat(BURST_COLORS.slice(0, 3)).map((c, i, arr) => {
          const a = (i / arr.length) * Math.PI * 2;
          return (
            <motion.span
              key={`${b.id}-${i}`}
              className="absolute size-2 rounded-full"
              style={{ left: b.x, top: b.y, background: c }}
              initial={{ x: -4, y: -4, opacity: 1, scale: 1 }}
              animate={{ x: Math.cos(a) * 34 - 4, y: Math.sin(a) * 34 - 4, opacity: 0, scale: 0.3 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          );
        }),
      )}
    </div>
  );
}
