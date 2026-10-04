'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import { categoryById, type Dish } from '@/lib/menu';
import { inr } from '@/lib/utils';
import { SmartImage } from './smart-image';
import { VegMark } from './brand-icons';
import { useCart } from './cart';

export function DishCard({ dish, index = 0 }: { dish: Dish; index?: number }) {
  const cat = categoryById[dish.category];
  const { cart, add, remove } = useCart();
  const qty = cart[dish.id] ?? 0;
  const tilt = index % 2 ? 1 : -1;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40, rotate: tilt * 3 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
      whileHover={{ y: -6, rotate: tilt * 0.8 }}
      transition={{ type: 'spring', stiffness: 240, damping: 22, delay: (index % 4) * 0.06 }}
      className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border-2 border-ink bg-white shadow-[6px_6px_0_var(--ink)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden border-b-2 border-ink" style={{ background: cat.color }} data-cursor="Yum">
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1">
          <SmartImage image={dish.image} alt={dish.name} tint={cat.color} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
        </div>
        {dish.tags && (
          <ul className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {dish.tags.map((t) => (
              <li key={t} className="rounded-full border-2 border-ink bg-white px-2.5 py-0.5 text-xs font-extrabold text-ink">
                {t}
              </li>
            ))}
          </ul>
        )}
        <motion.span
          className="absolute -bottom-1 right-3 grid size-[4.5rem] place-items-center rounded-full border-2 border-ink font-display text-lg shadow-[3px_3px_0_var(--ink)]"
          style={{ background: cat.color, color: cat.ink }}
          initial={{ rotate: -12 }}
          whileHover={{ rotate: 12, scale: 1.08 }}
        >
          {inr(dish.price)}
        </motion.span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-start gap-2">
          <VegMark className="mt-1.5" />
          <h3 className="text-xl font-extrabold leading-tight text-ink">{dish.name}</h3>
        </div>
        <p className="text-[15px] leading-relaxed text-muted-foreground">{dish.description}</p>

        <div className="mt-auto pt-3">
          <AnimatePresence mode="wait" initial={false}>
            {qty === 0 ? (
              <motion.button
                key="add"
                type="button"
                onClick={() => add(dish.id)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileTap={{ scale: 0.92 }}
                className="btn w-full"
                style={{ background: cat.color, color: cat.ink }}
                data-cursor="Add"
              >
                <Plus className="size-5" aria-hidden="true" /> Add to order
              </motion.button>
            ) : (
              <motion.div
                key="stepper"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center justify-between rounded-full border-2 border-ink bg-ink p-1.5 text-white shadow-[4px_4px_0_var(--ink)]"
              >
                <button type="button" onClick={() => remove(dish.id)} aria-label={`Remove one ${dish.name}`} className="grid size-10 place-items-center rounded-full bg-white text-ink transition hover:bg-turmeric">
                  <Minus className="size-5" aria-hidden="true" />
                </button>
                <span className="relative h-6 min-w-16 overflow-hidden text-center font-display text-lg" aria-live="polite">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span key={qty} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="block">
                      {qty}
                    </motion.span>
                  </AnimatePresence>
                  <span className="sr-only"> in your order</span>
                </span>
                <button type="button" onClick={() => add(dish.id)} aria-label={`Add one more ${dish.name}`} className="grid size-10 place-items-center rounded-full bg-turmeric text-ink transition hover:bg-white">
                  <Plus className="size-5" aria-hidden="true" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.article>
  );
}
