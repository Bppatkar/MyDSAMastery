// ============================================
// Button Component - Reusable button
// Multiple variants aur sizes support karta hai
// ============================================

import * as React from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link';
type Size    = 'sm' | 'md' | 'lg' | 'icon';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant    ?: Variant;
  size       ?: Size;
  isLoading  ?: boolean;
  leftIcon   ?: React.ReactNode;
  rightIcon  ?: React.ReactNode;
  asChild    ?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
    'bg-emerald-500 hover:bg-emerald-400 text-black font-semibold ' +
    'shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40',
  secondary:
    'bg-purple-600 hover:bg-purple-500 text-white font-semibold ' +
    'shadow-lg shadow-purple-500/20',
  outline:
    'border border-[var(--border-strong)] hover:border-emerald-500/50 ' +
    'text-[var(--tx-1)] hover:text-emerald-400 hover:bg-emerald-500/5',
  ghost:
    'text-[var(--tx-3)] hover:text-[var(--tx-1)] hover:bg-[var(--bg-hover)]',
  destructive:
    'bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400',
  link:
    'text-emerald-400 hover:text-emerald-300 underline-offset-4 ' +
    'hover:underline p-0 h-auto shadow-none',
};

const sizes: Record<Size, string> = {
  sm   : 'h-8 px-3 text-xs rounded-md gap-1.5',
  md   : 'h-10 px-4 text-sm rounded-lg gap-2',
  lg   : 'h-12 px-6 text-base rounded-xl gap-2',
  icon : 'h-10 w-10 rounded-lg',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant   = 'primary',
      size      = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center',
        'transition-all duration-200',
        'cursor-pointer select-none',
        'focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-emerald-500 focus-visible:ring-offset-2',
        'focus-visible:ring-offset-[#0a0a0f]',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
        'active:scale-95',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Loading spinner */}
      {isLoading ? (
        <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        leftIcon && <span className="flex-shrink-0">{leftIcon}</span>
      )}

      {children && <span>{children}</span>}

      {!isLoading && rightIcon && (
        <span className="flex-shrink-0">{rightIcon}</span>
      )}
    </button>
  )
);

Button.displayName = 'Button';