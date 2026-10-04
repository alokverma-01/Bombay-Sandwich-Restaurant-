import type { Metadata } from 'next';
import { PageHero } from '@/components/site/page-hero';
import { GalleryGrid } from '@/components/site/gallery-grid';
import { SampleNote } from '@/components/site/sample-note';
import { photoCredits } from '@/lib/images';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Sandwiches, chai and coffee at The Bombay Sandwich Co, Gomti Nagar.',
  alternates: { canonical: '/gallery' },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero title="Gallery" intro="Tap any photo to open it. Swipe or use the arrow keys to move through them." color="var(--sky)" />
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20">
        <SampleNote className="mb-8 max-w-xl">These are stock photos, not the café. Add your own in /public/photos and update lib/images.ts.</SampleNote>
        <GalleryGrid />
        <p className="mt-12 max-w-3xl text-sm text-muted-foreground">
          Photos on this site from{' '}
          <a href="https://unsplash.com/?utm_source=bombay_sandwich_co&utm_medium=referral" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Unsplash</a>
          {' '}by{' '}
          {photoCredits.map((c, i) => (
            <span key={c.link}>
              <a href={c.link} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{c.name}</a>
              {i < photoCredits.length - 2 ? ', ' : i === photoCredits.length - 2 ? ' and ' : '.'}
            </span>
          ))}
        </p>
      </div>
    </>
  );
}
