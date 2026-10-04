'use client';

import Link from 'next/link';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { useMemo, useRef, useState } from 'react';
import { Bike, CircleCheck, Minus, Plus, Store, Trash2, TriangleAlert } from 'lucide-react';
import { useCart } from './cart';
import { SmartImage } from './smart-image';
import { WhatsAppIcon } from './brand-icons';
import { categoryById } from '@/lib/menu';
import { buildOrderMessage, hasWhatsApp, waLink } from '@/lib/whatsapp';
import { cn, inr } from '@/lib/utils';

type Mode = 'pickup' | 'delivery';
type Errors = Partial<Record<'items' | 'name' | 'phone' | 'address', string>>;

export function OrderForm() {
  const { lines, total, count, add, remove, setQty, clear, ready } = useCart();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [mode, setMode] = useState<Mode>('pickup');
  const [address, setAddress] = useState('');
  const [when, setWhen] = useState('As soon as possible');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const message = useMemo(
    () => buildOrderMessage({ lines, total, name, phone, mode, address, when, notes }),
    [lines, total, name, phone, mode, address, when, notes],
  );

  const validate = () => {
    const e: Errors = {};
    if (!lines.length) e.items = 'Add at least one item from the menu.';
    if (name.trim().length < 2) e.name = 'Enter your name so we know whose order it is.';
    if (phone.trim() && phone.replace(/\D/g, '').length < 10) e.phone = 'Enter a 10-digit mobile number, or leave this blank.';
    if (mode === 'delivery' && address.trim().length < 8) e.address = 'Enter the full address with a landmark.';
    setErrors(e);
    return e;
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    const first = (Object.keys(e) as (keyof Errors)[])[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    if (!hasWhatsApp) return;
    window.open(waLink(message), '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  if (!ready) {
    return <div className="h-96 animate-pulse rounded-[2rem] border-2 border-ink/20 bg-bread" aria-label="Loading your order" />;
  }

  if (sent) {
    return (
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="sticker mx-auto max-w-xl rounded-[2rem] bg-chutney p-8 text-center text-ink md:p-12">
        <motion.div initial={{ scale: 0, rotate: -120 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.15 }} className="mx-auto grid size-20 place-items-center rounded-full border-2 border-ink bg-white">
          <CircleCheck className="size-10" aria-hidden="true" />
        </motion.div>
        <h2 className="mt-6 font-display text-3xl">Your order is ready in WhatsApp</h2>
        <p className="mt-3 text-lg">Press send in WhatsApp to place it. We&rsquo;ll reply to confirm the total and timing.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={waLink(message)} target="_blank" rel="noopener noreferrer" className="btn btn-white">
            <WhatsAppIcon className="size-5" /> Open WhatsApp again
          </a>
          <button type="button" className="btn btn-ink" onClick={() => { clear(); setSent(false); }}>
            Start a new order
          </button>
        </div>
      </motion.div>
    );
  }

  if (!lines.length) {
    return (
      <div className="sticker mx-auto max-w-xl rounded-[2rem] bg-turmeric p-8 text-center text-ink md:p-12">
        <motion.p initial={{ rotate: -8, scale: 0.6 }} animate={{ rotate: [0, -8, 8, 0], scale: 1 }} transition={{ duration: 0.8 }} className="text-6xl" aria-hidden="true">
          🥪
        </motion.p>
        <h2 className="mt-4 font-display text-3xl">Your order is empty</h2>
        <p className="mt-3 text-lg">Add a few things from the menu and they&rsquo;ll show up here, ready to send on WhatsApp.</p>
        <Link href="/menu" className="btn btn-ink mt-8">Browse the menu</Link>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-10 grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start">
      <div className="space-y-10">
        {/* Items */}
        <section aria-labelledby="your-items" className="sticker rounded-[2rem] bg-white p-5 md:p-7">
          <div className="flex items-center justify-between gap-4">
            <h2 id="your-items" className="font-display text-2xl text-ink">Your items</h2>
            <span className="rounded-full bg-ink px-3 py-1 text-sm font-bold text-white">{count} {count === 1 ? 'item' : 'items'}</span>
          </div>
          <ul className="mt-5 divide-y-2 divide-dashed divide-ink/15">
            <AnimatePresence initial={false}>
              {lines.map(({ dish, qty }) => (
                <motion.li
                  key={dish.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 60, height: 0, paddingTop: 0, paddingBottom: 0 }}
                  className="flex flex-wrap items-center gap-x-4 gap-y-3 overflow-hidden py-4"
                >
                  <div className="relative size-14 shrink-0 overflow-hidden rounded-2xl border-2 border-ink sm:size-16" style={{ background: categoryById[dish.category].color }}>
                    <SmartImage image={dish.image} alt="" tint={categoryById[dish.category].color} sizes="64px" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-extrabold leading-snug text-ink">{dish.name}</p>
                    <p className="text-sm text-muted-foreground">{inr(dish.price)} each</p>
                  </div>
                  <div className="flex w-full items-center gap-3 pl-[4.5rem] sm:w-auto sm:pl-0">
                  <div className="flex items-center gap-1 rounded-full border-2 border-ink p-1">
                    <button type="button" onClick={() => remove(dish.id)} aria-label={`Remove one ${dish.name}`} className="grid size-8 place-items-center rounded-full hover:bg-turmeric">
                      <Minus className="size-4" aria-hidden="true" />
                    </button>
                    <span className="w-6 text-center font-bold">{qty}</span>
                    <button type="button" onClick={() => add(dish.id)} aria-label={`Add one more ${dish.name}`} className="grid size-8 place-items-center rounded-full hover:bg-turmeric">
                      <Plus className="size-4" aria-hidden="true" />
                    </button>
                  </div>
                  <p className="ml-auto w-20 text-right font-display text-ink sm:ml-0">{inr(dish.price * qty)}</p>
                  <button type="button" onClick={() => setQty(dish.id, 0)} aria-label={`Remove ${dish.name} from your order`} className="grid size-9 place-items-center rounded-full text-beet hover:bg-beet hover:text-white">
                    <Trash2 className="size-4" aria-hidden="true" />
                  </button>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
          <div className="mt-4 flex items-center justify-between border-t-2 border-ink pt-4">
            <Link href="/menu" className="font-bold text-ink underline underline-offset-4">Add more items</Link>
            <p className="font-display text-2xl text-ink">
              <span className="sr-only">Items total: </span>
              {inr(total)}
            </p>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">Prices are indicative. We confirm the final total, and any delivery charge, on WhatsApp.</p>
        </section>

        {/* Details */}
        <section aria-labelledby="your-details" className="sticker space-y-6 rounded-[2rem] bg-white p-5 md:p-7">
          <h2 id="your-details" className="font-display text-2xl text-ink">Your details</h2>

          <LayoutGroup>
            <div role="radiogroup" aria-label="Pickup or delivery" className="grid grid-cols-2 gap-2 rounded-full border-2 border-ink p-1.5">
              {([
                { id: 'pickup', label: 'Pickup', Icon: Store },
                { id: 'delivery', label: 'Delivery', Icon: Bike },
              ] as const).map(({ id, label, Icon }) => (
                <button
                  key={id}
                  type="button"
                  role="radio"
                  aria-checked={mode === id}
                  onClick={() => setMode(id)}
                  className={cn('relative isolate flex items-center justify-center gap-2 rounded-full py-3 font-extrabold transition-colors', mode === id ? 'text-white' : 'text-ink')}
                >
                  {mode === id && <motion.span layoutId="mode-pill" className="absolute inset-0 -z-10 rounded-full bg-beet" transition={{ type: 'spring', stiffness: 420, damping: 32 }} />}
                  <Icon className="size-5" aria-hidden="true" /> {label}
                </button>
              ))}
            </div>
          </LayoutGroup>

          <Field label="Your name" error={errors.name} htmlFor="name">
            <input id="name" name="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className="field" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} />
          </Field>
          <Field label="Mobile number (optional)" hint="Only if you want us to call instead of chat." error={errors.phone} htmlFor="phone">
            <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="field" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'phone-error' : undefined} />
          </Field>
          <AnimatePresence initial={false}>
            {mode === 'delivery' && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <Field label="Delivery address" hint="We confirm delivery availability for your area on WhatsApp." error={errors.address} htmlFor="address">
                  <textarea id="address" name="address" rows={3} autoComplete="street-address" value={address} onChange={(e) => setAddress(e.target.value)} className="field resize-y" aria-invalid={!!errors.address} aria-describedby={errors.address ? 'address-error' : undefined} />
                </Field>
              </motion.div>
            )}
          </AnimatePresence>
          <Field label="When do you want it?" htmlFor="when">
            <input id="when" name="when" value={when} onChange={(e) => setWhen(e.target.value)} className="field" />
          </Field>
          <Field label="Notes (optional)" hint="Less spicy, no onion, extra chutney…" htmlFor="notes">
            <textarea id="notes" name="notes" rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} className="field resize-y" />
          </Field>
        </section>
      </div>

      {/* Preview + send */}
      <aside className="space-y-5 lg:sticky lg:top-28" aria-labelledby="preview-title">
        <div className="sticker overflow-hidden rounded-[2rem] bg-[#e7ddd2]">
          <div className="flex items-center gap-3 bg-[#075e54] px-5 py-4 text-white">
            <span className="grid size-10 place-items-center rounded-full bg-turmeric font-display text-xs text-ink">TBS</span>
            <div>
              <p id="preview-title" className="font-bold leading-tight">Message preview</p>
              <p className="text-xs text-white/75">This is what we&rsquo;ll receive</p>
            </div>
          </div>
          <div className="dots p-5">
            <motion.div layout className="ml-auto max-w-[92%] rounded-2xl rounded-tr-sm bg-[#d9fdd3] p-4 text-[14px] leading-relaxed text-[#111b21] shadow-sm">
              <pre className="whitespace-pre-wrap break-words font-sans">{message}</pre>
            </motion.div>
          </div>
        </div>

        {!hasWhatsApp && (
          <p role="alert" className="flex gap-3 rounded-2xl border-2 border-beet bg-white p-4 text-sm font-semibold text-ink">
            <TriangleAlert className="size-5 shrink-0 text-beet" aria-hidden="true" />
            Ordering isn&rsquo;t switched on yet: the café&rsquo;s WhatsApp number hasn&rsquo;t been added to this website. Please call or visit us for now.
          </p>
        )}
        {errors.items && <p className="text-sm font-bold text-beet">{errors.items}</p>}

        <motion.button whileTap={{ scale: 0.97 }} type="submit" disabled={!hasWhatsApp} className="btn btn-wa w-full py-5 text-lg" data-cursor="Send">
          <WhatsAppIcon className="size-6" /> Send order on WhatsApp
        </motion.button>
        <p className="text-center text-sm text-muted-foreground">Opens WhatsApp with your order filled in. Nothing is sent until you press send there.</p>
      </aside>
    </form>
  );
}

function Field({ label, hint, error, htmlFor, children }: { label: string; hint?: string; error?: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label htmlFor={htmlFor} className="block font-bold text-ink">{label}</label>
      {children}
      {hint && !error && <p className="text-sm text-muted-foreground">{hint}</p>}
      <AnimatePresence>
        {error && (
          <motion.p id={`${htmlFor}-error`} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-sm font-bold text-beet">
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
