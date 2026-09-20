import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
}) => {
  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'home', label: 'Home', icon: 'storefront' },
    { id: 'cakes', label: 'Cakes', icon: 'cake' },
    { id: 'menu', label: 'Menu', icon: 'bakery_dining' },
    { id: 'occasions', label: 'Occasions', icon: 'celebration' },
    { id: 'contact', label: 'Contact', icon: 'call' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 max-w-[430px] mx-auto bg-[#fff8f6]/95 backdrop-blur-xl border-t border-[#ffe2d8] shadow-[0_-2px_14px_rgba(43,24,16,0.08)] pb-safe">
      <div className="flex items-center justify-around h-16 px-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center min-w-[58px] min-h-[46px] gap-0.5 transition-all duration-200 focus:outline-none ${
                isActive
                  ? 'text-[#6d3403] font-bold scale-105'
                  : 'text-[#53443a]/75 hover:text-[#6d3403]'
              }`}
            >
              <div className="relative">
                <span
                  className="material-symbols-outlined text-[24px]"
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {tab.icon}
                </span>
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#6d3403]" />
                )}
              </div>
              <span className="text-[11px] leading-tight tracking-tight">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
