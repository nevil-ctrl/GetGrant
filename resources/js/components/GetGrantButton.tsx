import React from 'react';
import { Button } from './ui/button';
import { cn } from '../lib/utils';

interface GetGrantButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function GetGrantButton({ 
  variant = 'primary', 
  size = 'md', 
  className,
  children,
  ...props 
}: GetGrantButtonProps) {
  const baseStyles = 'font-medium transition-all duration-200 rounded-lg min-h-[44px] min-w-[44px]';
  
  const variants = {
    primary: 'bg-[#1055b2] text-white hover:bg-[#003b8a] active:bg-[#00306f] shadow-sm hover:shadow-md',
    secondary: 'bg-[#1A1A1A] text-white hover:bg-[#2a2a2a] active:bg-[#0a0a0a]',
    outline: 'border-2 border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#F5F5F5] active:bg-[#e5e5e5]',
    ghost: 'text-[#1A1A1A] hover:bg-[#F5F5F5] active:bg-[#e5e5e5]'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
