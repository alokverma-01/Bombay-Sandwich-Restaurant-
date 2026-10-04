import { reviews } from '@/lib/reviews';
import { ReviewCard } from './review-card';

/** Two rows of review cards drifting in opposite directions. Hover to pause. */
export function ReviewMarquee() {
  const half = Math.ceil(reviews.length / 2);
  const rows = [reviews.slice(0, half), reviews.slice(half)];
  return (
    <div className="space-y-6">
      {rows.map((row, r) => (
        <div key={r} className="marquee overflow-hidden py-2">
          <div className={`marquee-track flex w-max ${r ? 'marquee-reverse' : ''}`} style={{ '--dur': '55s' } as React.CSSProperties}>
            {[false, true].map((hidden) => (
              <div key={String(hidden)} className="flex shrink-0 gap-6 pr-6" aria-hidden={hidden || undefined}>
                {row.map((rv, i) => (
                  <div key={i} className="w-[19rem] shrink-0 md:w-[24rem]">
                    <ReviewCard review={rv} index={i + r * half} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
