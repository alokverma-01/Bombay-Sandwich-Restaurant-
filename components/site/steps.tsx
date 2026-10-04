'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { MessageCircle, ShoppingBag, UtensilsCrossed } from 'lucide-react';

const steps = [
  { title: 'Pick what you want', body: 'Add sandwiches, chai and sides to your order from the menu.', color: 'var(--beet)', ink: '#fff', Icon: UtensilsCrossed },
  { title: 'Send it on WhatsApp', body: 'We turn your order into a ready-made WhatsApp message. You just press send.', color: 'var(--chutney)', ink: 'var(--ink)', Icon: MessageCircle },
  { title: 'Collect it hot', body: 'We confirm the total and timing in the chat. Pick it up opposite Cinepolis.', color: 'var(--sky)', ink: 'var(--ink)', Icon: ShoppingBag },
];

/** A real sequence, so it is numbered. The connecting line draws itself as you scroll. */
export function Steps() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 55%'] });
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <ol ref={ref} className="relative grid gap-10 md:grid-cols-3 md:gap-8">
      <motion.span aria-hidden="true" style={{ scaleX }} className="absolute left-[16%] right-[16%] top-10 hidden h-1.5 origin-left rounded-full bg-ink md:block" />
      {steps.map(({ title, body, color, ink, Icon }, i) => (
        <li key={title} className="relative flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ type: 'spring', stiffness: 260, damping: 15, delay: i * 0.18 }}
            className="relative grid size-20 place-items-center rounded-full border-2 border-ink shadow-[4px_4px_0_var(--ink)]"
            style={{ background: color, color: ink }}
          >
            <Icon className="size-8" aria-hidden="true" />
            <span className="absolute -right-2 -top-2 grid size-8 place-items-center rounded-full border-2 border-ink bg-white font-display text-sm text-ink">
              {i + 1}
            </span>
          </motion.div>
          <h3 className="mt-6 text-2xl font-extrabold text-ink">{title}</h3>
          <p className="mt-2 max-w-xs text-muted-foreground">{body}</p>
        </li>
      ))}
    </ol>
  );
}
