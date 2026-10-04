'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { dishes, type Dish } from '@/lib/menu';

type Cart = Record<string, number>;
type Line = { dish: Dish; qty: number };

type CartValue = {
  cart: Cart;
  lines: Line[];
  count: number;
  total: number;
  ready: boolean;
  add: (id: string) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
};

const KEY = 'tbs-cart-v2';
const MAX = 20;
const known = new Set(dishes.map((d) => d.id));

function sanitize(raw: unknown): Cart {
  if (!raw || typeof raw !== 'object') return {};
  const out: Cart = {};
  for (const [id, q] of Object.entries(raw as Record<string, unknown>)) {
    const n = Math.floor(Number(q));
    if (known.has(id) && Number.isFinite(n) && n > 0) out[id] = Math.min(MAX, n);
  }
  return out;
}

const CartCtx = createContext<CartValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setCart(sanitize(JSON.parse(raw)));
    } catch {
      /* storage blocked or corrupted: start empty */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(cart));
    } catch {
      /* ignore */
    }
  }, [cart, ready]);

  const setQty = useCallback((id: string, qty: number) => {
    setCart((c) => {
      const next = { ...c };
      const q = Math.max(0, Math.min(MAX, Math.floor(qty)));
      if (q === 0) delete next[id];
      else next[id] = q;
      return next;
    });
  }, []);

  const add = useCallback((id: string) => setCart((c) => ({ ...c, [id]: Math.min(MAX, (c[id] ?? 0) + 1) })), []);
  const remove = useCallback(
    (id: string) =>
      setCart((c) => {
        const next = { ...c };
        const q = (next[id] ?? 0) - 1;
        if (q <= 0) delete next[id];
        else next[id] = q;
        return next;
      }),
    [],
  );
  const clear = useCallback(() => setCart({}), []);

  const value = useMemo<CartValue>(() => {
    const lines = dishes.filter((d) => cart[d.id]).map((d) => ({ dish: d, qty: cart[d.id] }));
    return {
      cart,
      lines,
      count: lines.reduce((s, l) => s + l.qty, 0),
      total: lines.reduce((s, l) => s + l.qty * l.dish.price, 0),
      ready,
      add,
      remove,
      setQty,
      clear,
    };
  }, [cart, ready, add, remove, setQty, clear]);

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const v = useContext(CartCtx);
  if (!v) throw new Error('useCart must be used inside <CartProvider>');
  return v;
}
