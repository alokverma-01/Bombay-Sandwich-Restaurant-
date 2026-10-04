'use client';

import Image from 'next/image';
import { useState } from 'react';
import { UtensilsCrossed } from 'lucide-react';
import { img, type ImageKey } from '@/lib/images';
import { cn } from '@/lib/utils';

type Props = {
  image: ImageKey;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  tint?: string;
  contain?: boolean;
};

/** next/image with a bright fallback if a photo ever fails to load. Parent must be `relative`. */
export function SmartImage({ image, alt, sizes = '(max-width: 768px) 100vw, 33vw', priority, className, tint = 'var(--turmeric)', contain }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn('absolute inset-0 grid place-items-center text-ink', className)}
        style={{ background: `radial-gradient(circle at 28% 30%, rgba(255,255,255,.55) 0 16%, transparent 17%), radial-gradient(circle at 75% 72%, rgba(255,255,255,.35) 0 10%, transparent 11%), ${tint}` }}
      >
        <UtensilsCrossed className="size-10 opacity-70" aria-hidden="true" />
      </div>
    );
  }

  return (
    <Image
      src={img[image]}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={cn(contain ? 'object-contain' : 'object-cover', className)}
      onError={() => setFailed(true)}
    />
  );
}
