import React, { useState } from 'react';
import { Volume2, VolumeX, Smartphone, Monitor } from 'lucide-react';

interface BakeryBackgroundProps {
  children: React.ReactNode;
  isWideMode: boolean;
  onToggleWideMode: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const BakeryBackground: React.FC<BakeryBackgroundProps> = ({
  children,
  isWideMode,
  onToggleWideMode,
  soundEnabled,
  onToggleSound,
}) => {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#180f0b] text-[#2a170f] selection:bg-[#ffc9a6]">
      {/* --- Amazing Ambient Bakery Hearth Background --- */}
      {/* 1. Deep glowing radial embers from the oven */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 opacity-80"
        style={{
          background: `
            radial-gradient(circle at 50% 0%, rgba(245, 158, 11, 0.22) 0%, transparent 50%),
            radial-gradient(circle at 10% 30%, rgba(180, 83, 9, 0.18) 0%, transparent 45%),
            radial-gradient(circle at 90% 70%, rgba(217, 119, 6, 0.16) 0%, transparent 50%),
            radial-gradient(circle at 50% 100%, rgba(139, 1, 41, 0.2) 0%, transparent 60%),
            linear-gradient(180deg, #1f140e 0%, #160d09 50%, #120a06 100%)
          `
        }}
      />

      {/* 2. Delicate Flour & Warm Golden Motes (Floating particles) */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="animate-float-slow absolute top-12 left-10 h-2.5 w-2.5 rounded-full bg-amber-300/40 blur-[1px]" />
        <div className="animate-float-slow absolute top-1/4 right-16 h-3.5 w-3.5 rounded-full bg-orange-400/30 blur-[2px]" style={{ animationDelay: '2s' }} />
        <div className="animate-float-slow absolute top-2/3 left-1/4 h-2 w-2 rounded-full bg-amber-200/50 blur-[1px]" style={{ animationDelay: '4s' }} />
        <div className="animate-float-slow absolute top-3/4 right-1/3 h-3 w-3 rounded-full bg-rose-400/30 blur-[1.5px]" style={{ animationDelay: '6s' }} />
        <div className="animate-float-slow absolute bottom-20 left-16 h-4 w-4 rounded-full bg-amber-500/20 blur-[2px]" style={{ animationDelay: '1s' }} />
        
        {/* Soft Warm Oven Light Beam */}
        <div className="animate-warm-pulse absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-gradient-to-b from-amber-500/15 via-orange-600/10 to-transparent blur-3xl pointer-events-none" />
      </div>

      {/* 3. Subtle Heritage Wheat Grain Ambient Texture */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 opacity-4 mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.8) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Desktop Luxury Top Bar Controls (Floating pill) */}
      <aside aria-label="Bakery Display Controls" className="hidden lg:flex fixed top-4 right-6 z-50 items-center gap-2 bg-[#2a1b14]/90 border border-amber-900/40 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-2xl text-xs text-amber-200">
        <div className="flex items-center gap-1.5 pr-2 border-r border-amber-800/60">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <span className="font-medium text-amber-100/90 tracking-wide">Hammad Bakers Mirpur</span>
        </div>

        <button
          onClick={onToggleWideMode}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-950/80 hover:bg-amber-800/60 text-amber-200 transition-colors"
          title={isWideMode ? "Switch to Mobile App View" : "Switch to Wide Tablet View"}
        >
          {isWideMode ? (
            <>
              <Smartphone className="w-3.5 h-3.5 text-amber-400" />
              <span>Mobile View</span>
            </>
          ) : (
            <>
              <Monitor className="w-3.5 h-3.5 text-amber-400" />
              <span>Wide View</span>
            </>
          )}
        </button>

        <button
          onClick={onToggleSound}
          className="p-1 rounded-full text-amber-300 hover:text-amber-100 transition-colors"
          title={soundEnabled ? "Mute sound effects" : "Enable sound effects"}
          aria-label={soundEnabled ? "Mute audio" : "Unmute audio"}
        >
          {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 text-amber-500" />}
        </button>
      </aside>

      {/* Desktop Left Ambient Badge */}
      <aside aria-label="Bakery Freshness Guarantee" className="hidden 2xl:flex fixed left-10 bottom-12 z-40 flex-col gap-2 p-4 rounded-2xl bg-[#261710]/80 border border-amber-900/30 backdrop-blur-md max-w-xs text-amber-100/80 shadow-2xl">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
          <span>🥖 Fresh Oven Guarantee</span>
        </div>
        <p className="text-xs text-amber-200/70 leading-relaxed">
          Crafting Mirpur's favorite celebration cakes, flaky patties, and warm pastries daily since inception.
        </p>
        <div className="flex items-center gap-2 pt-1 text-[11px] text-amber-400/90 font-mono">
          <span>📍 Sector D-1, Mirpur AJK</span>
        </div>
      </aside>

      {/* --- Main Application Container --- */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-start lg:py-6">
        <div
          className={`relative w-full transition-all duration-300 ${
            isWideMode
              ? 'max-w-2xl lg:shadow-[0_25px_70px_rgba(0,0,0,0.65)] lg:rounded-[36px]'
              : 'max-w-[430px] lg:shadow-[0_25px_80px_rgba(0,0,0,0.7)] lg:rounded-[40px]'
          } lg:border lg:border-amber-900/30 overflow-hidden bg-[#fff8f6]`}
          style={{ minHeight: '100vh' }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
