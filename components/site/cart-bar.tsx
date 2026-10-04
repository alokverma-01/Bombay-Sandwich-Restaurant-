'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useCart } from './cart';
import { inr } from '@/lib/utils';

export function CartBar() {
  const { count, total, ready } = useCart();
  const pathname = usePathname();
  const show = ready && count > 0 && pathname !== '/order';

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          className="no-print fixed bottom-24 right-5 z-40 lg:bottom-6 lg:left-1/2 lg:right-auto lg:-translate-x-1/2"
        >
          <Link href="/order" className="btn btn-ink gap-3 py-3.5 pl-4 pr-5" data-cursor="Order">
            <span className="grid size-8 place-items-center rounded-full bg-turmeric text-ink">
              <ShoppingBag className="size-4" aria-hidden="true" />
            </span>
            <motion.span key={count} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
              {count} {count === 1 ? 'item' : 'items'}, {inr(total)}
            </motion.span>
            <span className="hidden text-turmeric sm:inline">Review order</span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
