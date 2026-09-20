import React, { useState } from 'react';
import { CartItem } from '../types';
import { STORE_INFO } from '../data/bakeryData';
import { X, Trash2, Plus, Minus, ShoppingBag, MapPin, Bike, Check, MessageSquare, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('Sector F-1, Mirpur');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryFee = deliveryType === 'delivery' ? (subtotal > 2500 ? 0 : 150) : 0;
  const total = subtotal + deliveryFee;

  const handleCheckoutWhatsApp = () => {
    // Generate formatted WhatsApp message
    let message = `*✨ New Order from Hammad Bakers App ✨*\n\n`;
    message += `*Customer:* ${customerName || 'Mirpur Customer'}\n`;
    message += `*Phone:* ${customerPhone || 'Provided in chat'}\n`;
    message += `*Order Type:* ${deliveryType === 'delivery' ? '🛵 Citywide Delivery' : '🛍️ Quick Shop Pickup'}\n`;
    if (deliveryType === 'delivery') {
      message += `*Address:* ${deliveryAddress}\n`;
    }
    message += `\n*Items Ordered:*\n`;
    items.forEach((item, idx) => {
      message += `${idx + 1}. ${item.product.name} x${item.quantity} - Rs. ${item.product.price * item.quantity}\n`;
      if (item.customization?.size) message += `   • Size: ${item.customization.size}\n`;
      if (item.customization?.message) message += `   • Inscription: "${item.customization.message}"\n`;
    });
    message += `\n*Subtotal:* Rs. ${subtotal.toLocaleString()}\n`;
    message += `*Delivery:* ${deliveryFee === 0 ? 'FREE' : `Rs. ${deliveryFee}`}\n`;
    message += `*Total Amount:* Rs. ${total.toLocaleString()}\n`;
    if (specialInstructions) {
      message += `*Special Note:* ${specialInstructions}\n`;
    }
    message += `\n*Branch:* Hammad Bakers, Sector F-1 Mirpur AJK`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${STORE_INFO.whatsappNumber}?text=${encoded}`;
    window.open(whatsappUrl, '_blank');

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
    });
    setOrderPlaced(true);
  };

  const handleInAppOrder = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#6d3403', '#fea047', '#8b0129', '#ffc9a6'],
    });
    setOrderPlaced(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-[#fff8f6] h-full flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="h-16 px-4 border-b border-[#ffe2d8] flex items-center justify-between bg-white/60 backdrop-blur">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#ffe9e2] text-[#6d3403] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-headline text-lg font-bold text-[#2a170f] leading-tight">
                Your Fresh Cart
              </h3>
              <span className="text-xs text-[#8f4e00] font-medium">
                {items.length} {items.length === 1 ? 'item' : 'items'} from Mirpur kitchen
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#ffe9e2] hover:bg-[#ffdcc2] text-[#2a170f] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {orderPlaced ? (
          /* Order Confirmed View */
          <div className="p-6 flex-1 flex flex-col items-center justify-center text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#fea047]/20 text-[#6d3403] flex items-center justify-center animate-bounce">
              <Sparkles className="w-8 h-8 text-[#fea047]" />
            </div>
            <h4 className="font-headline text-2xl font-bold text-[#2a170f]">
              Order Sent to Oven Kitchen!
            </h4>
            <p className="text-sm text-[#53443a] max-w-xs leading-relaxed">
              Shukriya! Our master bakers at Sector D-1 Mirpur are preparing your fresh treats. You will receive live status updates.
            </p>
            <div className="w-full p-4 rounded-2xl bg-[#ffe9e2] border border-[#ffdcc2] text-left text-xs text-[#6d3403] space-y-1">
              <div className="flex justify-between font-bold text-sm text-[#2a170f]">
                <span>Order Total:</span>
                <span>Rs. {total.toLocaleString()}</span>
              </div>
              <div>Estimated Time: 30–40 mins</div>
              <div>Store: Hammad Bakers, Allama Iqbal Road, Mirpur</div>
            </div>
            <button
              onClick={() => {
                setOrderPlaced(false);
                onClearCart();
                onClose();
              }}
              className="mt-4 px-6 py-2.5 bg-[#6d3403] text-white rounded-xl text-sm font-bold shadow-md hover:bg-[#8a4b1a]"
            >
              Back to Bakery
            </button>
          </div>
        ) : items.length === 0 ? (
          /* Empty Cart */
          <div className="p-6 flex-1 flex flex-col items-center justify-center text-center gap-3">
            <div className="w-16 h-16 rounded-full bg-[#ffe9e2] text-[#8a4b1a] flex items-center justify-center">
              <ShoppingBag className="w-8 h-8 opacity-60" />
            </div>
            <h4 className="font-headline text-lg font-bold text-[#2a170f]">
              Your Cart is Empty
            </h4>
            <p className="text-xs text-[#53443a] max-w-xs">
              Explore our freshly baked cakes, golden chicken patties, croissants, and traditional sweets.
            </p>
            <button
              onClick={onClose}
              className="mt-2 px-5 py-2 bg-[#6d3403] text-white rounded-xl text-xs font-bold shadow-sm"
            >
              Explore Fresh Bakes
            </button>
          </div>
        ) : (
          /* Cart Items List & Checkout */
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 no-scrollbar">
            {/* Delivery vs Pickup Toggle */}
            <div className="grid grid-cols-2 p-1 bg-[#ffe9e2] rounded-xl text-xs font-bold">
              <button
                onClick={() => setDeliveryType('delivery')}
                className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  deliveryType === 'delivery'
                    ? 'bg-white text-[#6d3403] shadow-sm'
                    : 'text-[#53443a] hover:text-[#2a170f]'
                }`}
              >
                <Bike className="w-3.5 h-3.5" />
                <span>Express Delivery</span>
              </button>
              <button
                onClick={() => setDeliveryType('pickup')}
                className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  deliveryType === 'pickup'
                    ? 'bg-white text-[#6d3403] shadow-sm'
                    : 'text-[#53443a] hover:text-[#2a170f]'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Store Pickup (D-1)</span>
              </button>
            </div>

            {/* Items list */}
            <div className="space-y-2.5">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-white rounded-2xl border border-[#ffe2d8] shadow-xs flex items-center gap-3"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-sm text-[#2a170f] truncate">
                      {item.product.name}
                    </h5>
                    {item.customization?.size && (
                      <span className="text-[11px] text-[#8f4e00] block truncate">
                        {item.customization.size}
                      </span>
                    )}
                    {item.customization?.message && (
                      <span className="text-[11px] text-stone-500 italic block truncate">
                        "{item.customization.message}"
                      </span>
                    )}
                    <span className="font-bold text-xs text-[#6d3403] block mt-0.5">
                      Rs. {(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-1 bg-[#ffe9e2] rounded-lg p-0.5">
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="w-6 h-6 rounded bg-white text-[#6d3403] flex items-center justify-center shadow-xs"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-5 text-center text-xs font-bold text-[#2a170f]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="w-6 h-6 rounded bg-white text-[#6d3403] flex items-center justify-center shadow-xs"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Remove Item */}
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-stone-400 hover:text-red-500 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Delivery details */}
            <div className="p-3.5 bg-[#fff1ec] rounded-2xl border border-[#ffe2d8] space-y-2.5">
              <span className="text-xs font-bold text-[#6d3403] uppercase tracking-wider block">
                {deliveryType === 'delivery' ? 'Mirpur Delivery Details:' : 'Pickup Details:'}
              </span>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="px-3 py-2 bg-white border border-[#ffe2d8] rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#8a4b1a]"
                />
                <input
                  type="tel"
                  placeholder="WhatsApp Phone #"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="px-3 py-2 bg-white border border-[#ffe2d8] rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#8a4b1a]"
                />
              </div>

              {deliveryType === 'delivery' && (
                <input
                  type="text"
                  placeholder="Sector & House # (e.g., Sector D-1 / Iqbal Rd)"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#ffe2d8] rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#8a4b1a]"
                />
              )}

              <input
                type="text"
                placeholder="Special bakery request or delivery notes..."
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#ffe2d8] rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#8a4b1a]"
              />
            </div>

            {/* Bill breakdown */}
            <div className="p-3.5 bg-white rounded-2xl border border-[#ffe2d8] space-y-1.5 text-xs text-[#53443a]">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-bold text-[#2a170f]">Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Mirpur Delivery:</span>
                <span className="font-bold text-[#6d3403]">
                  {deliveryFee === 0 ? 'FREE (Store Pickup / Special)' : `Rs. ${deliveryFee}`}
                </span>
              </div>
              <div className="border-t border-[#ffe2d8] pt-1.5 flex justify-between text-sm font-bold text-[#2a170f]">
                <span>Total Amount:</span>
                <span className="text-[#6d3403]">Rs. {total.toLocaleString()}</span>
              </div>
            </div>

            {/* Order Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleCheckoutWhatsApp}
                className="w-full py-3 px-4 bg-[#8f4e00] hover:bg-[#6d3a00] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Instant Order via WhatsApp</span>
              </button>

              <button
                onClick={handleInAppOrder}
                className="w-full py-3 px-4 bg-[#6d3403] hover:bg-[#8a4b1a] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all"
              >
                <Check className="w-4 h-4" />
                <span>Confirm Order (Pay on Delivery)</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
