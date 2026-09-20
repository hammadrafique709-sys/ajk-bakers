import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface ToastProps {
  show: boolean;
  title: string;
  subtitle: string;
  onViewCart: () => void;
}

export const ToastNotification: React.FC<ToastProps> = ({
  show,
  title,
  subtitle,
  onViewCart,
}) => {
  if (!show) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 max-w-[398px] mx-auto transition-all duration-300 transform translate-y-0 opacity-100 animate-in fade-in slide-in-from-bottom-5">
      <div className="bg-[#2a170f] text-[#fff8f6] rounded-xl p-3.5 shadow-2xl flex items-center justify-between border border-amber-900/40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#fea047]/20 flex items-center justify-center text-[#fea047]">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-[#fff8f6] leading-tight">
              {title}
            </span>
            <span className="text-xs text-[#f6d2c5]/80">
              {subtitle}
            </span>
          </div>
        </div>
        <button
          onClick={onViewCart}
          className="px-3.5 py-1.5 bg-[#fea047] text-[#6d3a00] rounded-lg text-xs font-bold hover:bg-[#ffb77a] active:scale-95 transition-all flex items-center gap-1 shadow-sm"
        >
          <span>View</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
