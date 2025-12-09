import React from 'react';
import { cn } from '../lib/utils';

interface GetGrantCardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
}

export function GetGrantCard({ 
  children, 
  className, 
  hoverable = false,
  onClick 
}: GetGrantCardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-[#1A1A1A]/10 p-6',
        'transition-all duration-300',
        hoverable && 'hover:shadow-lg hover:border-[#1055b2] cursor-pointer hover:-translate-y-1',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

interface GetGrantCardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function GetGrantCardHeader({ children, className }: GetGrantCardHeaderProps) {
  return (
    <div className={cn('mb-4', className)}>
      {children}
    </div>
  );
}

interface GetGrantCardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function GetGrantCardContent({ children, className }: GetGrantCardContentProps) {
  return (
    <div className={cn('', className)}>
      {children}
    </div>
  );
}

interface GetGrantCardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function GetGrantCardFooter({ children, className }: GetGrantCardFooterProps) {
  return (
    <div className={cn('mt-4 pt-4 border-t border-[#1A1A1A]/10', className)}>
      {children}
    </div>
  );
}
