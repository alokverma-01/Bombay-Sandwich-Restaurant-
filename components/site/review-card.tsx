import { Quote, Star } from 'lucide-react';
import type { Review } from '@/lib/reviews';

const palette = [
  { bg: 'var(--turmeric)', fg: 'var(--ink)' },
  { bg: 'var(--sky)', fg: 'var(--ink)' },
  { bg: 'var(--beet)', fg: '#fff' },
  { bg: 'var(--chutney)', fg: 'var(--ink)' },
  { bg: '#fff', fg: 'var(--ink)' },
  { bg: 'var(--tomato)', fg: 'var(--ink)' },
];

export function ReviewCard({ review, index }: { review: Review; index: number }) {
  const c = palette[index % palette.length];
  return (
    <figure className="sticker relative rounded-[1.75rem] p-6" style={{ background: c.bg, color: c.fg }}>
      <Quote className="absolute right-5 top-5 size-8 opacity-30" aria-hidden="true" />
      <div className="flex gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`size-4 ${i < review.rating ? 'fill-current' : 'opacity-30'}`} aria-hidden="true" />
        ))}
      </div>
      <blockquote className="mt-3 text-lg font-semibold leading-snug">{review.text}</blockquote>
      <figcaption className="mt-4 flex items-center gap-2 text-sm font-bold">
        <span className="grid size-8 place-items-center rounded-full border-2 border-current font-display text-xs">{review.name[0]}</span>
        {review.name}
      </figcaption>
    </figure>
  );
}
