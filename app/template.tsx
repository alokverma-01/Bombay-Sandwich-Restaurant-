'use client';

import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const curtains: Record<string, [string, string]> = {
  '/': ['var(--beet)', 'var(--turmeric)'],
  '/menu': ['var(--turmeric)', 'var(--beet)'],
  '/order': ['var(--chutney)', 'var(--ink)'],
  '/gallery': ['var(--sky)', 'var(--tomato)'],
  '/reviews': ['var(--tomato)', 'var(--turmeric)'],
  '/about': ['var(--ink)', 'var(--chutney)'],
  '/contact': ['var(--beet)', 'var(--sky)'],
};

/** Runs on every navigation: two colour curtains lift, then the page settles in. */
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [a, b] = curtains[pathname] ?? ['var(--turmeric)', 'var(--ink)'];
  return (
    <>
      <div aria-hidden="true" className="page-curtain second no-print" style={{ background: b }} />
      <div aria-hidden="true" className="page-curtain no-print" style={{ background: a }} />
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}>
        {children}
      </motion.div>
    </>
  );
}
