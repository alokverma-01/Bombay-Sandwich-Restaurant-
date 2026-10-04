import type { ImageKey } from './images';

export type GalleryTag = 'Sandwiches' | 'Drinks' | 'The vibe';
export type GalleryItem = { image: ImageKey; alt: string; tag: GalleryTag; tall?: boolean };

/** Stock photos for now (credited on the page). Replace with real photos of the café and its food. */
export const gallery: GalleryItem[] = [
  { image: 'bombayVeg', alt: 'A Bombay-style vegetable sandwich', tag: 'Sandwiches', tall: true },
  { image: 'cuttingChai', alt: 'A tray of chai in small glasses', tag: 'Drinks' },
  { image: 'streetStall', alt: 'A Mumbai street-food stall', tag: 'The vibe' },
  { image: 'bombayGrilled', alt: 'Grilled sandwiches with three dips', tag: 'Sandwiches' },
  { image: 'coldCoffee', alt: 'Cold coffee in a decorated glass', tag: 'Drinks', tall: true },
  { image: 'paneerTikka', alt: 'Paneer tikka sandwich with fries', tag: 'Sandwiches' },
  { image: 'cafeCorner', alt: 'A cosy café corner', tag: 'The vibe', tall: true },
  { image: 'cheeseChilliToast', alt: 'Grilled cheese sandwich halves', tag: 'Sandwiches' },
  { image: 'oreoShake', alt: 'A thick cookie milkshake', tag: 'Drinks' },
  { image: 'chocolateSandwich', alt: 'Toast with chocolate spread', tag: 'Sandwiches', tall: true },
  { image: 'cafeCounter', alt: 'A café counter', tag: 'The vibe' },
  { image: 'chaiAndBread', alt: 'Indian tea with toast', tag: 'Drinks' },
  { image: 'masalaFries', alt: 'Crisp fries with ketchup', tag: 'Sandwiches' },
  { image: 'icedLemonTea', alt: 'Iced lemon tea with mint', tag: 'Drinks', tall: true },
  { image: 'cornCheese', alt: 'Corn cheese sandwich', tag: 'Sandwiches' },
];
