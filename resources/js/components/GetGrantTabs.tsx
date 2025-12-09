import React, { useState } from 'react';
import { cn } from '../lib/utils';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface GetGrantTabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
}

export function GetGrantTabs({ tabs, defaultTab, className }: GetGrantTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  return (
    <div className={cn('w-full', className)}>
      <div className="border-b border-[#1A1A1A]/10">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'px-6 py-3 font-medium text-sm transition-all duration-200',
                'border-b-2 whitespace-nowrap min-h-[44px]',
                activeTab === tab.id
                  ? 'border-[#1055b2] text-[#1A1A1A]'
                  : 'border-transparent text-[#6D7A89] hover:text-[#1A1A1A] hover:border-[#1A1A1A]/20'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-6">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={cn(
              'transition-all duration-200',
              activeTab === tab.id ? 'block' : 'hidden'
            )}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}
