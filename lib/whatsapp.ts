import { site } from './site';
import { inr } from './utils';
import type { Dish } from './menu';

export const hasWhatsApp = site.whatsappNumber.length >= 10;

export const waLink = (text: string) =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;

export const quickOrderText = `Hi ${site.name}! I'd like to place an order.`;

export type OrderDetails = {
  lines: { dish: Dish; qty: number }[];
  total: number;
  name: string;
  phone: string;
  mode: 'pickup' | 'delivery';
  address: string;
  when: string;
  notes: string;
};

export function buildOrderMessage(o: OrderDetails) {
  const out: string[] = [
    `Hi ${site.name}! I'd like to place an order.`,
    '',
    '*Order*',
    ...o.lines.map((l) => `${l.qty} x ${l.dish.name} = ${inr(l.dish.price * l.qty)}`),
    `*Items total: ${inr(o.total)}*`,
    '',
    o.mode === 'pickup' ? '*Pickup* from the café' : `*Delivery to:* ${o.address.trim() || '(address)'}`,
  ];
  if (o.name.trim()) out.push(`Name: ${o.name.trim()}`);
  if (o.phone.trim()) out.push(`Phone: ${o.phone.trim()}`);
  out.push(`When: ${o.when.trim() || 'As soon as possible'}`);
  if (o.notes.trim()) out.push(`Notes: ${o.notes.trim()}`);
  out.push('', 'Sent from the website. Please confirm the total and timing.');
  return out.join('\n');
}
