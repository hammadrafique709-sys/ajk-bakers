import React, { useState } from 'react';
import { CATEGORIES, PRODUCTS } from '../data/bakeryData';
import { Product } from '../types';
import { Search, Star, Filter, Flame } from 'lucide-react';

interface MenuScreenProps {
  initialCategory?: string;
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
}

export const MenuScreen: React.FC<MenuScreenProps> = ({
  initialCategory = 'all',
  onAddToCart,
  onProductClick,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);

  // Filter products
  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesCategory =
      activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVeg = !vegOnly || p.isVegetarian;

    return matchesCategory && matchesSearch && matchesVeg;
  });

  return (
    <div className="flex flex-col w-full pb-24">
      {/* Header */}
      <section className="p-4 bg-[#ffe9e2] border-b border-[#ffdcc7]">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-bold text-[#8f4e00] uppercase tracking-wider">
            Sector D-1 Mirpur Kitchen
          </span>
          <h1 className="font-headline text-2xl font-bold text-[#2a170f]">
            Artisanal Aisles &amp; Menu
          </h1>
          <p className="text-xs text-[#53443a]">
            Fresh sunrise bakery items, savoury patties, bespoke cakes, and traditional sweets.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mt-3">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search chocolate cake, patties, croissant, gulab jamun..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#ffe2d8] rounded-xl text-xs text-[#2a170f] focus:outline-none focus:ring-2 focus:ring-[#8a4b1a]/40 shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400 hover:text-stone-600"
            >
              Clear
            </button>
          )}
        </div>
      </section>

      {/* Category Pills Strip */}
      <section className="px-4 py-2.5 border-b border-[#ffe2d8] bg-white sticky top-16 z-30 shadow-xs">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              activeCategory === 'all'
                ? 'bg-[#6d3403] text-white shadow-xs'
                : 'bg-[#fff1ec] text-[#53443a] hover:bg-[#ffe9e2]'
            }`}
          >
            All Items ({PRODUCTS.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeCategory === cat.id
                  ? 'bg-[#6d3403] text-white shadow-xs font-bold'
                  : 'bg-[#fff1ec] text-[#53443a] hover:bg-[#ffe9e2]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">
                {cat.icon}
              </span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Veg filter badge */}
        <div className="flex items-center justify-between pt-2 text-xs text-[#53443a]">
          <span>
            Showing <strong className="text-[#2a170f]">{filteredProducts.length}</strong> delicacies
          </span>
          <button
            onClick={() => setVegOnly(!vegOnly)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-colors ${
              vegOnly
                ? 'bg-emerald-100 text-emerald-800 font-bold'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            <Filter className="w-3 h-3" />
            <span>Vegetarian only</span>
          </button>
        </div>
      </section>

      {/* Products Grid */}
      <section className="p-4">
        {filteredProducts.length === 0 ? (
          <div className="py-12 text-center flex flex-col items-center gap-2 text-stone-500">
            <span className="material-symbols-outlined text-4xl text-stone-300">
              search_off
            </span>
            <p className="text-sm font-semibold text-[#2a170f]">
              No baked items found
            </p>
            <p className="text-xs max-w-xs">
              Try adjusting your search query or switching categories.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
                setVegOnly(false);
              }}
              className="mt-2 px-4 py-1.5 bg-[#6d3403] text-white rounded-lg text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => onProductClick(product)}
                className="p-3 bg-white rounded-2xl border border-[#ffe2d8] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow cursor-pointer"
              >
                <div>
                  <div className="relative h-40 w-full rounded-xl overflow-hidden bg-[#ffe9e2] mb-2.5">
                    <img
                      src={product.image}
                      alt={product.altText}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    {product.tag && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#8b0129] text-white text-[10px] font-bold tracking-wider uppercase shadow-xs">
                        {product.tag}
                      </span>
                    )}
                    {product.freshTime && (
                      <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur text-amber-200 text-[10px] font-semibold flex items-center gap-0.5">
                        <Flame className="w-3 h-3 text-amber-400" />
                        {product.freshTime}
                      </span>
                    )}
                    <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-white/95 backdrop-blur text-[10px] text-[#6d3403] font-bold flex items-center gap-0.5 shadow-xs">
                      <Star className="w-3 h-3 fill-[#8f4e00] text-[#8f4e00]" />
                      <span>{product.rating}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm text-[#2a170f] leading-snug">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#8f4e00] font-medium mt-0.5">
                      {product.subtitle}
                    </p>
                    <p className="text-xs text-[#53443a] line-clamp-2 mt-1 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 mt-2 border-t border-[#ffe2d8]/60">
                  <div className="flex flex-col">
                    <span className="font-headline text-base font-bold text-[#6d3403]">
                      Rs. {product.price.toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product);
                    }}
                    className="py-1.5 px-3 bg-[#6d3403] hover:bg-[#8a4b1a] text-white rounded-xl text-xs font-bold flex items-center gap-1 active:scale-95 shadow-xs"
                  >
                    <span>Add</span>
                    <span className="material-symbols-outlined text-[16px]">add</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
