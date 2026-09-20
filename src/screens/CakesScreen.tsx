import React, { useState } from 'react';
import { BAKERY_IMAGES, PRODUCTS, STORE_INFO } from '../data/bakeryData';
import { Product } from '../types';
import { Sparkles, MessageSquare, ShoppingBag, Upload, Check, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CakesScreenProps {
  onAddToCart: (product: Product, quantity?: number, customization?: { size?: string; message?: string }) => void;
  onProductClick: (product: Product) => void;
}

export const CakesScreen: React.FC<CakesScreenProps> = ({
  onAddToCart,
  onProductClick,
}) => {
  // Cake Customizer State
  const [tier, setTier] = useState<'single' | 'double' | 'triple' | 'bento'>('single');
  const [shape, setShape] = useState<'round' | 'heart' | 'square'>('round');
  const [sizeWeight, setSizeWeight] = useState('2.0 lbs');
  const [baseFlavor, setBaseFlavor] = useState('Belgian Chocolate Fudge');
  const [filling, setFilling] = useState('Velvety Double Ganache');
  const [inscription, setInscription] = useState('Happy Celebration!');
  const [topper, setTopper] = useState('Fresh Berries & Macarons');
  const [selectedPresetImage, setSelectedPresetImage] = useState(BAKERY_IMAGES.birthdayCake);

  // Calculate dynamic price
  const calculatePrice = () => {
    let base = 1800;
    if (tier === 'bento') base = 950;
    else if (tier === 'double') base = 4800;
    else if (tier === 'triple') base = 9500;
    else {
      // single tier weights
      if (sizeWeight === '1.5 lbs') base = 1450;
      if (sizeWeight === '2.0 lbs') base = 1850;
      if (sizeWeight === '3.0 lbs') base = 2700;
    }
    if (baseFlavor === 'Lotus Biscoff Crunch') base += 250;
    if (baseFlavor === 'Pistachio Saffron') base += 350;
    return base;
  };

  const calculatedPrice = calculatePrice();

  const handleWhatsAppInquiry = () => {
    const msg = `*🍰 Custom Cake Inquiry - Hammad Bakers Mirpur*\n\n` +
      `*Tier:* ${tier.toUpperCase()}\n` +
      `*Shape:* ${shape.toUpperCase()}\n` +
      `*Weight:* ${tier === 'double' ? '4-5 lbs' : tier === 'triple' ? '8-10 lbs' : sizeWeight}\n` +
      `*Flavor:* ${baseFlavor}\n` +
      `*Filling:* ${filling}\n` +
      `*Topper/Theme:* ${topper}\n` +
      `*Inscription Text:* "${inscription}"\n` +
      `*Estimated Price:* Rs. ${calculatedPrice.toLocaleString()}\n\n` +
      `*Branch:* Sector D-1 Mirpur AJK\n` +
      `I would like to confirm availability and discuss custom theme details!`;

    window.open(`https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleAddCustomToCart = () => {
    const customCakeProduct: Product = {
      id: `custom-cake-${Date.now()}`,
      name: `Bespoke ${baseFlavor} (${tier.toUpperCase()})`,
      category: 'cakes',
      price: calculatedPrice,
      rating: 5.0,
      reviewsCount: 1,
      tag: 'SIGNATURE',
      subtitle: `${sizeWeight} • ${shape} shape`,
      description: `Custom handcrafted cake with ${baseFlavor}, ${filling}, decorated with ${topper}.`,
      image: selectedPresetImage,
      altText: 'Custom celebration cake handcrafted by Hammad Bakers',
    };

    onAddToCart(customCakeProduct, 1, {
      size: `${tier.toUpperCase()} - ${sizeWeight}`,
      message: inscription,
    });

    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.7 },
    });
  };

  const cakeProducts = PRODUCTS.filter((p) => p.category === 'cakes');

  return (
    <div className="flex flex-col w-full pb-24">
      {/* Banner */}
      <section className="p-4 bg-gradient-to-b from-[#ffe9e2] to-[#fff8f6]">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#8b0129] uppercase tracking-wider mb-1">
          <Sparkles className="w-3.5 h-3.5 text-[#fea047]" />
          <span>Bespoke Pastry Atelier</span>
        </div>
        <h1 className="font-headline text-2xl font-bold text-[#2a170f] leading-tight">
          Custom Celebration Cakes
        </h1>
        <p className="text-xs text-[#53443a] mt-1 leading-relaxed">
          Crafted by our master pastry chefs in Sector F-1 Mirpur. Tailor your layers, flavors, and themes or order direct.
        </p>
      </section>

      {/* Interactive Custom Cake Builder Card */}
      <section className="px-4 py-2">
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-[#ffe2d8] flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-[#ffe2d8] pb-3">
            <div>
              <span className="text-xs font-bold text-[#8f4e00] uppercase tracking-wider block">
                Design Your Cake
              </span>
              <h2 className="font-headline text-lg font-bold text-[#2a170f]">
                Interactive Cake Studio
              </h2>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-stone-500 block">Est. Price</span>
              <span className="font-headline text-lg font-bold text-[#6d3403]">
                Rs. {calculatedPrice.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Visual Cake Preview Mockup */}
          <div className="relative rounded-2xl overflow-hidden bg-[#fff1ec] border border-[#ffe2d8] p-4 flex flex-col items-center justify-center text-center">
            <div className="relative w-40 h-40 rounded-2xl overflow-hidden shadow-md mb-2">
              <img
                src={selectedPresetImage}
                alt="Selected custom cake style"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end justify-center p-2">
                <span className="text-white text-[11px] font-bold drop-shadow">
                  {tier.toUpperCase()} TIER • {shape.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Live Inscription Plate */}
            {inscription && (
              <div className="px-3 py-1 rounded-full bg-[#ffdadb] border border-[#ffb2b8] text-[12px] font-serif font-bold text-[#8b0129] shadow-xs max-w-[280px] truncate">
                ✍️ "{inscription}"
              </div>
            )}
            <span className="text-[11px] text-[#8f4e00] mt-1 font-medium">
              {baseFlavor} • {filling}
            </span>
          </div>

          {/* Step 1: Tier and Shape */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-[#6d3403] tracking-wide block">
              1. Choose Cake Structure:
            </label>
            <div className="grid grid-cols-4 gap-1.5 text-xs font-bold">
              {[
                { id: 'single', label: '1-Tier', sub: 'Standard' },
                { id: 'double', label: '2-Tier', sub: 'Royal' },
                { id: 'triple', label: '3-Tier', sub: 'Grand' },
                { id: 'bento', label: 'Bento', sub: 'Mini' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setTier(item.id as any)}
                  className={`py-2 px-1 rounded-xl text-center transition-all border ${
                    tier === item.id
                      ? 'bg-[#ffe9e2] border-[#8a4b1a] text-[#6d3403] shadow-xs'
                      : 'bg-white border-[#ffe2d8] text-[#53443a]'
                  }`}
                >
                  <div className="font-bold text-xs">{item.label}</div>
                  <div className="text-[10px] text-stone-500 font-normal">{item.sub}</div>
                </button>
              ))}
            </div>

            {/* Shape selection */}
            <div className="flex gap-2 pt-1">
              {[
                { id: 'round', label: 'Classic Round ⚪' },
                { id: 'heart', label: 'Romantic Heart ❤️' },
                { id: 'square', label: 'Modern Square ⏹️' },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setShape(s.id as any)}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium border ${
                    shape === s.id
                      ? 'bg-[#ffe2d8] border-[#8a4b1a] text-[#6d3403]'
                      : 'bg-white border-[#ffe2d8] text-[#53443a]'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Weight Size (if single tier) */}
          {tier === 'single' && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-[#6d3403] tracking-wide block">
                2. Cake Weight:
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
                {['1.5 lbs (6-8 Servings)', '2.0 lbs (8-12 Servings)', '3.0 lbs (14-18 Servings)'].map((w) => {
                  const weightVal = w.split(' ')[0] + ' ' + w.split(' ')[1];
                  return (
                    <button
                      key={w}
                      onClick={() => setSizeWeight(weightVal)}
                      className={`p-2 rounded-xl border text-center transition-all ${
                        sizeWeight === weightVal
                          ? 'bg-[#ffe9e2] border-[#8a4b1a] text-[#6d3403]'
                          : 'bg-white border-[#ffe2d8] text-[#53443a]'
                      }`}
                    >
                      <span className="block font-bold">{weightVal}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3: Base Flavor */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase text-[#6d3403] tracking-wide block">
              3. Signature Sponge &amp; Flavor:
            </label>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {[
                'Belgian Chocolate Fudge',
                'Red Velvet Cream Cheese',
                'Lotus Biscoff Crunch',
                'Madagascar Vanilla Bean',
                'Pistachio Saffron Gold',
                'Salted Caramel Ganache',
              ].map((flavor) => (
                <button
                  key={flavor}
                  onClick={() => setBaseFlavor(flavor)}
                  className={`p-2 rounded-xl text-left border transition-all ${
                    baseFlavor === flavor
                      ? 'bg-[#ffe9e2] border-[#8a4b1a] text-[#6d3403] font-bold'
                      : 'bg-white border-[#ffe2d8] text-[#53443a]'
                  }`}
                >
                  {flavor}
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: Inscription */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase text-[#6d3403] tracking-wide block">
              4. Inscription on Cake:
            </label>
            <input
              type="text"
              value={inscription}
              onChange={(e) => setInscription(e.target.value)}
              placeholder="e.g. Happy 21st Birthday Zainab!"
              className="w-full px-3.5 py-2.5 bg-[#fff8f6] border border-[#ffe2d8] rounded-xl text-xs text-[#2a170f] focus:outline-none focus:ring-2 focus:ring-[#8a4b1a]/40 font-serif"
            />
          </div>

          {/* Step 5: Visual Reference preset */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase text-[#6d3403] tracking-wide block">
              5. Select Style Reference:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { img: BAKERY_IMAGES.birthdayCake, label: 'Berries & Gold' },
                { img: BAKERY_IMAGES.fudgeCake, label: 'Choco Ganache' },
                { img: BAKERY_IMAGES.weddingCake, label: 'Royal Floral' },
              ].map((style) => (
                <button
                  key={style.label}
                  onClick={() => setSelectedPresetImage(style.img)}
                  className={`relative rounded-xl overflow-hidden border-2 aspect-video transition-all ${
                    selectedPresetImage === style.img
                      ? 'border-[#8a4b1a] shadow-md scale-102'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={style.img} alt={style.label} className="w-full h-full object-cover" />
                  <span className="absolute bottom-1 inset-x-0 text-center text-[10px] font-bold text-white bg-black/60 py-0.5">
                    {style.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Builder Action Buttons */}
          <div className="flex flex-col gap-2 pt-2 border-t border-[#ffe2d8]">
            <button
              onClick={handleAddCustomToCart}
              className="w-full py-3 bg-[#6d3403] hover:bg-[#8a4b1a] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add Custom Cake to Cart • Rs. {calculatedPrice.toLocaleString()}</span>
            </button>

            <button
              onClick={handleWhatsAppInquiry}
              className="w-full py-2.5 bg-[#8f4e00] hover:bg-[#6d3a00] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-xs active:scale-98 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Send Reference Photo on WhatsApp</span>
            </button>
          </div>
        </div>
      </section>

      {/* Ready Celebration Cakes Showcase */}
      <section className="px-4 pt-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-headline text-lg font-bold text-[#2a170f]">
              Ready Celebration Cakes
            </h3>
            <span className="text-xs text-[#53443a]">
              Available for quick pickup or same-day delivery
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {cakeProducts.map((cake) => (
            <div
              key={cake.id}
              className="p-3 bg-white rounded-2xl border border-[#ffe2d8] shadow-xs flex gap-3 cursor-pointer hover:bg-[#fff1ec] transition-colors"
              onClick={() => onProductClick(cake)}
            >
              <img
                src={cake.image}
                alt={cake.altText}
                className="w-24 h-24 rounded-xl object-cover shrink-0"
              />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase text-[#8b0129] tracking-wider">
                      {cake.tag || 'CELEBRATION'}
                    </span>
                    <div className="flex items-center gap-0.5 text-xs text-[#8f4e00] font-bold">
                      <Star className="w-3 h-3 fill-[#8f4e00]" />
                      <span>{cake.rating}</span>
                    </div>
                  </div>
                  <h4 className="font-bold text-sm text-[#2a170f] leading-snug">
                    {cake.name}
                  </h4>
                  <p className="text-xs text-[#53443a] line-clamp-1 mt-0.5">
                    {cake.subtitle}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-bold text-sm text-[#6d3403]">
                    Rs. {cake.price.toLocaleString()}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(cake);
                    }}
                    className="px-3 py-1 bg-[#6d3403] hover:bg-[#8a4b1a] text-white rounded-lg text-xs font-bold flex items-center gap-1 active:scale-95"
                  >
                    <span>Add</span>
                    <span className="material-symbols-outlined text-[14px]">add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
