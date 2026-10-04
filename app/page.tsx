import Link from 'next/link';
import { Clock, MapPin, Navigation, Star } from 'lucide-react';
import { HeroStack } from '@/components/site/hero-stack';
import { HeroCopy } from '@/components/site/hero-copy';
import { Marquee } from '@/components/site/marquee';
import { DishCard } from '@/components/site/dish-card';
import { Steps } from '@/components/site/steps';
import { GoogleRating } from '@/components/site/rating';
import { ReviewMarquee } from '@/components/site/review-marquee';
import { OpenBadge } from '@/components/site/open-badge';
import { SmartImage } from '@/components/site/smart-image';
import { SampleNote } from '@/components/site/sample-note';
import { dishes, signatureIds } from '@/lib/menu';
import { gallery } from '@/lib/gallery';
import { site } from '@/lib/site';

const signatures = signatureIds.map((id) => dishes.find((d) => d.id === id)!).filter(Boolean);
const teaser = gallery.slice(0, 5);
const tints = ['var(--beet)', 'var(--sky)', 'var(--turmeric)', 'var(--chutney)', 'var(--tomato)'];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b-2 border-ink bg-turmeric">
        <div className="dots absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-10 md:px-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-6 lg:pb-24 lg:pt-14">
          <HeroCopy />
          <HeroStack />
        </div>
        <div className="taxi-stripe relative h-4 border-t-2 border-ink" aria-hidden="true" />
      </section>

      {/* MARQUEES */}
      <div className="relative z-10 -my-2 overflow-hidden py-6">
        <Marquee
          className="-rotate-[1.5deg] bg-ink"
          items={['Bombay veg', 'Masala toast', 'Cheese chilli toast', 'Cutting chai', 'Cold coffee', 'Chocolate sandwich']}
        />
        <Marquee
          reverse
          duration={38}
          className="mt-[-6px] rotate-[1.2deg] bg-beet"
          textClass="text-white"
          items={['Opposite Cinepolis', 'Kisan Bazar', 'Gomti Nagar', 'Order on WhatsApp', 'Open till 11 pm']}
        />
      </div>

      {/* SIGNATURES */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28" aria-labelledby="signatures">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 id="signatures" className="font-display text-[clamp(2.2rem,5.5vw,4rem)] leading-[0.95] text-ink">Start with the ones everyone orders</h2>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">Tap add, keep browsing, and send the whole order on WhatsApp when you&rsquo;re done.</p>
          </div>
          <Link href="/menu" className="btn btn-ink self-start md:self-auto">See the full menu</Link>
        </div>
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {signatures.map((d, i) => (
            <DishCard key={d.id} dish={d} index={i} />
          ))}
        </div>
        <SampleNote className="mt-8 max-w-xl">Dishes and prices are indicative placeholders. Edit them in lib/menu.ts.</SampleNote>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-y-2 border-ink bg-band py-20 md:py-28" aria-labelledby="how">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h2 id="how" className="mb-14 text-center font-display text-[clamp(2.2rem,5.5vw,4rem)] leading-[0.95] text-ink">No app. No login. Just WhatsApp.</h2>
          <Steps />
        </div>
      </section>

      {/* GALLERY TEASER */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28" aria-labelledby="look">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 id="look" className="font-display text-[clamp(2.2rem,5.5vw,4rem)] leading-[0.95] text-ink">Have a look</h2>
          <Link href="/gallery" className="btn btn-turmeric self-start md:self-auto">Open the gallery</Link>
        </div>
        <div className="grid auto-rows-[160px] grid-cols-2 gap-4 md:auto-rows-[210px] md:grid-cols-4 md:gap-6">
          {teaser.map((g, i) => (
            <Link
              key={i}
              href="/gallery"
              data-cursor="View"
              className={`group relative overflow-hidden rounded-[1.5rem] border-2 border-ink shadow-[5px_5px_0_var(--ink)] transition-transform hover:-rotate-1 ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
              style={{ background: tints[i] }}
              aria-label={`${g.alt}. Open the gallery`}
            >
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                <SmartImage image={g.image} alt="" tint={tints[i]} sizes={i === 0 ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 50vw, 25vw'} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section className="overflow-hidden border-y-2 border-ink bg-sky py-20 md:py-28" aria-labelledby="loved">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 md:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-end">
          <div>
            <h2 id="loved" className="font-display text-[clamp(2.2rem,5.5vw,4rem)] leading-[0.95] text-ink">Lucknow likes it</h2>
            <div className="mt-8">
              <GoogleRating />
            </div>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link href="/reviews" className="btn btn-ink">Read reviews</Link>
            <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-white">
              <Star className="size-5" aria-hidden="true" /> Review us on Google
            </a>
          </div>
        </div>
        <div className="mt-14">
          <ReviewMarquee />
        </div>
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SampleNote className="mt-6 max-w-xl">The quotes above are samples. Replace them in lib/reviews.ts with real reviews.</SampleNote>
        </div>
      </section>

      {/* VISIT */}
      <section className="bg-beet text-white" aria-labelledby="visit">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 md:px-8 md:py-24 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 id="visit" className="font-display text-[clamp(2.2rem,5.5vw,4rem)] leading-[0.95]">Right across from Cinepolis</h2>
            <p className="mt-5 max-w-lg text-lg text-white/90">Grab a sandwich before the movie, or a cutting chai after it.</p>
          </div>
          <div className="sticker space-y-5 rounded-[2rem] bg-white p-6 text-ink md:p-8">
            <OpenBadge />
            <p className="flex gap-3 text-lg">
              <MapPin className="mt-1 size-5 shrink-0 text-beet" aria-hidden="true" />
              <span>{site.address.line1}, {site.address.line2}, {site.address.city} {site.address.postalCode}</span>
            </p>
            <p className="flex gap-3 text-lg">
              <Clock className="mt-1 size-5 shrink-0 text-beet" aria-hidden="true" />
              {site.hours.label}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href={site.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-turmeric">
                <Navigation className="size-5" aria-hidden="true" /> Get directions
              </a>
              <Link href="/contact" className="btn btn-white">Contact us</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
