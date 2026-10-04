import type { Metadata } from 'next';
import { Star } from 'lucide-react';
import { PageHero } from '@/components/site/page-hero';
import { GoogleRating } from '@/components/site/rating';
import { ReviewWall } from '@/components/site/review-wall';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Reviews',
  description: `What guests say about ${site.name} in Gomti Nagar, Lucknow.`,
  alternates: { canonical: '/reviews' },
};

export default function ReviewsPage() {
  return (
    <>
      <PageHero title="Reviews" color="var(--tomato)" intro="Been in? Tell other people what to order." />
      <section className="border-b-2 border-ink bg-ink">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-14 md:flex-row md:items-end md:justify-between md:px-8">
          <GoogleRating dark />
          <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-turmeric self-start md:self-auto">
            <Star className="size-5" aria-hidden="true" /> Write a review on Google
          </a>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20">
        <ReviewWall />
      </div>
    </>
  );
}
