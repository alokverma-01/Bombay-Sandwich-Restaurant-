'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { categories, dishes, type CategoryId } from '@/lib/menu';
import { DishCard } from './dish-card';

type Tab = { id: 'all' | CategoryId; name: string; color: string; ink: string };
const tabs: Tab[] = [{ id: 'all', name: 'Everything', color: 'var(--ink)', ink: '#fff' }, ...categories];

export function MenuBoard() {
  const [active, setActive] = useState<Tab['id']>('all');
  const [q, setQ] = useState('');

  const sections = useMemo(() => {
    const term = q.trim().toLowerCase();
    const match = dishes.filter((d) => !term || `${d.name} ${d.description} ${(d.tags ?? []).join(' ')}`.toLowerCase().includes(term));
    const cats = active === 'all' ? categories : categories.filter((c) => c.id === active);
    return cats.map((c) => ({ cat: c, items: match.filter((d) => d.category === c.id) })).filter((s) => s.items.length > 0);
  }, [active, q]);

  return (
    <div>
      <div className="sticky top-16 z-30 -mx-4 border-b-2 border-ink bg-background/92 px-4 py-3 backdrop-blur-md md:top-20 md:-mx-8 md:px-8">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div role="tablist" aria-label="Menu categories" className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 py-1">
            {tabs.map((t) => {
              const on = t.id === active;
              return (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={on}
                  type="button"
                  onClick={() => setActive(t.id)}
                  className="relative isolate shrink-0 rounded-full border-2 border-ink px-4 py-2 text-sm font-extrabold transition-colors md:text-[15px]"
                  style={{ color: on ? t.ink : 'var(--ink)' }}
                >
                  {on && (
                    <motion.span
                      layoutId="menu-tab"
                      className="absolute inset-0 -z-10 rounded-full"
                      style={{ background: t.color }}
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  )}
                  {t.name}
                </button>
              );
            })}
          </div>
          <label className="relative block xl:w-52 xl:shrink-0">
            <span className="sr-only">Search the menu</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-ink" aria-hidden="true" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search: cheese, chai, spicy"
              className="field rounded-full py-2.5 pl-11"
            />
          </label>
        </div>
      </div>

      <div className="space-y-20 pt-12">
        <AnimatePresence mode="popLayout">
          {sections.map(({ cat, items }) => (
            <motion.section
              key={cat.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-labelledby={`cat-${cat.id}`}
            >
              <motion.div
                initial={{ x: -40, rotate: -2, opacity: 0 }}
                whileInView={{ x: 0, rotate: -1.5, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                className="sticker mb-8 inline-flex flex-col rounded-2xl px-6 py-3"
                style={{ background: cat.color, color: cat.ink }}
              >
                <h2 id={`cat-${cat.id}`} className="font-display text-3xl md:text-4xl">{cat.name}</h2>
                <p className="font-semibold">{cat.blurb}</p>
              </motion.div>
              <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <AnimatePresence mode="popLayout">
                  {items.map((d, i) => (
                    <DishCard key={d.id} dish={d} index={i} />
                  ))}
                </AnimatePresence>
              </div>
            </motion.section>
          ))}
        </AnimatePresence>

        {sections.length === 0 && (
          <div className="sticker mx-auto max-w-md rounded-[1.75rem] bg-turmeric p-8 text-center text-ink">
            <p className="font-display text-2xl">Nothing called &ldquo;{q}&rdquo;</p>
            <p className="mt-2">Try a simpler word like cheese, chai or fries.</p>
            <button type="button" onClick={() => { setQ(''); setActive('all'); }} className="btn btn-ink mt-5">
              <X className="size-4" aria-hidden="true" /> Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
