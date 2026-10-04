'use client';

import { Home, Images, Info, MapPin, ShoppingBag, Star, UtensilsCrossed } from 'lucide-react';
import { CircleMenu } from '@/components/ui/circle-menu';

/**
 * Mobile and tablet navigation, using the CircleMenu component.
 * Desktop uses the header links instead, so this is hidden from lg up.
 * Closed, only the trigger shows, tucked into the bottom-left corner.
 * Open, the whole ring glides up to the middle of the screen so every item fits, and the page dims.
 * The wrapper ignores clicks so the empty 250px circle never blocks the page.
 */
export function NavCircle() {
  return (
    <>
    <div id="nav-scrim" className="no-print lg:hidden" aria-hidden="true" />
    <nav
      id="nav-circle"
      aria-label="Quick navigation"
      style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}
      className="no-print pointer-events-none fixed bottom-[-81px] left-[-81px] z-50 scale-[0.86] transition-[translate] duration-500 ease-[cubic-bezier(.34,1.3,.64,1)] lg:hidden has-[[aria-expanded=true]]:translate-x-[calc(50vw-44px)] has-[[aria-expanded=true]]:-translate-y-[120px] [&_a]:pointer-events-auto [&_button]:pointer-events-auto"
    >
      <CircleMenu
        items={[
          { label: 'Home', icon: <Home size={18} className="text-ink" />, href: '/' },
          { label: 'Menu', icon: <UtensilsCrossed size={18} className="text-ink" />, href: '/menu' },
          { label: 'Order', icon: <ShoppingBag size={18} className="text-ink" />, href: '/order' },
          { label: 'Gallery', icon: <Images size={18} className="text-ink" />, href: '/gallery' },
          { label: 'Reviews', icon: <Star size={18} className="text-ink" />, href: '/reviews' },
          { label: 'About', icon: <Info size={18} className="text-ink" />, href: '/about' },
          { label: 'Contact', icon: <MapPin size={18} className="text-ink" />, href: '/contact' },
        ]}
      />
    </nav>
    </>
  );
}
