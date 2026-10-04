import type { Metadata } from 'next';
import { Clock, MapPin, Navigation, Phone } from 'lucide-react';
import { PageHero } from '@/components/site/page-hero';
import { ContactForm } from '@/components/site/contact-form';
import { OpenBadge } from '@/components/site/open-badge';
import { InstagramIcon, FacebookIcon } from '@/components/site/brand-icons';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Find ${site.name} opposite Cinepolis, Kisan Bazar, Vibhuti Khand, Gomti Nagar, Lucknow. Open every day 10 am to 11 pm.`,
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <>
      <PageHero title="Find us" color="var(--sky)" intro="Opposite Cinepolis in Kisan Bazar, Vibhuti Khand. Open every day." />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:px-8 md:py-20 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="sticker space-y-5 rounded-[2rem] bg-turmeric p-6 text-ink md:p-8">
            <OpenBadge />
            <p className="flex gap-3 text-lg font-semibold">
              <MapPin className="mt-1 size-5 shrink-0" aria-hidden="true" />
              <span>
                {site.address.line1}
                <br />
                {site.address.line2}
                <br />
                {site.address.city}, {site.address.state} {site.address.postalCode}
              </span>
            </p>
            <p className="flex gap-3 text-lg font-semibold">
              <Clock className="mt-1 size-5 shrink-0" aria-hidden="true" />
              {site.hours.label}
            </p>
            {site.phone && (
              <p className="flex gap-3 text-lg font-semibold">
                <Phone className="mt-1 size-5 shrink-0" aria-hidden="true" />
                <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="underline underline-offset-4">{site.phone}</a>
              </p>
            )}
            <div className="flex flex-wrap gap-3 pt-1">
              <a href={site.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ink">
                <Navigation className="size-5" aria-hidden="true" /> Get directions
              </a>
              {site.instagram && (
                <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-white" aria-label="Instagram">
                  <InstagramIcon className="size-5" />
                </a>
              )}
              {site.facebook && (
                <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="btn btn-white" aria-label="Facebook">
                  <FacebookIcon className="size-5" />
                </a>
              )}
            </div>
          </div>
          <ContactForm />
        </div>
        <div className="sticker min-h-[420px] overflow-hidden rounded-[2rem] bg-bread lg:min-h-full">
          <iframe
            title={`Map showing ${site.name}`}
            src={site.mapEmbedUrl}
            className="size-full min-h-[420px] border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </>
  );
}
