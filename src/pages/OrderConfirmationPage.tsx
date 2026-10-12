import React from 'react';
import { 
  CheckCircle2, 
  Package, 
  Truck, 
  Sparkles, 
  ArrowRight, 
  Printer, 
  MapPin, 
  Calendar 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface OrderConfirmationPageProps {
  orderId: string;
  orderNumber: string;
  onNavigateHome: () => void;
  onNavigateAccount: () => void;
}

export const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({
  orderId,
  orderNumber,
  onNavigateHome,
  onNavigateAccount
}) => {
  const { orders } = useStore();
  const currentOrder = orders.find((o) => o.id === orderId || o.orderNumber === orderNumber);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
      
      {/* Success Hero Badge */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-[#EAE2D2] text-[#485E42] flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
        </div>
        <span className="text-xs font-semibold text-[#485E42] uppercase tracking-widest block">
          Order Successfully Placed
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#212E20]">
          Thank You for Your Botanical Trust
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
          We have received your order. Your custom formulations are now queued for hand-compounding in our clean apothecary lab.
        </p>

        <div className="inline-block mt-2 px-4 py-1.5 bg-[#FAF8F5] rounded-full border border-[#DACFBF] text-xs font-mono font-semibold text-[#212E20]">
          Order Reference: <strong className="text-[#485E42]">{orderNumber}</strong>
        </div>
      </div>

      {/* Live Order Timeline Progress */}
      <div className="bg-white p-6 rounded-2xl border border-[#EDE7DC] shadow-sm space-y-4">
        <div className="flex items-center justify-between text-xs pb-3 border-b border-[#F2ECE1]">
          <span className="font-semibold text-stone-800 uppercase tracking-wider">
            Preparation Status
          </span>
          <span className="text-[#485E42] font-semibold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#B39055]" />
            Formula Compounding Initiated
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          <div className="space-y-1">
            <div className="w-8 h-8 rounded-full bg-[#485E42] text-white flex items-center justify-center mx-auto text-xs font-bold">
              ✓
            </div>
            <p className="font-semibold text-stone-800">Confirmed</p>
            <p className="text-[10px] text-stone-400">Order logged</p>
          </div>

          <div className="space-y-1">
            <div className="w-8 h-8 rounded-full bg-[#EAE3D4] text-[#485E42] border-2 border-[#485E42] flex items-center justify-center mx-auto text-xs font-bold animate-pulse">
              2
            </div>
            <p className="font-semibold text-stone-800">Compounding</p>
            <p className="text-[10px] text-stone-400">Hand-blending</p>
          </div>

          <div className="space-y-1">
            <div className="w-8 h-8 rounded-full bg-[#F3ECE0] text-stone-400 flex items-center justify-center mx-auto text-xs font-bold">
              3
            </div>
            <p className="font-medium text-stone-400">Shipped</p>
            <p className="text-[10px] text-stone-400">Carbon courier</p>
          </div>

          <div className="space-y-1">
            <div className="w-8 h-8 rounded-full bg-[#F3ECE0] text-stone-400 flex items-center justify-center mx-auto text-xs font-bold">
              4
            </div>
            <p className="font-medium text-stone-400">Delivered</p>
            <p className="text-[10px] text-stone-400">To your door</p>
          </div>
        </div>
      </div>

      {/* Order Details Breakdown */}
      {currentOrder && (
        <div className="bg-white rounded-2xl border border-[#EDE7DC] p-6 space-y-6 shadow-sm">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-[#F2ECE1] text-xs">
            <div>
              <h4 className="font-semibold text-stone-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#485E42]" />
                Shipping Destination
              </h4>
              <p className="font-medium text-stone-800">{currentOrder.shippingAddress.fullName}</p>
              <p className="text-stone-600">{currentOrder.shippingAddress.street}</p>
              {currentOrder.shippingAddress.apt && <p className="text-stone-600">{currentOrder.shippingAddress.apt}</p>}
              <p className="text-stone-600">
                {currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.state} {currentOrder.shippingAddress.postalCode}
              </p>
              <p className="text-stone-600">{currentOrder.shippingAddress.country}</p>
              <p className="text-stone-500 mt-1">Tel: {currentOrder.shippingAddress.phone}</p>
            </div>

            <div>
              <h4 className="font-semibold text-stone-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#485E42]" />
                Delivery & Payment
              </h4>
              <p className="font-medium text-stone-800">{currentOrder.deliveryMethod.name}</p>
              <p className="text-stone-600">Estimated window: {currentOrder.deliveryMethod.estDays}</p>
              <p className="text-stone-600 mt-1">Payment Method: {currentOrder.paymentMethod}</p>
              <p className="text-stone-600">Confirmation Sent to: {currentOrder.customerEmail}</p>
            </div>
          </div>

          {/* Items */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-medium text-[#212E20]">
              Ordered Formulations
            </h4>

            <div className="space-y-3">
              {currentOrder.items.map((item, idx) => (
                <div key={idx} className="flex gap-4 p-3 bg-[#FAF8F5] rounded-xl border border-[#EDE7DC]">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-lg object-cover bg-[#F3ECE0] shrink-0"
                  />
                  <div className="flex-1 min-w-0 text-xs">
                    <h5 className="font-serif text-base font-semibold text-[#212E20] truncate">{item.name}</h5>
                    {item.variationName && (
                      <p className="text-stone-500">Format: {item.variationName}</p>
                    )}
                    {item.customizationSummary && (
                      <p className="text-[#655025] bg-[#F7F2E7] px-2 py-0.5 rounded text-[11px] mt-1 inline-block">
                        {item.customizationSummary}
                      </p>
                    )}
                    {item.customLabel && (
                      <p className="text-stone-700 italic mt-0.5">
                        Inscribed Label: &ldquo;{item.customLabel}&rdquo;
                      </p>
                    )}
                    <p className="text-stone-400 mt-1">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right shrink-0 text-xs font-semibold text-stone-800 tabular-nums">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="pt-4 border-t border-[#F2ECE1] space-y-1.5 text-xs text-stone-600 max-w-xs ml-auto">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-medium text-stone-800 tabular-nums">${currentOrder.subtotal.toFixed(2)}</span>
            </div>
            {currentOrder.discount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Discount ({currentOrder.couponCode || 'Promo'}):</span>
                <span className="tabular-nums font-medium">-${currentOrder.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping Fee:</span>
              <span className="font-medium text-stone-800 tabular-nums">
                {currentOrder.shippingFee === 0 ? 'Complimentary' : `$${currentOrder.shippingFee.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-sm font-serif font-bold text-[#212E20] pt-2 border-t border-[#F2ECE1]">
              <span>Order Total:</span>
              <span className="tabular-nums text-base">${currentOrder.total.toFixed(2)}</span>
            </div>
          </div>

        </div>
      )}

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <button
          onClick={onNavigateAccount}
          className="w-full sm:w-auto px-6 py-3 bg-[#485E42] hover:bg-[#3A4C35] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <Package className="w-4 h-4" />
          <span>Track Order in Account</span>
        </button>

        <button
          onClick={onNavigateHome}
          className="w-full sm:w-auto px-6 py-3 bg-[#FAF8F5] hover:bg-white text-[#212E20] border border-[#DACFBF] text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <span>Continue Discovering</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => window.print()}
          className="w-full sm:w-auto px-4 py-3 text-stone-500 hover:text-stone-800 text-xs font-medium flex items-center justify-center gap-1.5"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print Receipt</span>
        </button>
      </div>

    </div>
  );
};
