import React from 'react';
import { BAKERY_IMAGES } from '../data/bakeryData';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onProfileClick: () => void;
  onLogoClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onProfileClick,
  onLogoClick,
}) => {
  return (
    <header className="sticky top-0 w-full z-40 bg-[#fff8f6]/90 backdrop-blur-xl border-b border-[#ffe2d8]/80 shadow-[0_1px_12px_rgba(43,24,16,0.06)]">
      <div className="h-16 px-4 flex items-center justify-between">
        {/* Brand identity & Mirpur location */}
        <button
          onClick={onLogoClick}
          className="flex items-center gap-2.5 text-left transition-transform active:scale-98 focus:outline-none"
        >
          <img
            src={BAKERY_IMAGES.logo}
            alt="Hammad Bakers Logo"
            className="h-8 w-auto object-contain drop-shadow-sm"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="font-headline text-[21px] font-bold text-[#6d3403] leading-none tracking-tight">
                Hammad Bakers
              </span>
            </div>
            <span className="text-[12px] font-semibold text-[#8f4e00] flex items-center gap-0.5 mt-0.5 tracking-tight">
              <span>📍</span> Mirpur, AJK
            </span>
          </div>
        </button>

        {/* Action icons: Cart & User Profile */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCart}
            aria-label={`Shopping Cart with ${cartCount} items`}
            className="relative w-11 h-11 flex items-center justify-center rounded-full text-[#2a170f] hover:bg-[#ffe9e2] active:scale-95 transition-all focus:outline-none"
          >
            <span className="material-symbols-outlined text-[25px] text-[#6d3403]">
              shopping_bag
            </span>
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[19px] h-[19px] px-1 bg-[#8b0129] text-white rounded-full text-[11px] leading-none flex items-center justify-center font-bold shadow-sm animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={onProfileClick}
            aria-label="User Profile"
            className="relative w-9 h-9 rounded-full ring-2 ring-[#ffdcc2] overflow-hidden hover:opacity-90 active:scale-95 transition-all focus:outline-none shadow-xs"
          >
            <img
              src={BAKERY_IMAGES.profile}
              alt="Hammad Bakers Profile"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
