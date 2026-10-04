'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type Props = {
  title: string;
  intro?: string;
  color: string;
  ink?: string;
  children?: React.ReactNode;
  className?: string;
};

/** Coloured page header. Letters spring up one by one; a few shapes float in the corner. */
export function PageHero({ title, intro, color, ink = 'var(--ink)', children, className }: Props) {
  let n = 0;
  const words = title.split(' ');
  return (
    <section className={cn('relative overflow-hidden border-b-2 border-ink', className)} style={{ background: color, color: ink }}>
      <Shapes />
      <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-12 md:px-8 md:pb-20 md:pt-20">
        <h1 className="max-w-5xl font-display text-[clamp(2.6rem,9vw,7rem)] leading-[0.92]">
          <span className="sr-only">{title}</span>
          <span aria-hidden="true">
            {words.map((w, wi) => (
              <span key={wi} className="mr-[0.22em] inline-block whitespace-nowrap">
                {[...w].map((ch, ci) => {
                  const d = 0.25 + n++ * 0.028;
                  return (
                    <motion.span
                      key={ci}
                      className="inline-block"
                      initial={{ y: '0.9em', rotate: 14, opacity: 0 }}
                      animate={{ y: 0, rotate: 0, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 420, damping: 22, delay: d }}
                    >
                      {ch}
                    </motion.span>
                  );
                })}
              </span>
            ))}
          </span>
        </h1>
        {intro && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 + n * 0.028, duration: 0.5 }}
            className="mt-6 max-w-2xl text-lg font-medium md:text-xl"
          >
            {intro}
          </motion.p>
        )}
        {children && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + n * 0.028 }} className="mt-8">
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}

function Shapes() {
  const float = (d: number) => ({
    animate: { y: [0, -14, 0], rotate: [0, 8, 0] },
    transition: { duration: 5 + d, repeat: Infinity, ease: 'easeInOut' as const, delay: d },
  });
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 md:block">
      <motion.svg {...float(0)} className="absolute right-[12%] top-[18%] size-24" viewBox="0 0 100 100">
        <path d="M50 4l12 30 32 4-24 21 7 32-27-16-27 16 7-32L6 38l32-4z" fill="#fff" stroke="var(--ink)" strokeWidth="4" strokeLinejoin="round" />
      </motion.svg>
      <motion.div {...float(1.2)} className="absolute bottom-[18%] right-[30%] size-16 rounded-full border-2 border-ink bg-turmeric shadow-[4px_4px_0_var(--ink)]" />
      <motion.svg {...float(0.6)} className="absolute bottom-[30%] right-[6%] h-10 w-28" viewBox="0 0 120 40">
        <path d="M4 20c14-22 26 22 40 0s26 22 40 0 22 18 32 6" fill="none" stroke="var(--ink)" strokeWidth="6" strokeLinecap="round" />
      </motion.svg>
    </div>
  );
}
