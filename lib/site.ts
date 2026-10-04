/**
 * Restaurant details.
 *
 * CONFIRMED fields come from the public Google Maps listing.
 * Contact details and social links come from .env.local (see .env.example).
 */
const clean = (v?: string) => (v ?? '').trim();

export const site = {
  // CONFIRMED - Google listing
  name: 'The Bombay Sandwich Co',
  shortName: 'TBS',
  description:
    'Mumbai-style grilled sandwiches, chai and cold coffee in Vibhuti Khand, Gomti Nagar, Lucknow. Order straight on WhatsApp.',

  // CONFIRMED - Google listing
  address: {
    line1: 'Kisan Bazar, opposite Cinepolis',
    line2: 'Vibhuti Khand, Gomti Nagar',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    postalCode: '226010',
  },
  coordinates: { lat: 26.8618447, lng: 81.0090752 },

  // CONFIRMED - Google listing, same hours every day
  hours: { opens: '10:00', closes: '23:00', label: 'Every day, 10 am to 11 pm' },

  // CONFIRMED - Google listing when this site was built. Update it now and then.
  googleRating: { value: 4.9, count: 16, checkedOn: 'August 2026' },

  mapsUrl: 'https://maps.app.goo.gl/incKQHp3zHe4RS9n6',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=26.8618447,81.0090752',
  mapEmbedUrl: 'https://www.google.com/maps?q=26.8618447,81.0090752&z=17&output=embed',

  // From .env.local
  whatsappNumber: clean(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER).replace(/\D/g, ''),
  phone: clean(process.env.NEXT_PUBLIC_PHONE_NUMBER),
  instagram: clean(process.env.NEXT_PUBLIC_INSTAGRAM_URL),
  facebook: clean(process.env.NEXT_PUBLIC_FACEBOOK_URL),
  url: clean(process.env.NEXT_PUBLIC_SITE_URL) || 'http://localhost:3000',
  showSampleBadges: process.env.NEXT_PUBLIC_SHOW_SAMPLE_BADGES !== 'false',
};

export const fullAddress = `${site.address.line1}, ${site.address.line2}, ${site.address.city}, ${site.address.state} ${site.address.postalCode}`;

/** Returns whether the café is open right now, in Lucknow time. Call on the client only. */
export function isOpenNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(date);
  const h = Number(parts.find((p) => p.type === 'hour')?.value ?? 0) % 24;
  const m = Number(parts.find((p) => p.type === 'minute')?.value ?? 0);
  const now = h * 60 + m;
  const [oh, om] = site.hours.opens.split(':').map(Number);
  const [ch, cm] = site.hours.closes.split(':').map(Number);
  return now >= oh * 60 + om && now < ch * 60 + cm;
}
