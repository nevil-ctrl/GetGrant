import React from 'react';
import { cn } from '../lib/utils';

interface GetGrantBadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'yellow' | 'outline' | 'success' | 'warning';
  className?: string;
}

export function GetGrantBadge({ 
  children, 
  variant = 'default',
  className 
}: GetGrantBadgeProps) {
  const variants = {
    default: 'bg-[#F5F5F5] text-[#1A1A1A]',
    yellow: 'bg-[#1055b2] text-white',
    outline: 'bg-transparent border border-[#1A1A1A] text-[#1A1A1A]',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-orange-100 text-orange-800'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
