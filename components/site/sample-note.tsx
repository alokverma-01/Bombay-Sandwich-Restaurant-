import { Info } from 'lucide-react';
import { site } from '@/lib/site';
import { cn } from '@/lib/utils';

/** Visible reminder that some content is a placeholder. Hidden when NEXT_PUBLIC_SHOW_SAMPLE_BADGES=false. */
export function SampleNote({ children, className }: { children: React.ReactNode; className?: string }) {
  if (!site.showSampleBadges) return null;
  return (
    <p className={cn('flex items-start gap-2 rounded-2xl border-2 border-dashed border-ink/60 bg-white/80 px-4 py-3 text-sm text-ink', className)}>
      <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}
