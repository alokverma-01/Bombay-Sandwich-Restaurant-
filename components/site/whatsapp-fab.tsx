'use client';

import { motion } from 'framer-motion';
import { useCart } from './cart';
import { WhatsAppIcon } from './brand-icons';
import { hasWhatsApp, quickOrderText, waLink } from '@/lib/whatsapp';

/** Always-visible green button. Empty basket: opens WhatsApp directly. Items in basket: goes to the order page. */
export function WhatsAppFab() {
  const { count, ready } = useCart();
  const direct = hasWhatsApp && (!ready || count === 0);
  const href = direct ? waLink(quickOrderText) : '/order';

  return (
    <motion.a
      href={href}
      target={direct ? '_blank' : undefined}
      rel={direct ? 'noopener noreferrer' : undefined}
      initial={{ scale: 0, rotate: -45 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: 1, type: 'spring', stiffness: 300, damping: 16 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      data-cursor="Chat"
      aria-label={count > 0 ? 'Review your order and send it on WhatsApp' : 'Order on WhatsApp'}
      className="no-print group fixed bottom-5 right-5 z-50 flex items-center rounded-full border-2 border-ink bg-wa p-3.5 text-ink shadow-[4px_4px_0_var(--ink)]"
    >
      <span className="ping-slow absolute inset-0 -z-10 rounded-full bg-wa" aria-hidden="true" />
      <WhatsAppIcon className="size-7" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap font-extrabold transition-[max-width,padding] duration-300 group-hover:max-w-52 group-hover:pl-2 group-hover:pr-1 group-focus-visible:max-w-52 group-focus-visible:pl-2">
        {count > 0 ? 'Send my order' : 'Order on WhatsApp'}
      </span>
    </motion.a>
  );
}
