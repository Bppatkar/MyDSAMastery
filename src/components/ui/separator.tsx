import * as React from 'react';
import { cn } from '@/lib/utils';

interface SepProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation ?: 'horizontal' | 'vertical';
}

export function Separator({ className, orientation = 'horizontal', ...props }: SepProps) {
  return (
    <div
      className={cn(
        'bg-[#2a2a3e] flex-shrink-0',
        orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
        className
      )}
      {...props}
    />
  );
}