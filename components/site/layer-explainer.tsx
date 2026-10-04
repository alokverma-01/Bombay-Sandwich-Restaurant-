'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const layers = [
  { name: 'Bread & butter', bg: 'var(--bread)', fg: 'var(--ink)', text: 'Soft white sandwich bread, buttered edge to edge so nothing goes soggy.' },
  { name: 'Green chutney', bg: 'var(--chutney)', fg: 'var(--ink)', text: 'Coriander, mint and green chilli. This is the heat and the freshness.' },
  { name: 'Boiled potato', bg: '#ffe08a', fg: 'var(--ink)', text: 'Thin slices of boiled potato give the sandwich its body.' },
  { name: 'Cucumber & onion', bg: '#b9f0c9', fg: 'var(--ink)', text: 'Cool crunch to balance the chutney.' },
  { name: 'Tomato', bg: 'var(--tomato)', fg: 'var(--ink)', text: 'A little juicy, a little sour.' },
  { name: 'Beetroot', bg: 'var(--beet)', fg: '#fff', text: 'Sweet, earthy and the reason the cut sandwich looks so good.' },
  { name: 'Sandwich masala', bg: 'var(--sky)', fg: 'var(--ink)', text: 'A tangy spice mix sprinkled over the top before it is closed.' },
  { name: 'Cheese (optional)', bg: '#fff', fg: 'var(--ink)', text: 'Grated on top, then grilled till it melts.' },
];

export function LayerExplainer() {
  const [active, setActive] = useState(1);
  const l = layers[active];
  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
      <ul className="flex flex-col gap-2 pr-8" role="tablist" aria-label="Sandwich layers">
        {layers.map((layer, i) => {
          const on = i === active;
          return (
            <li key={layer.name}>
              <motion.button
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                animate={{ x: on ? 28 : 0, rotate: on ? -1.2 : 0 }}
                transition={{ type: 'spring', stiffness: 380, damping: 24 }}
                className={cn('w-full rounded-2xl border-2 border-ink px-5 py-3 text-left font-display text-lg md:text-2xl', on ? 'shadow-[6px_6px_0_var(--ink)]' : 'shadow-[2px_2px_0_var(--ink)]')}
                style={{ background: layer.bg, color: layer.fg }}
              >
                {layer.name}
              </motion.button>
            </li>
          );
        })}
      </ul>
      <div className="relative min-h-56" role="tabpanel" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 24, rotate: 3 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, y: -24, rotate: -3 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="sticker rounded-[2rem] p-8 md:p-10"
            style={{ background: l.bg, color: l.fg }}
          >
            <p className="font-display text-sm opacity-70">Layer {active + 1} of {layers.length}</p>
            <h3 className="mt-2 font-display text-3xl md:text-4xl">{l.name}</h3>
            <p className="mt-4 text-xl font-medium leading-relaxed">{l.text}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
