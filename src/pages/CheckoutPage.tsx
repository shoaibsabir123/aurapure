import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ArrowLeft, 
  Lock, 
  CreditCard, 
  Sparkles, 
  Truck, 
  Check, 
  Tag 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ShippingAddress, DeliveryMethod } from '../types';

interface CheckoutPageProps {
  onBackToShop: () => void;
  onOrderSuccess: (orderId: string, orderNumber: string) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onBackToShop, onOrderSuccess }) => {
  const { 
    cart, 
    subtotal, 
    discountAmount, 
    appliedCoupon, 
    applyCoupon, 
    removeCoupon,
    placeOrder, 
    currentUser, 
    showToast 
  } = useStore();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Contact & Shipping Form
  const [email, setEmail] = useState(currentUser?.email || '');
  const [fullName, setFullName] = useState(currentUser?.displayName || '');
  const [street, setStreet] = useState('');
  const [apt, setApt] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('United States');
  const [phone, setPhone] = useState('');

  // Delivery Method Selection
  const deliveryOptions: DeliveryMethod[] = [
    {
      id: 'standard',
      name: 'Standard Carbon-Neutral Delivery',
      price: subtotal >= 75 ? 0 : 8,
      estDays: '4-7 business days',
      carbonNeutral: true,
    },
    {
      id: 'express',
      name: 'Botanical Express Air Priority',
      price: 18,
      estDays: '2-3 business days',
      carbonNeutral: true,
    }
  ];
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryMethod>(deliveryOptions[0]);

  // Payment Selection
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod' | 'bank'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Promo code
  const [couponCode, setCouponCode] = useState('');

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-3xl font-medium text-[#212E20]">Your bag is currently empty</h2>
        <p className="text-xs text-stone-500">Add products to your bag before proceeding to checkout.</p>
        <button
          onClick={onBackToShop}
          className="px-6 py-2.5 bg-[#212E20] text-white text-xs font-semibold rounded-lg"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const shippingFee = selectedDelivery.price;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !fullName || !street || !city || !postalCode || !phone) {
      showToast('Please complete all required shipping fields.');
      return;
    }
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinalOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === 'card') {
      if (cardNumber.replace(/\s/g, '').length < 15 || !cardExpiry || !cardCvc) {
        showToast('Please enter valid test card details.');
        return;
      }
    }

    setIsSubmitting(true);

    const shippingAddress: ShippingAddress = {
      fullName,
      street,
      apt: apt || undefined,
      city,
      state,
      postalCode,
      country,
      phone,
    };

    const res = await placeOrder(
      shippingAddress, 
      selectedDelivery, 
      paymentMethod === 'card' ? 'Credit Card (SSL Secured)' : paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'Bank Transfer',
      email,
      fullName
    );

    setIsSubmitting(false);

    if (res.success && res.orderId && res.orderNumber) {
      onOrderSuccess(res.orderId, res.orderNumber);
    } else {
      showToast(res.error || 'Failed to place order. Please verify details.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      
      {/* Top Bar with Return link */}
      <div className="flex items-center justify-between pb-6 border-b border-[#EAE3D6] mb-8">
        <button
          onClick={onBackToShop}
          className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-[#212E20] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Continue Shopping</span>
        </button>
        <div className="flex items-center gap-2 text-xs font-medium text-stone-500">
          <Lock className="w-3.5 h-3.5 text-[#485E42]" />
          <span>256-Bit Encrypted Secure Checkout</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Checkout Steps */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Progress Indicators */}
          <div className="flex items-center justify-between text-xs font-semibold text-stone-400 border-b border-[#EDE7DC] pb-4">
            <span className={step >= 1 ? 'text-[#212E20] font-bold' : ''}>1. Shipping & Contact</span>
            <span>&rarr;</span>
            <span className={step >= 2 ? 'text-[#212E20] font-bold' : ''}>2. Delivery Method</span>
            <span>&rarr;</span>
            <span className={step >= 3 ? 'text-[#212E20] font-bold' : ''}>3. Payment</span>
          </div>

          {/* STEP 1: CONTACT & SHIPPING */}
          {step === 1 && (
            <form onSubmit={handleStep1Submit} className="space-y-5 bg-white p-6 rounded-2xl border border-[#EDE7DC] shadow-sm">
              <h3 className="font-serif text-xl font-medium text-[#212E20]">
                Contact & Delivery Destination
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">Email Address (Order Confirmation)</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full px-3.5 py-2.5 border border-[#DACFBF] rounded-lg text-xs text-[#212E20] focus:outline-none focus:border-[#485E42]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">Full Recipient Name</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Sophia Laurent"
                      className="w-full px-3.5 py-2.5 border border-[#DACFBF] rounded-lg text-xs text-[#212E20] focus:outline-none focus:border-[#485E42]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">Phone Number (Courier Tracking)</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-3.5 py-2.5 border border-[#DACFBF] rounded-lg text-xs text-[#212E20] focus:outline-none focus:border-[#485E42]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="123 Botanical Boulevard"
                    className="w-full px-3.5 py-2.5 border border-[#DACFBF] rounded-lg text-xs text-[#212E20] focus:outline-none focus:border-[#485E42]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">Apt, Suite (Opt.)</label>
                    <input
                      type="text"
                      value={apt}
                      onChange={(e) => setApt(e.target.value)}
                      placeholder="Apt 4B"
                      className="w-full px-3.5 py-2.5 border border-[#DACFBF] rounded-lg text-xs text-[#212E20]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="City"
                      className="w-full px-3.5 py-2.5 border border-[#DACFBF] rounded-lg text-xs text-[#212E20]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">Postal Code</label>
                    <input
                      type="text"
                      required
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="Postal Code"
                      className="w-full px-3.5 py-2.5 border border-[#DACFBF] rounded-lg text-xs text-[#212E20]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">State / Province</label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="State or Region"
                      className="w-full px-3.5 py-2.5 border border-[#DACFBF] rounded-lg text-xs text-[#212E20]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">Country</label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-[#DACFBF] rounded-lg text-xs text-[#212E20] bg-white"
                    >
                      <option value="United States">United States</option>
                      <option value="Pakistan">Pakistan</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="France">France</option>
                      <option value="Germany">Germany</option>
                      <option value="Japan">Japan</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="United Arab Emirates">United Arab Emirates</option>
                      <option value="Saudi Arabia">Saudi Arabia</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-3 bg-[#212E20] hover:bg-[#344633] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors"
                >
                  Continue to Delivery Method
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: DELIVERY METHOD */}
          {step === 2 && (
            <form onSubmit={handleStep2Submit} className="space-y-5 bg-white p-6 rounded-2xl border border-[#EDE7DC] shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl font-medium text-[#212E20]">
                  Select Delivery Method
                </h3>
                <button 
                  type="button" 
                  onClick={() => setStep(1)} 
                  className="text-xs text-stone-500 hover:text-stone-800"
                >
                  Edit Address
                </button>
              </div>

              <div className="space-y-3">
                {deliveryOptions.map((opt) => {
                  const isSelected = selectedDelivery.id === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedDelivery(opt)}
                      className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-[#485E42] bg-[#F6F4ED] ring-1 ring-[#485E42] shadow-sm'
                          : 'border-[#EDE7DC] bg-white hover:border-[#DACFBF]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-[#485E42] border-[#485E42] text-white' : 'border-stone-300'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-[#212E20]">{opt.name}</p>
                          <p className="text-[11px] text-stone-500 mt-0.5">{opt.estDays} · Eco-Insulated Packaging</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[#212E20] tabular-nums">
                        {opt.price === 0 ? 'Complimentary' : `$${opt.price.toFixed(2)}`}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-stone-500 hover:text-stone-800 font-medium"
                >
                  &larr; Back to Shipping
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-[#212E20] hover:bg-[#344633] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors"
                >
                  Continue to Payment
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: PAYMENT INTEGRATION */}
          {step === 3 && (
            <form onSubmit={handleFinalOrder} className="space-y-5 bg-white p-6 rounded-2xl border border-[#EDE7DC] shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl font-medium text-[#212E20]">
                  Payment Method
                </h3>
                <button 
                  type="button" 
                  onClick={() => setStep(2)} 
                  className="text-xs text-stone-500 hover:text-stone-800"
                >
                  Edit Shipping
                </button>
              </div>

              {/* Payment selector tabs */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    paymentMethod === 'card'
                      ? 'border-[#485E42] bg-[#F6F4ED] text-[#212E20] font-semibold'
                      : 'border-[#EDE7DC] bg-white text-stone-600'
                  }`}
                >
                  <CreditCard className="w-4 h-4 mx-auto mb-1 text-[#485E42]" />
                  <span className="text-xs block">Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-[#485E42] bg-[#F6F4ED] text-[#212E20] font-semibold'
                      : 'border-[#EDE7DC] bg-white text-stone-600'
                  }`}
                >
                  <Truck className="w-4 h-4 mx-auto mb-1 text-[#485E42]" />
                  <span className="text-xs block">Cash on Delivery</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('bank')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    paymentMethod === 'bank'
                      ? 'border-[#485E42] bg-[#F6F4ED] text-[#212E20] font-semibold'
                      : 'border-[#EDE7DC] bg-white text-stone-600'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 mx-auto mb-1 text-[#485E42]" />
                  <span className="text-xs block">Direct Bank Wire</span>
                </button>
              </div>

              {/* Card Inputs */}
              {paymentMethod === 'card' && (
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">Card Number</label>
                    <input
                      type="text"
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4000 1234 5678 9010"
                      className="w-full px-3.5 py-2.5 border border-[#DACFBF] rounded-lg text-xs text-[#212E20] font-mono tracking-wider"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">Expiration (MM/YY)</label>
                      <input
                        type="text"
                        maxLength={5}
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="12/28"
                        className="w-full px-3.5 py-2.5 border border-[#DACFBF] rounded-lg text-xs text-[#212E20] font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">Security Code (CVC)</label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        placeholder="•••"
                        className="w-full px-3.5 py-2.5 border border-[#DACFBF] rounded-lg text-xs text-[#212E20] font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="p-4 bg-[#F5EFE4] rounded-xl border border-[#DECDB7] text-xs text-stone-700 space-y-1">
                  <p className="font-semibold text-[#544321]">Cash on Delivery Terms:</p>
                  <p>You will pay <strong>${finalTotal.toFixed(2)}</strong> upon receipt of your parcel by our carbon-neutral courier. Please ensure exact cash is ready upon arrival.</p>
                </div>
              )}

              {paymentMethod === 'bank' && (
                <div className="p-4 bg-[#F5EFE4] rounded-xl border border-[#DECDB7] text-xs text-stone-700 space-y-1">
                  <p className="font-semibold text-[#544321]">Wire Instructions:</p>
                  <p>Account wire coordinates will be generated alongside your unique order tracking reference upon placement.</p>
                </div>
              )}

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-xs text-stone-500 hover:text-stone-800 font-medium"
                >
                  &larr; Back to Delivery
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3.5 bg-[#212E20] hover:bg-[#344633] text-white text-xs font-semibold uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center gap-2"
                >
                  <Lock className="w-3.5 h-3.5 text-[#C4A962]" />
                  <span>{isSubmitting ? 'Securing Order...' : `Place Order · $${finalTotal.toFixed(2)}`}</span>
                </button>
              </div>
            </form>
          )}

        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-[#EDE7DC] shadow-sm space-y-5 lg:sticky lg:top-28">
          <h3 className="font-serif text-lg font-medium text-[#212E20] pb-3 border-b border-[#EDE7DC]">
            Order Summary ({cart.reduce((a, b) => a + b.quantity, 0)} Items)
          </h3>

          {/* Items */}
          <div className="max-h-72 overflow-y-auto space-y-3 pr-1">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-3 text-xs">
                <img
                  src={item.selectedVariation?.image || item.product.images[0]}
                  alt={item.product.name}
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 rounded-lg object-cover bg-[#F3ECE0] shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif font-semibold text-[#212E20] truncate">{item.product.name}</h4>
                  {item.selectedVariation && (
                    <p className="text-[11px] text-stone-500">{item.selectedVariation.name}</p>
                  )}
                  {item.customization && (
                    <p className="text-[10px] text-[#695225] bg-[#F7F2E7] px-1.5 py-0.5 rounded mt-0.5 inline-block">
                      Custom Blend {item.customization.customLabel ? `("${item.customization.customLabel}")` : ''}
                    </p>
                  )}
                  <p className="text-stone-400 mt-0.5">Qty: {item.quantity}</p>
                </div>
                <span className="font-semibold text-stone-800 tabular-nums shrink-0">
                  ${item.totalPrice.toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Promo code field */}
          <div className="pt-3 border-t border-[#EDE7DC]">
            {appliedCoupon ? (
              <div className="flex items-center justify-between text-xs bg-[#F4EFE7] p-2.5 rounded-lg">
                <div className="flex items-center gap-1.5 text-[#544321]">
                  <Tag className="w-3.5 h-3.5 text-[#B39055]" />
                  <span>Coupon <strong>{appliedCoupon.code}</strong> (-{appliedCoupon.discountPercent}%)</span>
                </div>
                <button
                  type="button"
                  onClick={removeCoupon}
                  className="text-stone-500 hover:text-red-700 text-[11px] font-semibold"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Discount code (e.g. WELCOME15)"
                  className="flex-1 px-3 py-1.5 border border-[#DACFBF] rounded-lg text-xs text-stone-800 uppercase"
                />
                <button
                  type="button"
                  onClick={() => {
                    const res = applyCoupon(couponCode);
                    showToast(res.message);
                    if (res.success) setCouponCode('');
                  }}
                  className="px-3 py-1.5 bg-[#EFE9DF] hover:bg-[#E0D7C7] text-stone-800 text-xs font-semibold rounded-lg"
                >
                  Apply
                </button>
              </div>
            )}
          </div>

          {/* Pricing Totals */}
          <div className="pt-3 border-t border-[#EDE7DC] space-y-2 text-xs text-stone-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-stone-800 tabular-nums">${subtotal.toFixed(2)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Discount</span>
                <span className="tabular-nums font-semibold">-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Delivery</span>
              <span className="font-semibold text-stone-800 tabular-nums">
                {shippingFee === 0 ? 'Complimentary' : `$${shippingFee.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-base font-serif font-bold text-[#212E20] pt-2 border-t border-[#EDE7DC]">
              <span>Final Total</span>
              <span className="tabular-nums text-lg">${finalTotal.toFixed(2)}</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
