'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { OpenBadge } from './open-badge';
import { WhatsAppIcon } from './brand-icons';
import { site } from '@/lib/site';
import { hasWhatsApp, quickOrderText, waLink } from '@/lib/whatsapp';

const headline = 'Bombay sandwiches, pressed hot in Gomti Nagar.';

export function HeroCopy() {
  const words = headline.split(' ');
  return (
    <div className="relative z-10">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-wrap items-center gap-2">
        <OpenBadge />
        <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-white px-3 py-1.5 text-sm font-bold text-ink hover:bg-sky">
          <Star className="size-4 fill-turmeric" aria-hidden="true" />
          {site.googleRating.value} on Google
        </a>
      </motion.div>

      <h1 className="mt-6 font-display text-[clamp(2.6rem,6.4vw,5.4rem)] leading-[0.95] text-ink">
        {words.map((w, i) => (
          <span key={i}>
            <motion.span
              className="inline-block"
              initial={{ y: 40, opacity: 0, rotate: -6 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.3 + i * 0.07 }}
            >
              {w}
            </motion.span>{' '}
          </span>
        ))}
      </h1>

      <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="mt-6 max-w-[34rem] text-lg font-medium text-ink md:text-xl">
        Mumbai-style street sandwiches, cutting chai and cold coffee. Send your order on WhatsApp and pick it up opposite Cinepolis in Kisan Bazar.
      </motion.p>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05 }} className="mt-8 flex flex-wrap gap-3">
        {hasWhatsApp ? (
          <a href={waLink(quickOrderText)} target="_blank" rel="noopener noreferrer" className="btn btn-wa px-6 py-4 text-lg" data-cursor="Chat">
            <WhatsAppIcon className="size-6" /> Order on WhatsApp
          </a>
        ) : (
          <Link href="/order" className="btn btn-wa px-6 py-4 text-lg">
            <WhatsAppIcon className="size-6" /> Order on WhatsApp
          </Link>
        )}
        <Link href="/menu" className="btn btn-white px-6 py-4 text-lg" data-cursor="Menu">See the menu</Link>
      </motion.div>
    </div>
  );
}
