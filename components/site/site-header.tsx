'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useCart } from './cart';
import { Logo } from './logo';
import { navLinks, isActive } from './nav-links';
import { cn } from '@/lib/utils';

export function SiteHeader() {
  const pathname = usePathname();
  const { count, ready } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'no-print sticky top-0 z-40 transition-[background-color,box-shadow] duration-300',
        scrolled ? 'bg-background/90 shadow-[0_2px_0_var(--ink)] backdrop-blur-md' : 'bg-background',
      )}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:h-20 md:px-8">
        <Link href="/" className="group flex items-center gap-3" aria-label="The Bombay Sandwich Co, home">
          <Logo />
          <span className="hidden font-display text-[15px] leading-[1.05] text-ink sm:block">
            Bombay
            <br />
            Sandwich Co
          </span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((l) => {
              const active = isActive(pathname, l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={active ? 'page' : undefined}
                    className="relative isolate block rounded-full px-4 py-2 text-[15px] font-bold text-ink"
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full border-2 border-ink bg-turmeric"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      />
                    )}
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <Link href="/order" className="btn btn-order relative px-4 py-3 md:px-5" data-cursor="Order">
          <span className="shine" aria-hidden="true" />
          <ShoppingBag className="size-5" aria-hidden="true" />
          <span>Order</span>
          <AnimatePresence>
            {ready && count > 0 && (
              <motion.span
                key={count}
                initial={{ scale: 0.3, rotate: -40 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                className="absolute -right-2 -top-2 grid min-w-6 place-items-center rounded-full border-2 border-ink bg-turmeric px-1 text-xs font-extrabold text-ink"
                aria-label={`${count} items in your order`}
              >
                {count}
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>
    </header>
  );
}
