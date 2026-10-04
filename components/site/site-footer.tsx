import Link from 'next/link';
import { Clock, MapPin, Phone } from 'lucide-react';
import { site } from '@/lib/site';
import { hasWhatsApp, quickOrderText, waLink } from '@/lib/whatsapp';
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from './brand-icons';
import { navLinks } from './nav-links';

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="no-print relative overflow-hidden bg-ink pb-40 text-white lg:pb-12">
      <div className="taxi-stripe h-4 border-y-2 border-ink" />
      <div className="mx-auto max-w-7xl px-4 pt-16 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <p className="font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.95] text-turmeric">Hungry? Text&nbsp;us.</p>
            <p className="mt-4 max-w-md text-lg text-white/80">
              Send your order on WhatsApp and we&rsquo;ll confirm the total and when it&rsquo;s ready.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {hasWhatsApp ? (
                <a href={waLink(quickOrderText)} target="_blank" rel="noopener noreferrer" className="btn btn-wa" data-cursor="Chat">
                  <WhatsAppIcon className="size-5" /> Order on WhatsApp
                </a>
              ) : (
                <Link href="/order" className="btn btn-wa">
                  <WhatsAppIcon className="size-5" /> Order on WhatsApp
                </Link>
              )}
              <Link href="/menu" className="btn btn-turmeric">See the menu</Link>
            </div>
          </div>

          <div className="space-y-5 text-white/85">
            <h2 className="font-display text-lg text-sky">Visit</h2>
            <p className="flex gap-3">
              <MapPin className="mt-1 size-5 shrink-0 text-turmeric" aria-hidden="true" />
              <span>
                {site.address.line1}
                <br />
                {site.address.line2}
                <br />
                {site.address.city} {site.address.postalCode}
              </span>
            </p>
            <p className="flex gap-3">
              <Clock className="mt-1 size-5 shrink-0 text-turmeric" aria-hidden="true" />
              <span>{site.hours.label}</span>
            </p>
            {site.phone && (
              <p className="flex gap-3">
                <Phone className="mt-1 size-5 shrink-0 text-turmeric" aria-hidden="true" />
                <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="underline-offset-4 hover:underline">{site.phone}</a>
              </p>
            )}
            <a href={site.directionsUrl} target="_blank" rel="noopener noreferrer" className="inline-block font-bold text-turmeric underline underline-offset-4">
              Get directions
            </a>
          </div>

          <div className="space-y-5">
            <h2 className="font-display text-lg text-sky">Explore</h2>
            <ul className="grid grid-cols-2 gap-2 text-white/85">
              {[...navLinks, { href: '/order', label: 'Your order' }].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="underline-offset-4 hover:text-turmeric hover:underline">{l.label}</Link>
                </li>
              ))}
            </ul>
            {(site.instagram || site.facebook) && (
              <div className="flex gap-3 pt-2">
                {site.instagram && (
                  <a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid size-11 place-items-center rounded-full border-2 border-white/30 transition hover:border-turmeric hover:bg-turmeric hover:text-ink">
                    <InstagramIcon className="size-5" />
                  </a>
                )}
                {site.facebook && (
                  <a href={site.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="grid size-11 place-items-center rounded-full border-2 border-white/30 transition hover:border-turmeric hover:bg-turmeric hover:text-ink">
                    <FacebookIcon className="size-5" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-white/15 pt-6 text-sm text-white/60 md:flex-row md:justify-between">
          <p>&copy; {year} {site.name}, Lucknow.</p>
          <p>Prices on this site are indicative. Your WhatsApp confirmation has the final total.</p>
        </div>
      </div>
    </footer>
  );
}
