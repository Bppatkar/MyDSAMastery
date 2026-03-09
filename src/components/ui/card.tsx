// ============================================
// Card Component - Dark theme card
// DSA platform ka main container component
// ============================================

import * as React from 'react';
import { cn } from '@/lib/utils';

// === Card ===
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover ?: boolean;
  glow  ?: 'green' | 'purple' | 'blue' | 'none';
}

const glowMap = {
  green  : 'hover:shadow-lg hover:shadow-emerald-500/15 hover:border-emerald-500/30',
  purple : 'hover:shadow-lg hover:shadow-purple-500/15 hover:border-purple-500/30',
  blue   : 'hover:shadow-lg hover:shadow-blue-500/15 hover:border-blue-500/30',
  none   : '',
};

export function Card({ className, hover = false, glow = 'none', ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-[#111118] border border-[#2a2a3e] rounded-xl',
        'transition-all duration-300',
        hover && 'hover:bg-[#16161f] hover:border-[#3d3d58] cursor-pointer',
        glow !== 'none' && glowMap[glow],
        className
      )}
      {...props}
    />
  );
}

// === CardHeader ===
export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col gap-1.5 p-6', className)} {...props} />;
}

// === CardTitle ===
export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn('text-base font-semibold text-[#e8e8f0] leading-tight', className)} {...props} />
  );
}

// === CardDescription ===
export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-sm text-[#6b6b8a] leading-relaxed', className)} {...props} />;
}

// === CardContent ===
export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-6 pt-0', className)} {...props} />;
}

// === CardFooter ===
export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex items-center p-6 pt-0', className)} {...props} />;
}