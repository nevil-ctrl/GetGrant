import React from 'react';
import { cn } from '../lib/utils';

interface GetGrantInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export function GetGrantInput({ 
  label, 
  error, 
  icon,
  className,
  ...props 
}: GetGrantInputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 text-sm text-[#1A1A1A]">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6D7A89]">
            {icon}
          </div>
        )}
        <input
          className={cn(
            'w-full px-4 py-3 min-h-[44px] bg-[#F5F5F5] border border-transparent rounded-lg',
            'text-[#1A1A1A] placeholder:text-[#6D7A89]',
            'focus:outline-none focus:ring-2 focus:ring-[#1055b2] focus:border-transparent',
            'transition-all duration-200',
            error && 'border-red-500 focus:ring-red-500',
            icon && 'pl-10',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
