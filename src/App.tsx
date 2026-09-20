import React, { useState } from 'react';
import { CartItem, Product, TabType } from './types';
import { PRODUCTS } from './data/bakeryData';
import { BakeryBackground } from './components/BakeryBackground';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { ToastNotification } from './components/ToastNotification';
import { ItemDetailModal } from './components/ItemDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { HomeScreen } from './screens/HomeScreen';
import { CakesScreen } from './screens/CakesScreen';
import { MenuScreen } from './screens/MenuScreen';
import { OccasionsScreen } from './screens/OccasionsScreen';
import { ContactScreen } from './screens/ContactScreen';
import { playChime } from './utils/audio';

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [menuFilterCategory, setMenuFilterCategory] = useState<string>('all');

  // Initial cart with 2 items to match the "2" badge in the reference header
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'cart-1',
      product: PRODUCTS[0], // Belgian Chocolate Fudge Cake
      quantity: 1,
      customization: {
        size: '2.0 lbs (Rs. 1,850)',
        message: 'Best Wishes',
      },
    },
    {
      id: 'cart-2',
      product: PRODUCTS[1], // Golden Chicken Patties
      quantity: 1,
      customization: {
        size: 'Box of 6 (Rs. 540)',
      },
    },
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Desktop display mode and sound
  const [isWideMode, setIsWideMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Toast Notification state
  const [toast, setToast] = useState<{
    show: boolean;
    title: string;
    subtitle: string;
  }>({
    show: false,
    title: '',
    subtitle: '',
  });

  const triggerToast = (title: string, subtitle: string) => {
    setToast({ show: true, title, subtitle });
    if (soundEnabled) {
      playChime('add');
    }
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3200);
  };

  // Add product to cart
  const handleAddToCart = (
    product: Product,
    quantity = 1,
    customization?: { size?: string; message?: string }
  ) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.customization?.size === customization?.size &&
          item.customization?.message === customization?.message
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        const newItem: CartItem = {
          id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          product,
          quantity,
          customization,
        };
        return [...prevCart, newItem];
      }
    });

    triggerToast(
      `${product.name} Added`,
      `Rs. ${(product.price * quantity).toLocaleString()} • Added to Mirpur cart`
    );
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    if (soundEnabled) playChime('tap');
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    if (soundEnabled) playChime('tap');
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleNavigateTab = (tab: TabType, categoryFilter?: string) => {
    if (soundEnabled) playChime('tap');
    if (categoryFilter) {
      setMenuFilterCategory(categoryFilter);
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <BakeryBackground
      isWideMode={isWideMode}
      onToggleWideMode={() => setIsWideMode(!isWideMode)}
      soundEnabled={soundEnabled}
      onToggleSound={() => setSoundEnabled(!soundEnabled)}
    >
      {/* Mobile / Screen Shell */}
      <div className="relative flex flex-col min-h-screen bg-[#fff8f6]">
        {/* Sticky Header */}
        <Header
          cartCount={totalCartCount}
          onOpenCart={() => {
            if (soundEnabled) playChime('tap');
            setIsCartOpen(true);
          }}
          onProfileClick={() => {
            triggerToast(
              'Hammad Bakers Member',
              'Loyalty Tier: Mirpur Gold VIP • 250 Points'
            );
          }}
          onLogoClick={() => handleNavigateTab('home')}
        />

        {/* Main View Transition */}
        <main className="flex-1 w-full relative">
          {activeTab === 'home' && (
            <HomeScreen
              onNavigateTab={handleNavigateTab}
              onAddToCart={(p) => handleAddToCart(p, 1)}
              onProductClick={(p) => setSelectedProduct(p)}
              onOpenCustomCake={() => handleNavigateTab('cakes')}
            />
          )}

          {activeTab === 'cakes' && (
            <CakesScreen
              onAddToCart={handleAddToCart}
              onProductClick={(p) => setSelectedProduct(p)}
            />
          )}

          {activeTab === 'menu' && (
            <MenuScreen
              initialCategory={menuFilterCategory}
              onAddToCart={(p) => handleAddToCart(p, 1)}
              onProductClick={(p) => setSelectedProduct(p)}
            />
          )}

          {activeTab === 'occasions' && (
            <OccasionsScreen
              onCustomizeCake={() => handleNavigateTab('cakes')}
              onOrderHighTea={() => handleNavigateTab('menu', 'snacks')}
            />
          )}

          {activeTab === 'contact' && <ContactScreen />}
        </main>

        {/* Bottom Floating Navigation */}
        <BottomNav
          activeTab={activeTab}
          onSelectTab={(tab) => handleNavigateTab(tab)}
        />

        {/* Interactive Micro Toast */}
        <ToastNotification
          show={toast.show}
          title={toast.title}
          subtitle={toast.subtitle}
          onViewCart={() => {
            setToast((prev) => ({ ...prev, show: false }));
            setIsCartOpen(true);
          }}
        />

        {/* Product Detail Modal */}
        <ItemDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />

        {/* Cart Drawer & Checkout */}
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
        />
      </div>
    </BakeryBackground>
  );
}
