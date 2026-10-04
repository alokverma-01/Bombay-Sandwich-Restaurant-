import type { Metadata } from 'next';
import { PageHero } from '@/components/site/page-hero';
import { MenuBoard } from '@/components/site/menu-board';
import { SampleNote } from '@/components/site/sample-note';

export const metadata: Metadata = {
  title: 'Menu',
  description: 'Bombay classics, grilled cheese sandwiches, chai, cold coffee, fries and shakes. Add to your order and send it on WhatsApp.',
  alternates: { canonical: '/menu' },
};

export default function MenuPage() {
  return (
    <>
      <PageHero title="The menu" intro="Add what you like. Your order builds up as you go, and you send it on WhatsApp at the end." color="var(--turmeric)" />
      <div className="mx-auto max-w-7xl px-4 pb-24 md:px-8">
        <MenuBoard />
        <SampleNote className="mt-16 max-w-xl">Items and prices here are indicative placeholders. Replace them with the café&rsquo;s real menu in lib/menu.ts.</SampleNote>
      </div>
    </>
  );
}
