import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/site/page-hero';
import { LayerExplainer } from '@/components/site/layer-explainer';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About',
  description: `${site.name} brings the Mumbai street sandwich to Vibhuti Khand, Gomti Nagar, Lucknow.`,
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <>
      <PageHero title="A Mumbai street classic, in Lucknow" color="var(--beet)" ink="#fff" intro="The Bombay sandwich started at roadside stalls in Mumbai: soft bread, sharp chutney, cool vegetables and a pinch of masala. We make that, right here in Gomti Nagar." />

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28" aria-labelledby="layers">
        <h2 id="layers" className="max-w-3xl font-display text-[clamp(2.2rem,5.5vw,4rem)] leading-[0.95] text-ink">What goes into a Bombay sandwich</h2>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">Tap a layer to see what it does.</p>
        <div className="mt-12">
          <LayerExplainer />
        </div>
      </section>

      <section className="border-y-2 border-ink bg-band py-20 md:py-28" aria-labelledby="note">
        <div className="mx-auto max-w-3xl px-4 md:px-8">
          <h2 id="note" className="font-display text-[clamp(2rem,4.5vw,3.2rem)] leading-[0.95] text-ink">Why we do it</h2>
          <p className="mt-6 text-xl leading-relaxed text-ink">
            We wanted Lucknow to taste the sandwich Mumbai grows up on: made fresh to order, packed with green chutney and crunchy vegetables, and priced for every day. Every sandwich is built by hand the moment you order it, so you walk away with something hot, fresh and full of flavour.
          </p>
        </div>
      </section>

      <section className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-20 md:flex-row md:items-center md:justify-between md:px-8">
        <h2 className="font-display text-[clamp(2rem,4.5vw,3.2rem)] leading-[0.95] text-ink">Hungry now?</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/menu" className="btn btn-beet">See the menu</Link>
          <Link href="/contact" className="btn btn-white">Find us</Link>
        </div>
      </section>
    </>
  );
}
