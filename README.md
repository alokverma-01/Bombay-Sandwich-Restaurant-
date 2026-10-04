# The Bombay Sandwich Co — website v2

Bright, animated restaurant site built with **Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 + shadcn structure + Framer Motion**.
Ordering happens on WhatsApp: no payment gateway, no backend, no database.

## 1. Run it

```bash
npm install
cp .env.example .env.local     # then fill in the WhatsApp number
npm run dev                    # http://localhost:3000
npm run build && npm start     # production check
```

Node 18.18+ (Node 20 or 22 recommended). This project was written without network access, so please run
`npm install && npm run build` once locally first and fix anything it reports.

## 2. The one thing you must do before launch

Set `NEXT_PUBLIC_WHATSAPP_NUMBER` in `.env.local` (and in your host's environment settings), digits only,
with country code: `919876543210`. Until it is set, every WhatsApp button is disabled and the order page
shows a warning, so no order can silently go nowhere.

## 3. Pages

| Route | What it does |
|---|---|
| `/` | Hero with the sandwich-assembly animation, marquees, popular dishes, how ordering works, gallery teaser, rating + reviews, visit info |
| `/menu` | Colour-coded categories, search, add-to-order on every dish |
| `/order` | Basket, pickup/delivery, details, live WhatsApp message preview, send button |
| `/gallery` | Filterable masonry grid with a shared-element lightbox (swipe, arrow keys, Esc) |
| `/reviews` | Google rating (count-up + star fill) and the review wall |
| `/about` | Interactive "what goes into a Bombay sandwich" explainer and owner's note |
| `/contact` | Address, hours with live open/closed badge, map, message-on-WhatsApp form |

Also: custom 404, `sitemap.xml`, `robots.txt`, Restaurant JSON-LD, per-page metadata.

## 4. Motion and interaction

- **Custom cursor** (`components/site/custom-cursor.tsx`): dot + spring ring, turns into a label bubble over
  anything with `data-cursor="Label"`, colour burst on click. Disabled on touch screens and with reduced motion.
- **Page transitions** (`app/template.tsx`): two colour curtains lift on every navigation (pure CSS, so content
  still shows if JavaScript fails).
- **Hero** (`components/site/hero-stack.tsx`): the sandwich builds from the bottom up, gets pressed, then grilled.
- Everything respects `prefers-reduced-motion` via `<MotionConfig reducedMotion="user">` and CSS.

## 5. The two supplied components

Both live in **`components/ui/`**, which is the shadcn default (`components.json` → `aliases.ui`).
Keeping third-party/shadcn components there matters because `npx shadcn add …` writes to that folder and
imports like `@/components/ui/circle-menu` resolve through the `@/*` path alias in `tsconfig.json`.

- `circle-menu.tsx` → used as the **mobile/tablet navigation** (`components/site/nav-circle.tsx`, bottom-left).
  Small changes for valid HTML/accessibility only: the item's inner `motion.button` became `motion.span`
  (a button inside a link is invalid), and items/trigger got `aria-label`s.
- `fluid-menu.tsx` → used as the **desktop quick-contact dock** (`components/site/quick-dock.tsx`, right side).
  Small changes: removed unused imports, and collapsed items ignore clicks so they can't be hit while hidden.
- Original demos are kept in `components/demos/`.

The CircleMenu reads `--foreground`, `--background` and `--muted` from `app/globals.css`, which are mapped
to the brand ink, white and turmeric.

## 6. Replace the placeholders

| What | Where | Status |
|---|---|---|
| Name, address, map, hours, Google rating | `lib/site.ts` | From the public Google listing (rating as of Aug 2026) |
| Menu items and prices | `lib/menu.ts` | **Placeholders** |
| Reviews | `lib/reviews.ts` | **Samples** — use real ones you may show |
| Photos | `lib/images.ts` | **Unsplash stock**: one verified photo per dish, credited on the Gallery page. Not the café's own food, so swap in real photos (`public/photos/`) when you have them |
| "Why we do it" note | `app/about/page.tsx` | Generic copy, swap in the owner's own words if you like |
| Phone, Instagram, Facebook | `.env.local` | Hidden until set |

If a remote photo ever fails to load, a coloured placeholder appears instead of a broken image.

## 7. Deploy

Vercel: import the repo, add the environment variables from `.env.example`, deploy.
Any Node host works too (`npm run build && npm start`).
