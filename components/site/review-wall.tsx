'use client';

import { motion } from 'framer-motion';
import { reviews } from '@/lib/reviews';
import { ReviewCard } from './review-card';

export function ReviewWall() {
  return (
    <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
      {reviews.map((r, i) => (
        <motion.div
          key={i}
          className="break-inside-avoid"
          initial={{ opacity: 0, y: 50, rotate: i % 2 ? 4 : -4 }}
          whileInView={{ opacity: 1, y: 0, rotate: i % 3 === 0 ? -1 : i % 3 === 1 ? 1 : 0 }}
          whileHover={{ rotate: 0, scale: 1.02 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ type: 'spring', stiffness: 200, damping: 18, delay: (i % 3) * 0.08 }}
        >
          <ReviewCard review={r} index={i} />
        </motion.div>
      ))}
    </div>
  );
}
