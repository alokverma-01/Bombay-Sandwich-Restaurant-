'use client';

import { MotionConfig } from 'framer-motion';
import { CartProvider } from './cart';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <CartProvider>{children}</CartProvider>
    </MotionConfig>
  );
}
