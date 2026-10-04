import type { Metadata, Viewport } from 'next';
import { Bungee, Gabarito } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/site/providers';
import { SiteHeader } from '@/components/site/site-header';
import { SiteFooter } from '@/components/site/site-footer';
import { CustomCursor } from '@/components/site/custom-cursor';
import { WhatsAppFab } from '@/components/site/whatsapp-fab';
import { CartBar } from '@/components/site/cart-bar';
import { NavCircle } from '@/components/site/nav-circle';
import { QuickDock } from '@/components/site/quick-dock';
import { site } from '@/lib/site';

const bungee = Bungee({ weight: '400', subsets: ['latin'], variable: '--font-bungee', display: 'swap' });
const gabarito = Gabarito({ subsets: ['latin'], variable: '--font-gabarito', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Bombay sandwiches in Gomti Nagar, Lucknow`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: { type: 'website', siteName: site.name, title: site.name, description: site.description, locale: 'en_IN' },
  twitter: { card: 'summary_large_image', title: site.name, description: site.description },
  alternates: { canonical: '/' },
};

export const viewport: Viewport = { themeColor: '#fff4c4', width: 'device-width', initialScale: 1 };

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: site.name,
  servesCuisine: ['Indian', 'Sandwiches', 'Cafe'],
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${site.address.line1}, ${site.address.line2}`,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.postalCode,
    addressCountry: 'IN',
  },
  geo: { '@type': 'GeoCoordinates', latitude: site.coordinates.lat, longitude: site.coordinates.lng },
  openingHours: `Mo-Su ${site.hours.opens}-${site.hours.closes}`,
  hasMap: site.mapsUrl,
  url: site.url,
  ...(site.phone ? { telephone: site.phone } : {}),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${bungee.variable} ${gabarito.variable}`}>
      <body className="min-h-dvh bg-background font-sans text-foreground antialiased">
        <Providers>
          <CustomCursor />
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
          <QuickDock />
          <NavCircle />
          <CartBar />
          <WhatsAppFab />
        </Providers>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
