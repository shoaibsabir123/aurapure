import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Sparkles, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface CartDrawerProps {
  onCheckout: () => void;
  onExplore: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onCheckout, onExplore }) => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateCartQuantity, 
    subtotal, 
    shippingFee, 
    discountAmount, 
    totalAmount,
    appliedCoupon,
    applyCoupon,
    removeCoupon
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!isCartOpen) return null;

  const freeShippingThreshold = 75;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyCoupon(couponInput);
    setCouponFeedback(res);
    if (res.success) {
      setCouponInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dimmed Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] border-l border-[#E6DECة] shadow-2xl flex flex-col">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-[#EAE3D6] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-xl font-medium text-[#212E20]">Your Botanical Bag</h2>
              <span className="text-xs text-stone-500 font-medium tabular-nums">
                ({cart.reduce((a, b) => a + b.quantity, 0)} {cart.length === 1 ? 'item' : 'items'})
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="bg-[#F3EFE7] px-6 py-3 border-b border-[#EAE3D6]">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-stone-600 font-medium">
                {subtotal >= freeShippingThreshold ? (
                  <span className="text-[#32522C] font-semibold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#B39055]" />
                    Unlocked: Complimentary Worldwide Shipping
                  </span>
                ) : (
                  <span>
                    Add <strong className="text-[#212E20]">${remainingForFreeShipping.toFixed(2)}</strong> more for Free Shipping
                  </span>
                )}
              </span>
              <span className="text-[11px] text-stone-500 tabular-nums">
                {Math.round(progressToFreeShipping)}%
              </span>
            </div>
            <div className="w-full bg-[#E5DDCF] h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-[#485E42] h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#F0EBE0] flex items-center justify-center text-[#738370]">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-medium text-[#212E20]">Your bag is empty</h3>
                <p className="text-xs text-stone-500 max-w-xs leading-relaxed">
                  Discover pure wild-harvested botanicals from Morocco, Japan, Provence, and beyond.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    onExplore();
                  }}
                  className="px-6 py-2.5 bg-[#212E20] text-white text-xs font-semibold rounded-lg hover:bg-[#344633] transition-colors"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.id}
                  className="bg-white p-4 rounded-xl border border-[#EDE7DC] flex gap-3.5 shadow-sm"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.selectedVariation?.image || item.product.images[0]}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-18 h-18 rounded-lg object-cover bg-[#F3EFE8] shrink-0"
                  />

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-serif text-sm font-semibold text-[#212E20] truncate">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-stone-400 hover:text-red-600 transition-colors p-0.5"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Variation Tag */}
                    {item.selectedVariation && (
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        Format: <span className="font-medium text-stone-700">{item.selectedVariation.name}</span>
                      </p>
                    )}

                    {/* Customization Details */}
                    {item.customization && (
                      <div className="mt-1.5 p-2 bg-[#F9F7F2] rounded-lg border border-[#EDE7DC] text-[11px] space-y-0.5">
                        <div className="flex items-center gap-1 text-[#6B5324] font-medium">
                          <Sparkles className="w-3 h-3 text-[#B39055]" />
                          <span>Custom Blend</span>
                        </div>
                        <p className="text-stone-600 truncate">
                          Base: {item.customization.baseName}
                        </p>
                        {item.customization.selectedBoosterNames.length > 0 && (
                          <p className="text-stone-600 truncate">
                            Boosters: {item.customization.selectedBoosterNames.join(', ')}
                          </p>
                        )}
                        <p className="text-stone-600 truncate">
                          Scent: {item.customization.scentName}
                        </p>
                        {item.customization.customLabel && (
                          <p className="text-[#3B4D36] font-medium italic truncate">
                            Label: &ldquo;{item.customization.customLabel}&rdquo;
                          </p>
                        )}
                      </div>
                    )}

                    {/* Quantity & Price Row */}
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center border border-[#E0D8CA] rounded-lg overflow-hidden bg-white">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-stone-100 text-stone-600"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold tabular-nums text-stone-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-stone-100 text-stone-600"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-sm font-semibold text-[#212E20] tabular-nums">
                        ${item.totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer & Totals */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-[#EAE3D6] space-y-4">
              
              {/* Coupon Form */}
              <div className="space-y-1.5">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-[#F0EBE0] px-3 py-2 rounded-lg text-xs">
                    <div className="flex items-center gap-1.5 text-[#4E3E1A]">
                      <Tag className="w-3.5 h-3.5 text-[#B39055]" />
                      <span>Coupon <strong>{appliedCoupon.code}</strong> applied ({appliedCoupon.discountPercent}% off)</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-stone-500 hover:text-red-700 text-xs font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Promo code (e.g. WELCOME15)"
                      className="flex-1 border border-[#DDD5C7] rounded-lg px-3 py-1.5 text-xs text-stone-800 focus:outline-none focus:border-[#485E42] uppercase placeholder:normal-case"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-[#EFE9DF] hover:bg-[#E2DACB] text-stone-800 text-xs font-medium rounded-lg transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {couponFeedback && !appliedCoupon && (
                  <p className={`text-[11px] ${couponFeedback.success ? 'text-emerald-700' : 'text-amber-800'}`}>
                    {couponFeedback.message}
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-[#F2ECE1]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="tabular-nums font-medium text-stone-800">${subtotal.toFixed(2)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount ({appliedCoupon.code})</span>
                    <span className="tabular-nums font-medium">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Carbon-Neutral Delivery</span>
                  <span className="tabular-nums font-medium text-stone-800">
                    {shippingFee === 0 ? 'Complimentary' : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-[#212E20] pt-2 border-t border-[#F2ECE1]">
                  <span>Total</span>
                  <span className="tabular-nums text-base">${totalAmount.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onCheckout();
                }}
                className="w-full py-3.5 bg-[#212E20] hover:bg-[#344633] text-white text-xs font-semibold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-400">
                <ShieldCheck className="w-3.5 h-3.5 text-[#485E42]" />
                <span>Zero-waste packaging · 30-day pure botanical guarantee</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
