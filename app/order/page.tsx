import type { Metadata } from 'next';
import { PageHero } from '@/components/site/page-hero';
import { OrderForm } from '@/components/site/order-form';

export const metadata: Metadata = {
  title: 'Your order',
  description: 'Check your items, add your details and send your order to The Bombay Sandwich Co on WhatsApp.',
  alternates: { canonical: '/order' },
  robots: { index: false },
};

export default function OrderPage() {
  return (
    <>
      <PageHero title="Your order" intro="Check your items, add your name, and send it on WhatsApp. We reply to confirm." color="var(--chutney)" />
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20">
        <OrderForm />
      </div>
    </>
  );
}
