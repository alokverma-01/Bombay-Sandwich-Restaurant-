import type { ImageKey } from './images';

/**
 * MENU DATA. Items and prices are INDICATIVE placeholders.
 * Replace them with the café's real menu before launch.
 */
export type CategoryId = 'classics' | 'grilled' | 'signatures' | 'drinks' | 'sides';
export type Tag = 'Popular' | 'Spicy' | 'Cheesy' | 'Chilled';

export type Category = { id: CategoryId; name: string; blurb: string; color: string; ink: string };

export const categories: Category[] = [
  { id: 'classics', name: 'Bombay classics', blurb: 'The street-cart originals', color: 'var(--beet)', ink: '#ffffff' },
  { id: 'grilled', name: 'Grilled & cheesy', blurb: 'Pressed till the cheese runs', color: 'var(--tomato)', ink: 'var(--ink)' },
  { id: 'signatures', name: 'TBS signatures', blurb: 'Our big, loaded ones', color: 'var(--chutney)', ink: 'var(--ink)' },
  { id: 'drinks', name: 'Chai & coffee', blurb: 'Hot, cold and cutting', color: 'var(--sky)', ink: 'var(--ink)' },
  { id: 'sides', name: 'Sides & shakes', blurb: 'For the table', color: 'var(--turmeric)', ink: 'var(--ink)' },
];

export const categoryById = Object.fromEntries(categories.map((c) => [c.id, c])) as Record<CategoryId, Category>;

export type Dish = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: CategoryId;
  image: ImageKey;
  tags?: Tag[];
};

export const dishes: Dish[] = [
  // Bombay classics
  { id: 'bombay-veg', name: 'Bombay veg sandwich', description: 'Buttered bread, green chutney, potato, cucumber, tomato, onion and beetroot with sandwich masala.', price: 80, category: 'classics', image: 'bombayVeg', tags: ['Popular'] },
  { id: 'chutney-sandwich', name: 'Chutney sandwich', description: 'Soft bread with butter and a thick layer of green chutney. Simple and sharp.', price: 60, category: 'classics', image: 'chutneySandwich' },
  { id: 'masala-toast', name: 'Masala toast', description: 'Spiced aloo filling, toasted crisp on the griller and cut into four.', price: 100, category: 'classics', image: 'masalaToast', tags: ['Popular'] },
  { id: 'bombay-grilled', name: 'Bombay masala grilled', description: 'The full Bombay stack, grilled golden with an extra swipe of chutney.', price: 120, category: 'classics', image: 'bombayGrilled' },

  // Grilled & cheesy
  { id: 'cheese-chilli-toast', name: 'Cheese chilli toast', description: 'Grated cheese, green chilli and coriander, toasted till it bubbles.', price: 130, category: 'grilled', image: 'cheeseChilliToast', tags: ['Spicy', 'Cheesy'] },
  { id: 'paneer-tikka-grilled', name: 'Paneer tikka grilled', description: 'Tandoori paneer, onion and capsicum with mint mayo.', price: 170, category: 'grilled', image: 'paneerTikka', tags: ['Popular'] },
  { id: 'corn-cheese-grilled', name: 'Corn cheese grilled', description: 'Sweet corn, cheese and a little black pepper.', price: 150, category: 'grilled', image: 'cornCheese', tags: ['Cheesy'] },
  { id: 'mayo-veg-grilled', name: 'Mayo veg grilled', description: 'Crunchy veggies tossed in creamy mayo, pressed hot.', price: 140, category: 'grilled', image: 'mayoVeg' },
  { id: 'club-triple', name: 'Triple-decker club', description: 'Three slices, two fillings, one very tall sandwich.', price: 190, category: 'grilled', image: 'clubTriple' },

  // Signatures
  { id: 'tbs-jumbo', name: 'TBS jumbo', description: 'Our biggest stack: aloo, veggies, paneer and double cheese.', price: 220, category: 'signatures', image: 'tbsJumbo', tags: ['Popular', 'Cheesy'] },
  { id: 'pizza-sandwich', name: 'Pizza sandwich', description: 'Pizza sauce, capsicum, olives and mozzarella in a grilled sandwich.', price: 160, category: 'signatures', image: 'pizzaSandwich', tags: ['Cheesy'] },
  { id: 'schezwan-cheese', name: 'Schezwan cheese grilled', description: 'Fiery schezwan sauce, veggies and cheese.', price: 160, category: 'signatures', image: 'schezwanCheese', tags: ['Spicy'] },
  { id: 'chocolate-sandwich', name: 'Chocolate sandwich', description: 'The Mumbai street favourite: grated chocolate, grilled till melty.', price: 110, category: 'signatures', image: 'chocolateSandwich' },

  // Drinks
  { id: 'cutting-chai', name: 'Cutting chai', description: 'Half a glass of strong, sweet tea.', price: 30, category: 'drinks', image: 'cuttingChai', tags: ['Popular'] },
  { id: 'masala-chai', name: 'Masala chai', description: 'Brewed with ginger, cardamom and spice.', price: 40, category: 'drinks', image: 'masalaChai' },
  { id: 'hot-coffee', name: 'Hot coffee', description: 'Frothy, milky and sweet.', price: 70, category: 'drinks', image: 'hotCoffee' },
  { id: 'cold-coffee', name: 'Cold coffee', description: 'Thick blended cold coffee.', price: 110, category: 'drinks', image: 'coldCoffee', tags: ['Chilled', 'Popular'] },
  { id: 'iced-lemon-tea', name: 'Iced lemon tea', description: 'Lemony and lightly sweet, over ice.', price: 90, category: 'drinks', image: 'icedLemonTea', tags: ['Chilled'] },

  // Sides & shakes
  { id: 'masala-fries', name: 'Masala fries', description: 'Crisp fries shaken with chaat masala.', price: 100, category: 'sides', image: 'masalaFries', tags: ['Spicy'] },
  { id: 'peri-peri-fries', name: 'Peri peri fries', description: 'Fries with peri peri seasoning and a dip.', price: 120, category: 'sides', image: 'periPeriFries' },
  { id: 'oreo-shake', name: 'Oreo shake', description: 'Thick shake blended with cookies.', price: 140, category: 'sides', image: 'oreoShake', tags: ['Chilled'] },
  { id: 'chocolate-shake', name: 'Chocolate shake', description: 'Rich, cold and very chocolatey.', price: 130, category: 'sides', image: 'chocolateShake', tags: ['Chilled'] },
];

export const signatureIds = ['bombay-veg', 'cheese-chilli-toast', 'tbs-jumbo', 'cold-coffee'];
