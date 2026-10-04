/**
 * Photos: every entry below is a real, verified Unsplash photo (free to use under the Unsplash licence).
 * They are stock photos, NOT photos of The Bombay Sandwich Co's own food. When you have your own,
 * drop them in /public/photos and replace an entry's `src` with e.g. '/photos/masala-toast.jpg'.
 * Credits are shown on the Gallery page. If a photo ever fails to load, a coloured tile shows instead.
 */
type Photo = { id: string; by: string; username: string };

const photos = {
  // Bombay classics
  bombayVeg: { id: '1633669771791-fcda43b7d455', by: 'kumar chandugade', username: 'kcclickography' },
  chutneySandwich: { id: '1678969406367-e7955197c2b5', by: 'Haseeb Modi', username: 'haseebm' },
  masalaToast: { id: '1643473806845-485d1f11688c', by: 'Masha Rayt', username: 'natadunai' },
  bombayGrilled: { id: '1528735602780-2552fd46c7af', by: 'Pixzolo Photography', username: 'pixzolo' },
  // Grilled & cheesy
  cheeseChilliToast: { id: '1475090169767-40ed8d18f67d', by: 'Asnim Ansari', username: 'asnimansari' },
  paneerTikka: { id: '1716535233357-822bcc293573', by: 'Mustafa Fatemi', username: 'solaticace' },
  cornCheese: { id: '1528736235302-52922df5c122', by: 'Pixzolo Photography', username: 'pixzolo' },
  mayoVeg: { id: '1678969405738-323f9acb3c18', by: 'Haseeb Modi', username: 'haseebm' },
  clubTriple: { id: '1553909489-cd47e0907980', by: 'Mae Mu', username: 'picoftasty' },
  // Signatures
  tbsJumbo: { id: '1592415486689-125cbbfcbee2', by: 'The Matter of Food', username: 'thematteroffood' },
  pizzaSandwich: { id: '1673646959730-abc69dbb30c1', by: 'Natalia Gusakova', username: 'nataliaraylenegusakova' },
  schezwanCheese: { id: '1787376811539-09746ed7623d', by: 'Susmitha Veganosaurus', username: 'veganosaurus' },
  chocolateSandwich: { id: '1693858326799-3299d7317f69', by: 'Imad 786', username: 'imad8321' },
  // Chai & coffee
  cuttingChai: { id: '1720875733075-fd8494df7908', by: 'Dilpreet Singh', username: 'its_dilpreet' },
  masalaChai: { id: '1579622306443-7c6a19997a9a', by: 'Ayrus Hill', username: 'ayrus_hill' },
  hotCoffee: { id: '1462917882517-e150004895fa', by: 'Taylor Franz', username: 'taylorrfranz' },
  coldCoffee: { id: '1625242662341-5e92c5101338', by: 'Reshu Drolia', username: 'mintsrecipes' },
  icedLemonTea: { id: '1656936632107-0bfa69ea06de', by: 'Svitlana', username: 'kekse_und_ich' },
  // Sides & shakes
  masalaFries: { id: '1518013431117-eb1465fa5752', by: 'Pixzolo Photography', username: 'pixzolo' },
  periPeriFries: { id: '1541592106381-b31e9677c0e5', by: 'Louis Hansel', username: 'louishansel' },
  oreoShake: { id: '1507750549272-e58742b1df80', by: 'Toa Heftiba', username: 'heftiba' },
  chocolateShake: { id: '1696487774050-ba56e4b62359', by: 'Dreamer Dude', username: 'adnan24nathaniel' },
  // Gallery extras
  icedLatte: { id: '1461023058943-07fcbe16d735', by: 'Demi DeHerrera', username: 'demidearest' },
  chaiAndBread: { id: '1683533699004-7f6b9e5a073f', by: 'Ananthan Chithiraikani', username: 'ananthan8110' },
  streetStall: { id: '1604236240482-7aeaa59f1329', by: 'Sandip Roy', username: 'sandiproy_kolkata' },
  cafeCounter: { id: '1560406127-38842d65308a', by: 'chiranjeeb mitra', username: 'chiro_007' },
  cafeCorner: { id: '1663154757726-e8023937253e', by: 'Saint Rambo', username: 'saint_rambo13' },
} as const satisfies Record<string, Photo>;

export type ImageKey = keyof typeof photos;

const url = (p: Photo) => `https://images.unsplash.com/photo-${p.id}?auto=format&fit=crop&w=1600&q=85`;

export const img = Object.fromEntries(
  (Object.keys(photos) as ImageKey[]).map((k) => [k, url(photos[k])]),
) as Record<ImageKey, string>;

/** One entry per photographer, for the credits line on the Gallery page. */
export const photoCredits = Array.from(
  new Map(Object.values(photos).map((p) => [p.username, { name: p.by, link: `https://unsplash.com/@${p.username}?utm_source=bombay_sandwich_co&utm_medium=referral` }])).values(),
);
