import React, { useState } from 'react';
import { Product } from '../types';
import { X, Star, Flame, Clock, ShieldCheck, Plus, Minus, Heart } from 'lucide-react';

interface ItemDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, customization?: { size?: string; message?: string }) => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedPortion, setSelectedPortion] = useState(
    product.portionOptions && product.portionOptions.length > 0
      ? product.portionOptions[0]
      : undefined
  );
  const [cakeMessage, setCakeMessage] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, quantity, {
      size: selectedPortion,
      message: cakeMessage.trim() || undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-[#fff8f6] rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto shadow-2xl border border-[#ffe2d8] flex flex-col no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Image Header */}
        <div className="relative h-64 w-full bg-[#ffe9e2]">
          <img
            src={product.image}
            alt={product.altText}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2a170f]/70 via-transparent to-black/30" />

          {/* Close & Favorite Button */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/80 backdrop-blur text-[#2a170f] flex items-center justify-center hover:bg-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsSaved(!isSaved)}
              className="w-9 h-9 rounded-full bg-white/80 backdrop-blur text-[#2a170f] flex items-center justify-center hover:bg-white transition-colors"
            >
              <Heart className={`w-5 h-5 ${isSaved ? 'fill-[#8b0129] text-[#8b0129]' : 'text-[#2a170f]'}`} />
            </button>
          </div>

          {/* Tags on Image */}
          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
            <div className="flex flex-wrap items-center gap-2">
              {product.tag && (
                <span className="px-2.5 py-1 rounded-full bg-[#8b0129] text-white text-[11px] font-bold uppercase tracking-wider shadow">
                  {product.tag}
                </span>
              )}
              {product.freshTime && (
                <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur text-[#6d3403] text-[11px] font-semibold flex items-center gap-1 shadow">
                  <Flame className="w-3 h-3 text-[#fea047]" />
                  {product.freshTime}
                </span>
              )}
            </div>

            <div className="px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur text-[#6d3403] text-xs font-bold flex items-center gap-1 shadow">
              <Star className="w-3.5 h-3.5 fill-[#fea047] text-[#fea047]" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-stone-400 font-normal">({product.reviewsCount})</span>
            </div>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-5 flex flex-col gap-4">
          <div>
            <h3 className="font-headline text-2xl font-bold text-[#2a170f]">
              {product.name}
            </h3>
            <p className="text-sm text-[#8f4e00] font-medium mt-0.5">
              {product.subtitle}
            </p>
          </div>

          <p className="text-sm text-[#53443a] leading-relaxed">
            {product.description}
          </p>

          {/* Portion/Size selector if applicable */}
          {product.portionOptions && product.portionOptions.length > 0 && (
            <div className="flex flex-col gap-2 pt-1 border-t border-[#ffe2d8]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#6d3403]">
                Select Size / Box Option:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.portionOptions.map((portion) => (
                  <button
                    key={portion}
                    onClick={() => setSelectedPortion(portion)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold text-left transition-all border ${
                      selectedPortion === portion
                        ? 'bg-[#ffe9e2] border-[#8a4b1a] text-[#6d3403] shadow-sm'
                        : 'bg-white border-[#ffe2d8] text-[#53443a] hover:bg-[#fff1ec]'
                    }`}
                  >
                    {portion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Cake Inscription Input if cake */}
          {product.category === 'cakes' && (
            <div className="flex flex-col gap-1.5 pt-1 border-t border-[#ffe2d8]">
              <label className="text-xs font-bold uppercase tracking-wider text-[#6d3403] flex items-center justify-between">
                <span>Free Cake Inscription:</span>
                <span className="text-[11px] font-normal text-stone-500">Optional</span>
              </label>
              <input
                type="text"
                value={cakeMessage}
                onChange={(e) => setCakeMessage(e.target.value)}
                placeholder="e.g., Happy Birthday Ayan! 🎉"
                maxLength={45}
                className="w-full px-3.5 py-2.5 bg-white border border-[#ffe2d8] rounded-xl text-xs text-[#2a170f] focus:outline-none focus:ring-2 focus:ring-[#8a4b1a]/40"
              />
            </div>
          )}

          {/* Trust Guarantees */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#ffe2d8]">
            <div className="p-2.5 rounded-xl bg-[#fff1ec] flex items-center gap-2 text-xs text-[#6d3403]">
              <Clock className="w-4 h-4 text-[#8f4e00] shrink-0" />
              <span>Baked Fresh Daily in Mirpur Kitchen</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#fff1ec] flex items-center gap-2 text-xs text-[#6d3403]">
              <ShieldCheck className="w-4 h-4 text-[#8b0129] shrink-0" />
              <span>100% Pure Butter & Desi Ghee</span>
            </div>
          </div>

          {/* Allergen advisory */}
          {product.allergens && (
            <p className="text-[11px] text-stone-500">
              <span className="font-semibold text-stone-600">Allergens:</span> {product.allergens.join(', ')}
            </p>
          )}

          {/* Footer action bar */}
          <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#ffe2d8]">
            {/* Quantity Controller */}
            <div className="flex items-center gap-2 bg-[#ffe9e2] rounded-xl p-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-lg bg-white text-[#6d3403] flex items-center justify-center shadow-xs active:scale-90 transition-transform"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-6 text-center font-bold text-sm text-[#2a170f]">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-lg bg-white text-[#6d3403] flex items-center justify-center shadow-xs active:scale-90 transition-transform"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Price & Add to Cart button */}
            <button
              onClick={handleAdd}
              className="flex-1 py-3 px-4 bg-[#6d3403] hover:bg-[#8a4b1a] text-white rounded-xl font-bold text-sm flex items-center justify-between shadow-md active:scale-98 transition-all"
            >
              <span>Add to Fresh Cart</span>
              <span>Rs. {(product.price * quantity).toLocaleString()}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
