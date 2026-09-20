import React, { useState, useEffect } from 'react';
import { BAKERY_IMAGES, PRODUCTS, STORE_INFO } from '../data/bakeryData';
import { Product, TabType } from '../types';

interface HomeScreenProps {
  onNavigateTab: (tab: TabType, categoryFilter?: string) => void;
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
  onOpenCustomCake: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigateTab,
  onAddToCart,
  onProductClick,
  onOpenCustomCake,
}) => {
  // Live countdown to next oven batch (every 45m cycle)
  const [secondsLeft, setSecondsLeft] = useState(26 * 60 + 14);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 45 * 60));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const timeFormatted = `${minutes}m ${seconds < 10 ? '0' : ''}${seconds}s`;

  // Featured 4 products from prompt
  const featuredProducts = [
    PRODUCTS.find((p) => p.id === 'cake-belgian-chocolate') || PRODUCTS[0],
    PRODUCTS.find((p) => p.id === 'snack-golden-patties') || PRODUCTS[1],
    PRODUCTS.find((p) => p.id === 'bakery-almond-croissant') || PRODUCTS[2],
    PRODUCTS.find((p) => p.id === 'sweets-pistachio-jamun') || PRODUCTS[3],
  ];

  return (
    <div className="flex flex-col w-full pb-24">
      {/* Top Greeting & Live Bakery Status Banner */}
      <section className="px-4 pt-3 pb-2">
        <div className="bg-[#ffe9e2] rounded-xl p-3 flex items-center justify-between shadow-xs border border-[#ffdcc7]">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8f4e00] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#8f4e00]"></span>
            </span>
            <span className="text-xs font-bold text-[#8f4e00] tracking-wider uppercase">
              Oven Batch #4 Active
            </span>
          </div>
          <div className="flex items-center gap-1 text-[#53443a]">
            <span className="material-symbols-outlined text-[17px] text-[#6d3403]">
              schedule
            </span>
            <span className="text-xs font-medium">
              Next batch: <span className="font-bold text-[#6d3403]">{timeFormatted}</span>
            </span>
          </div>
        </div>
      </section>

      {/* Hero Promo Showcase */}
      <section className="px-4 pt-1 pb-3">
        <div className="relative overflow-hidden rounded-2xl bg-[#ffe2d8] shadow-md border border-[#ffdcc7]">
          {/* Ambient Backing Glow & Decorative Pattern */}
          <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-[#fea047]/25 blur-2xl pointer-events-none"></div>

          <div className="relative p-4 flex flex-col gap-3 z-10">
            <div className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full bg-white text-[#6d3403] shadow-xs">
              <span className="material-symbols-outlined text-[16px] text-[#8f4e00]">
                local_fire_department
              </span>
              <span className="text-xs font-bold tracking-tight">
                Freshly Baked Daily in Mirpur
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <h2 className="font-headline text-[27px] leading-[34px] font-bold text-[#2a170f]">
                Taste That Brings <br />
                <span className="text-[#6d3403] font-bold">People Together!</span> 🍰🥐
              </h2>
              <p className="text-sm text-[#53443a] leading-relaxed">
                From golden crust loaves to bespoke festive tiered cakes, crafted right here with heritage passion.
              </p>
            </div>

            {/* Pillars Tagline */}
            <div className="py-1 px-3 bg-[#ffe9e2] rounded-lg self-start border border-[#ffdcc7]">
              <p className="text-[12px] font-bold text-[#6d3403] tracking-tight">
                ✨ Freshness • Taste • Quality • Celebration ✨
              </p>
            </div>

            {/* Action CTAs */}
            <div className="flex items-center gap-2.5 pt-1">
              <button
                onClick={() => onNavigateTab('menu')}
                className="px-5 py-2.5 bg-[#6d3403] hover:bg-[#8a4b1a] text-white rounded-xl text-sm font-bold shadow-sm transition-colors flex items-center gap-1.5 active:scale-95"
              >
                <span>Explore Fresh Bakes</span>
                <span className="material-symbols-outlined text-[18px]">
                  arrow_forward
                </span>
              </button>

              <a
                href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=Hi%20Hammad%20Bakers,%20I'd%20like%20to%20inquire%20about%20today's%20fresh%20bakes.`}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2.5 bg-[#ffe9e2] hover:bg-[#ffdbcd] text-[#2a170f] rounded-xl text-sm font-semibold transition-colors flex items-center justify-center border border-[#ffdcc7] active:scale-95"
                title="Chat on WhatsApp"
              >
                <span className="material-symbols-outlined text-[20px] text-[#6d3403]">
                  chat
                </span>
              </a>
            </div>
          </div>

          {/* Food Montage Accent Image */}
          <div className="relative w-full h-44 mt-1">
            <img
              className="w-full h-full object-cover object-center"
              src={BAKERY_IMAGES.heroMontage}
              alt="Warm appetizing spread of golden croissants, freshly baked sourdough breads, layered strawberry cream cake"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#ffe2d8]/90 via-transparent to-transparent"></div>
            <div className="absolute bottom-2.5 right-3 px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-lg text-[11px] font-bold text-[#53443a] flex items-center gap-1 shadow-xs">
              <span className="material-symbols-outlined text-[14px] text-[#8f4e00]">
                verified
              </span>
              Handcrafted in Mirpur
            </div>
          </div>
        </div>
      </section>

      {/* Quick Category Strip: Artisanal Aisles */}
      <section className="py-2">
        <div className="px-4 flex items-center justify-between mb-2.5">
          <div className="flex flex-col">
            <h3 className="font-headline text-lg font-bold text-[#2a170f]">
              Artisanal Aisles
            </h3>
            <span className="text-xs text-[#53443a]">
              Made fresh every sunrise in our Mirpur kitchen
            </span>
          </div>
          <button
            onClick={() => onNavigateTab('menu')}
            className="text-xs font-bold text-[#6d3403] hover:underline flex items-center gap-0.5"
          >
            View All{' '}
            <span className="material-symbols-outlined text-[16px]">
              chevron_right
            </span>
          </button>
        </div>

        {/* Horizontal Category Ribbon */}
        <div className="flex overflow-x-auto gap-2.5 px-4 no-scrollbar pb-1">
          {/* Item 1: Celebration Cakes */}
          <button
            onClick={() => onNavigateTab('cakes')}
            className="flex flex-col items-center gap-2 p-3 bg-[#fff1ec] rounded-2xl min-w-[108px] text-center transition-all active:scale-95 shadow-xs border border-[#ffe2d8] hover:bg-[#ffe9e2]"
          >
            <div className="w-12 h-12 rounded-full bg-[#ffdadb] flex items-center justify-center text-[#8b0129] shadow-inner">
              <span className="material-symbols-outlined text-[24px]">cake</span>
            </div>
            <span className="text-xs font-bold text-[#2a170f] leading-snug">
              Celebration<br />Cakes
            </span>
          </button>

          {/* Item 2: Bakery & Pastries */}
          <button
            onClick={() => onNavigateTab('menu', 'bakery')}
            className="flex flex-col items-center gap-2 p-3 bg-[#fff1ec] rounded-2xl min-w-[108px] text-center transition-all active:scale-95 shadow-xs border border-[#ffe2d8] hover:bg-[#ffe9e2]"
          >
            <div className="w-12 h-12 rounded-full bg-[#ffdcc2] flex items-center justify-center text-[#8f4e00] shadow-inner">
              <span className="material-symbols-outlined text-[24px]">
                bakery_dining
              </span>
            </div>
            <span className="text-xs font-bold text-[#2a170f] leading-snug">
              Bakery &amp;<br />Pastries
            </span>
          </button>

          {/* Item 3: Patties & Snacks */}
          <button
            onClick={() => onNavigateTab('menu', 'snacks')}
            className="flex flex-col items-center gap-2 p-3 bg-[#fff1ec] rounded-2xl min-w-[108px] text-center transition-all active:scale-95 shadow-xs border border-[#ffe2d8] hover:bg-[#ffe9e2]"
          >
            <div className="w-12 h-12 rounded-full bg-[#ffdcc7] flex items-center justify-center text-[#6d3403] shadow-inner">
              <span className="material-symbols-outlined text-[24px]">
                lunch_dining
              </span>
            </div>
            <span className="text-xs font-bold text-[#2a170f] leading-snug">
              Patties &amp;<br />Snacks
            </span>
          </button>

          {/* Item 4: Mithai & Sweets */}
          <button
            onClick={() => onNavigateTab('menu', 'sweets')}
            className="flex flex-col items-center gap-2 p-3 bg-[#fff1ec] rounded-2xl min-w-[108px] text-center transition-all active:scale-95 shadow-xs border border-[#ffe2d8] hover:bg-[#ffe9e2]"
          >
            <div className="w-12 h-12 rounded-full bg-[#ffdbcd] flex items-center justify-center text-[#8a4b1a] shadow-inner">
              <span className="material-symbols-outlined text-[24px]">cookie</span>
            </div>
            <span className="text-xs font-bold text-[#2a170f] leading-snug">
              Mithai &amp;<br />Sweets
            </span>
          </button>

          {/* Item 5: Beverages & Tea */}
          <button
            onClick={() => onNavigateTab('menu', 'beverages')}
            className="flex flex-col items-center gap-2 p-3 bg-[#fff1ec] rounded-2xl min-w-[108px] text-center transition-all active:scale-95 shadow-xs border border-[#ffe2d8] hover:bg-[#ffe9e2]"
          >
            <div className="w-12 h-12 rounded-full bg-[#ffb77a]/30 flex items-center justify-center text-[#6d3a00] shadow-inner">
              <span className="material-symbols-outlined text-[24px]">
                local_cafe
              </span>
            </div>
            <span className="text-xs font-bold text-[#2a170f] leading-snug">
              Beverages &amp;<br />Tea
            </span>
          </button>
        </div>
      </section>

      {/* 'Made for Every Occasion' Showcase */}
      <section className="px-4 pt-3 pb-2">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[20px] text-[#8b0129]">
                celebration
              </span>
              <h3 className="font-headline text-lg font-bold text-[#2a170f]">
                Made for Every Occasion
              </h3>
            </div>
            <span className="text-xs text-[#53443a]">
              Celebrate life’s milestones with Hammad Bakers
            </span>
          </div>
        </div>

        {/* Occasions Carousel */}
        <div className="flex overflow-x-auto gap-3.5 no-scrollbar pb-2">
          {/* Card 1: Birthdays & Anniversaries */}
          <div className="min-w-[260px] max-w-[260px] bg-white rounded-2xl overflow-hidden shadow-sm border border-[#ffe2d8] flex flex-col justify-between">
            <div>
              <div className="relative h-36 w-full overflow-hidden">
                <img
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  src={BAKERY_IMAGES.birthdayCake}
                  alt="A lush artisan birthday cake adorned with fresh berries"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#8b0129] text-white text-[10px] font-bold tracking-wide">
                  BIRTHDAYS
                </span>
              </div>
              <div className="p-3 flex flex-col gap-1">
                <h4 className="font-bold text-sm text-[#2a170f]">
                  Birthdays &amp; Anniversaries
                </h4>
                <p className="text-xs text-[#53443a] leading-relaxed line-clamp-2">
                  Make sweet moments unforgettable with custom photo &amp; flavor layers.
                </p>
              </div>
            </div>
            <div className="p-3 pt-0">
              <button
                onClick={onOpenCustomCake}
                className="text-xs font-bold text-[#6d3403] flex items-center gap-1 hover:underline pt-1"
              >
                Customize Cake{' '}
                <span className="material-symbols-outlined text-[16px]">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>

          {/* Card 2: Weddings & Engagements */}
          <div className="min-w-[260px] max-w-[260px] bg-white rounded-2xl overflow-hidden shadow-sm border border-[#ffe2d8] flex flex-col justify-between">
            <div>
              <div className="relative h-36 w-full overflow-hidden">
                <img
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  src={BAKERY_IMAGES.weddingCake}
                  alt="Grand multi-tiered white and blush wedding cake"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#8f4e00] text-white text-[10px] font-bold tracking-wide">
                  ROYAL WEDDINGS
                </span>
              </div>
              <div className="p-3 flex flex-col gap-1">
                <h4 className="font-bold text-sm text-[#2a170f]">
                  Weddings &amp; Engagements
                </h4>
                <p className="text-xs text-[#53443a] leading-relaxed line-clamp-2">
                  Grand tiered custom centerpiece cakes designed for fairytale celebrations.
                </p>
              </div>
            </div>
            <div className="p-3 pt-0">
              <button
                onClick={() => onNavigateTab('occasions')}
                className="text-xs font-bold text-[#6d3403] flex items-center gap-1 hover:underline pt-1"
              >
                Book Tasting{' '}
                <span className="material-symbols-outlined text-[16px]">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>

          {/* Card 3: Tea Time & Gatherings */}
          <div className="min-w-[260px] max-w-[260px] bg-white rounded-2xl overflow-hidden shadow-sm border border-[#ffe2d8] flex flex-col justify-between">
            <div>
              <div className="relative h-36 w-full overflow-hidden">
                <img
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  src={BAKERY_IMAGES.highTeaPlatter}
                  alt="Crispy hot golden chicken patties and spiced samosas"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#6d3403] text-white text-[10px] font-bold tracking-wide">
                  TEA TIME
                </span>
              </div>
              <div className="p-3 flex flex-col gap-1">
                <h4 className="font-bold text-sm text-[#2a170f]">
                  Family Gatherings &amp; High Tea
                </h4>
                <p className="text-xs text-[#53443a] leading-relaxed line-clamp-2">
                  Crisp savory patties, spiced chicken rolls, and crumbly butter biscuits.
                </p>
              </div>
            </div>
            <div className="p-3 pt-0">
              <button
                onClick={() => onNavigateTab('menu', 'snacks')}
                className="text-xs font-bold text-[#6d3403] flex items-center gap-1 hover:underline pt-1"
              >
                Order High Tea Box{' '}
                <span className="material-symbols-outlined text-[16px]">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Today's Fresh Bakes (Popular Picks) */}
      <section className="px-4 pt-3 pb-3" id="fresh-picks">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[20px] text-[#8f4e00]">
                oven_gen
              </span>
              <h3 className="font-headline text-lg font-bold text-[#2a170f]">
                Today's Fresh Bakes
              </h3>
            </div>
            <span className="text-xs text-[#53443a]">
              Freshly out of the oven. Limited batch daily.
            </span>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-[#fea047]/25 text-[#6d3a00] text-[11px] font-bold tracking-wide">
            MIRPUR SPECIAL
          </span>
        </div>

        {/* Product Grid: 2-column mobile cards */}
        <div className="grid grid-cols-2 gap-2.5">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow-xs border border-[#ffe2d8] flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5"
            >
              <div
                onClick={() => onProductClick(product)}
                className="cursor-pointer"
              >
                <div className="relative h-32 w-full overflow-hidden bg-[#ffe9e2]">
                  <img
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    src={product.image}
                    alt={product.altText}
                  />
                  <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded bg-white/90 backdrop-blur text-[10px] text-[#6d3403] font-bold flex items-center gap-0.5 shadow-xs">
                    <span
                      className="material-symbols-outlined text-[12px] text-[#8f4e00]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>{' '}
                    {product.rating.toFixed(1)}
                  </div>
                </div>

                <div className="p-2.5 flex flex-col gap-0.5">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider ${
                      product.tag === 'SIGNATURE'
                        ? 'text-[#8b0129]'
                        : product.tag === 'BESTSELLER'
                        ? 'text-[#8f4e00]'
                        : product.tag === 'MITHAI LUXURY'
                        ? 'text-[#8b0129]'
                        : 'text-[#53443a]'
                    }`}
                  >
                    {product.tag || 'FRESH'}
                  </span>
                  <h4 className="font-bold text-[14px] leading-tight text-[#2a170f] line-clamp-2">
                    {product.name}
                  </h4>
                  <span className="text-[11px] text-[#53443a]/90 truncate">
                    {product.subtitle}
                  </span>
                </div>
              </div>

              <div className="p-2.5 pt-0 flex items-center justify-between mt-1">
                <div className="flex flex-col">
                  <span className="font-bold text-[15px] text-[#6d3403]">
                    Rs. {product.price.toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={() => onAddToCart(product)}
                  aria-label={`Add ${product.name} to cart`}
                  className="w-8 h-8 rounded-lg bg-[#6d3403] hover:bg-[#8a4b1a] text-white flex items-center justify-center shadow-xs active:scale-90 transition-transform"
                >
                  <span className="material-symbols-outlined text-[19px]">add</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Special Bespoke Cake Callout */}
      <section className="px-4 py-2">
        <div className="bg-gradient-to-r from-[#8a4b1a] to-[#6d3403] rounded-2xl p-4 text-white flex flex-col gap-3 shadow-md relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none flex items-center justify-center">
            <span className="material-symbols-outlined text-[130px] -mr-8 text-amber-200">
              celebration
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-[#ffdcc7] text-[#311300] text-[11px] font-bold">
              BESPOKE ATELIER
            </span>
            <span className="text-[#ffc9a6] text-xs font-medium">
              Over 1,200 Custom Cakes Delivered
            </span>
          </div>

          <div className="flex flex-col gap-1 z-10 max-w-[85%]">
            <h3 className="font-headline text-xl font-bold text-white">
              Dreaming of a Special Cake?
            </h3>
            <p className="text-xs text-[#ffc9a6] leading-relaxed">
              Share your inspiration picture or theme. Our master pastry chefs in Mirpur will craft your custom centerpiece!
            </p>
          </div>

          <div className="flex items-center gap-2.5 pt-1 z-10">
            <button
              onClick={onOpenCustomCake}
              className="px-4 py-2 bg-white text-[#6d3403] hover:bg-[#fff8f6] rounded-xl text-xs font-bold shadow transition-colors inline-flex items-center gap-1.5 active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">
                photo_camera
              </span>
              <span>Customize &amp; WhatsApp Reference</span>
            </button>
          </div>
        </div>
      </section>

      {/* Location, Delivery & Bakery Trust Card */}
      <section className="px-4 pt-2 pb-6">
        <div className="bg-[#fff1ec] rounded-2xl p-4 shadow-xs border border-[#ffe2d8] flex flex-col gap-3.5">
          {/* Bakery Identity */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#ffe2d8] flex items-center justify-center text-[#6d3403] shadow-inner">
                <span className="material-symbols-outlined text-[28px]">
                  storefront
                </span>
              </div>
              <div className="flex flex-col">
                <h4 className="font-bold text-base text-[#2a170f]">
                  Hammad Bakers Mirpur
                </h4>
                <span className="text-xs text-[#53443a] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-[#8f4e00]">
                    location_on
                  </span>
                  Sector D-1 / Allama Iqbal Road, Mirpur AJK
                </span>
              </div>
            </div>
          </div>

          {/* Trust Badges & Promise */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#ffe9e2] rounded-xl p-2.5 flex items-start gap-2 border border-[#ffdcc7]">
              <span className="material-symbols-outlined text-[20px] text-[#8f4e00] mt-0.5">
                moped
              </span>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#2a170f]">
                  Citywide Delivery
                </span>
                <span className="text-[11px] text-[#53443a]">
                  Carefully packed in Mirpur
                </span>
              </div>
            </div>
            <div className="bg-[#ffe9e2] rounded-xl p-2.5 flex items-start gap-2 border border-[#ffdcc7]">
              <span className="material-symbols-outlined text-[20px] text-[#6d3403] mt-0.5">
                timer
              </span>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#2a170f]">
                  Quick Pickup
                </span>
                <span className="text-[11px] text-[#53443a]">
                  Hot &amp; ready in 20 mins
                </span>
              </div>
            </div>
          </div>

          {/* Heart Note */}
          <div className="p-3 bg-[#ffdadb]/50 rounded-xl text-center flex flex-col items-center justify-center gap-0.5 border border-[#ffb2b8]/50">
            <p className="font-headline text-sm font-semibold text-[#8b0129] leading-snug">
              "Hammad Bakers — Making every bite a little more special!" ❤️
            </p>
            <span className="text-[10px] font-bold text-[#90062c] tracking-wider uppercase">
              Fresh Daily Since Inception
            </span>
          </div>

          {/* Direct Contact Buttons */}
          <div className="flex items-center gap-2 pt-1">
            <a
              href={`tel:${STORE_INFO.phone}`}
              className="flex-1 py-2.5 bg-white text-[#2a170f] rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border border-[#ffe2d8] hover:bg-[#ffe9e2] transition-colors"
            >
              <span className="material-symbols-outlined text-[18px] text-[#6d3403]">
                call
              </span>
              <span>Call Shop</span>
            </a>
            <a
              href={`https://wa.me/${STORE_INFO.whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-2.5 bg-[#8f4e00] hover:bg-[#6d3a00] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span>Quick WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
