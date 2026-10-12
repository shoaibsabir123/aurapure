import React, { useState } from 'react';
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  ShieldCheck, 
  LogOut, 
  Truck, 
  Sparkles, 
  ExternalLink,
  ChevronRight,
  Plus
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Order, Product } from '../types';

interface AccountPageProps {
  onSelectProduct: (product: Product) => void;
  onNavigateShop: () => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({ onSelectProduct, onNavigateShop }) => {
  const { 
    currentUser, 
    signInWithGoogle, 
    simulateCustomerLogin, 
    signOut, 
    isAdmin, 
    simulateAdminToggle,
    orders, 
    wishlist, 
    products, 
    addToCart, 
    showToast 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'addresses'>('orders');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [manualLookup, setManualLookup] = useState('');

  // Login simulation fields for quick evaluation without Google account requirement
  const [simName, setSimName] = useState('Elena Vance');
  const [simEmail, setSimEmail] = useState('elena.vance@example.com');

  const customerOrders = orders; // Includes both logged in and guest orders
  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualLookup) return;
    const found = orders.find(
      (o) => o.orderNumber.toLowerCase() === manualLookup.trim().toLowerCase()
    );
    if (found) {
      setSelectedOrder(found);
      showToast(`Found Order ${found.orderNumber}`);
    } else {
      showToast(`No order found matching "${manualLookup}". Please check the reference.`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      
      {/* Account Hero Banner */}
      <div className="bg-[#FAF8F5] p-6 sm:p-8 rounded-2xl border border-[#EDE7DC] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#EAE2D2] flex items-center justify-center text-[#485E42] text-xl font-bold font-serif shrink-0">
            {currentUser?.displayName?.[0] || simName?.[0] || 'A'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl font-medium text-[#212E20]">
                {currentUser?.displayName || (simEmail ? simName : 'Guest Customer')}
              </h1>
              {isAdmin && (
                <span className="text-[10px] bg-[#E8EFE5] text-[#2F442A] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                  Store Admin
                </span>
              )}
            </div>
            <p className="text-xs text-stone-500">
              {currentUser?.email || (simEmail ? simEmail : 'Sign in to sync your bespoke formulations')}
            </p>
          </div>
        </div>

        {/* Auth Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          {!currentUser ? (
            <>
              <button
                onClick={signInWithGoogle}
                className="px-4 py-2 bg-white border border-[#DACFBF] rounded-lg text-xs font-semibold text-stone-800 hover:bg-stone-50 transition-colors shadow-sm flex items-center gap-2"
              >
                <span>Sign In with Google</span>
              </button>
              <button
                onClick={() => simulateCustomerLogin(simEmail, simName)}
                className="px-4 py-2 bg-[#212E20] text-white rounded-lg text-xs font-semibold hover:bg-[#344633] transition-colors"
              >
                1-Click Customer Sign-In
              </button>
            </>
          ) : (
            <button
              onClick={signOut}
              className="px-4 py-2 bg-white border border-[#DACFBF] rounded-lg text-xs font-medium text-stone-700 hover:text-red-700 hover:bg-red-50 transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          )}

          <button
            onClick={simulateAdminToggle}
            className="px-3.5 py-2 bg-[#F0EBE0] text-[#55421B] rounded-lg text-xs font-semibold hover:bg-[#E5DECة] transition-colors flex items-center gap-1.5"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{isAdmin ? 'Switch to Customer View' : 'Toggle Admin Mode'}</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-[#EAE3D6] gap-8">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 text-sm font-semibold transition-colors flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'text-[#212E20] border-b-2 border-[#485E42]'
              : 'text-stone-400 hover:text-stone-700'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Orders & Tracking ({customerOrders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('wishlist')}
          className={`pb-3 text-sm font-semibold transition-colors flex items-center gap-2 ${
            activeTab === 'wishlist'
              ? 'text-[#212E20] border-b-2 border-[#485E42]'
              : 'text-stone-400 hover:text-stone-700'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Saved Wishlist ({wishlistedProducts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('addresses')}
          className={`pb-3 text-sm font-semibold transition-colors flex items-center gap-2 ${
            activeTab === 'addresses'
              ? 'text-[#212E20] border-b-2 border-[#485E42]'
              : 'text-stone-400 hover:text-stone-700'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Saved Addresses</span>
        </button>
      </div>

      {/* TAB 1: ORDERS & TRACKING */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          
          {/* Order Quick Tracking Search */}
          <form onSubmit={handleLookup} className="flex gap-2 max-w-md">
            <input
              type="text"
              value={manualLookup}
              onChange={(e) => setManualLookup(e.target.value)}
              placeholder="Track by Order # (e.g. AP-2026-104928)..."
              className="flex-1 px-3.5 py-2 bg-white border border-[#DACFBF] rounded-lg text-xs font-mono text-[#212E20]"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#485E42] text-white text-xs font-semibold rounded-lg hover:bg-[#394B34]"
            >
              Track Order
            </button>
          </form>

          {customerOrders.length === 0 ? (
            <div className="p-12 text-center bg-[#FAF8F5] rounded-2xl border border-[#EDE7DC] space-y-3">
              <Package className="w-10 h-10 text-stone-400 mx-auto" />
              <h3 className="font-serif text-xl font-medium text-stone-800">No orders logged yet</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Explore our botanical catalog to place your first bespoke skincare formulation.
              </p>
              <button
                onClick={onNavigateShop}
                className="px-6 py-2.5 bg-[#212E20] text-white text-xs font-semibold rounded-lg"
              >
                Discover Collections
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {customerOrders.map((order) => {
                const statusColors = {
                  pending: 'bg-stone-100 text-stone-700',
                  confirmed: 'bg-blue-50 text-blue-800 border-blue-200',
                  processing: 'bg-amber-50 text-amber-800 border-amber-200',
                  shipped: 'bg-purple-50 text-purple-800 border-purple-200',
                  delivered: 'bg-emerald-50 text-emerald-800 border-emerald-200',
                  cancelled: 'bg-red-50 text-red-800 border-red-200',
                };

                return (
                  <div
                    key={order.id}
                    className="bg-white rounded-2xl border border-[#EDE7DC] p-5 sm:p-6 shadow-sm space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#F2ECE1] gap-2">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-sm font-bold text-[#212E20]">
                            {order.orderNumber}
                          </span>
                          <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider border ${statusColors[order.status] || 'bg-stone-100'}`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-xs text-stone-400 mt-0.5">
                          Placed on {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-[#212E20] tabular-nums">
                          ${order.total.toFixed(2)}
                        </span>
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="px-3 py-1.5 bg-[#FAF8F5] hover:bg-[#F2ECE1] border border-[#DACFBF] rounded-lg text-xs font-medium text-stone-700 flex items-center gap-1"
                        >
                          <span>Inspect Details</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Tracking Number Banner */}
                    {order.trackingNumber && (
                      <div className="p-3 bg-[#F4EFE6] rounded-xl flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 text-stone-700">
                          <Truck className="w-4 h-4 text-[#485E42]" />
                          <span>Tracking Reference: <strong className="font-mono">{order.trackingNumber}</strong></span>
                        </div>
                        <span className="text-[11px] text-[#485E42] font-semibold">Active Transit</span>
                      </div>
                    )}

                    {/* Thumbnails list */}
                    <div className="flex gap-3 overflow-x-auto py-1">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 bg-[#FAF8F5] p-2 rounded-lg border border-[#EDE7DC] shrink-0 text-xs">
                          <img
                            src={item.image}
                            alt={item.name}
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 rounded object-cover"
                          />
                          <div className="max-w-[140px]">
                            <p className="font-serif font-medium text-stone-800 truncate">{item.name}</p>
                            <p className="text-[10px] text-stone-400">Qty: {item.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>
      )}

      {/* TAB 2: WISHLIST */}
      {activeTab === 'wishlist' && (
        <div>
          {wishlistedProducts.length === 0 ? (
            <div className="p-12 text-center bg-[#FAF8F5] rounded-2xl border border-[#EDE7DC] space-y-3">
              <Heart className="w-10 h-10 text-stone-400 mx-auto" />
              <h3 className="font-serif text-xl font-medium text-stone-800">Your wishlist is empty</h3>
              <p className="text-xs text-stone-500">Save botanicals as you browse to revisit them later.</p>
              <button
                onClick={onNavigateShop}
                className="px-6 py-2 bg-[#212E20] text-white text-xs font-semibold rounded-lg"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistedProducts.map((p) => (
                <div key={p.id} className="bg-white p-4 rounded-xl border border-[#EDE7DC] space-y-3 flex flex-col justify-between">
                  <div className="flex gap-3">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className="w-20 h-20 rounded-lg object-cover bg-[#F3ECE0]"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] text-stone-500 uppercase">{p.originCountry}</span>
                      <h4 className="font-serif text-base font-semibold text-[#212E20] truncate">{p.name}</h4>
                      <p className="text-xs font-bold text-[#212E20] mt-1 tabular-nums">${p.salePrice ?? p.price}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onSelectProduct(p)}
                      className="flex-1 py-2 bg-[#FAF8F5] border border-[#DACFBF] text-xs font-semibold rounded-lg hover:bg-[#F2ECE1]"
                    >
                      View Formula
                    </button>
                    <button
                      onClick={() => addToCart(p)}
                      className="px-4 py-2 bg-[#212E20] text-white text-xs font-semibold rounded-lg hover:bg-[#344633]"
                    >
                      Add to Bag
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: SAVED ADDRESSES */}
      {activeTab === 'addresses' && (
        <div className="space-y-4">
          <div className="p-6 bg-white rounded-2xl border border-[#EDE7DC] space-y-2 max-w-md shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#485E42]">Default Delivery Address</span>
              <span className="text-[10px] bg-stone-100 px-2 py-0.5 rounded font-mono">Primary</span>
            </div>
            <h4 className="font-serif text-lg font-semibold text-[#212E20]">
              {currentUser?.displayName || simName}
            </h4>
            <p className="text-xs text-stone-600">123 Botanical Boulevard, Suite 4B</p>
            <p className="text-xs text-stone-600">San Francisco, CA 94105, United States</p>
            <p className="text-xs text-stone-400 mt-2">Tel: +1 (555) 234-8901</p>
          </div>
        </div>
      )}

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm p-4 sm:p-6 flex items-center justify-center">
          <div className="bg-[#FAF8F5] rounded-2xl max-w-2xl w-full border border-[#E8DFD0] shadow-2xl p-6 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#EDE7DC]">
              <div>
                <span className="font-mono text-sm font-bold text-[#212E20]">
                  {selectedOrder.orderNumber}
                </span>
                <p className="text-xs text-stone-500">Status: <strong>{selectedOrder.status}</strong></p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-stone-400 hover:text-stone-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {selectedOrder.items.map((item, idx) => (
                <div key={idx} className="p-3 bg-white rounded-xl border border-[#EDE7DC] flex gap-3 text-xs">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-serif font-semibold text-[#212E20] truncate">{item.name}</p>
                    {item.customizationSummary && (
                      <p className="text-[#67542E] text-[10px] mt-0.5">{item.customizationSummary}</p>
                    )}
                    {item.customLabel && (
                      <p className="text-stone-600 italic text-[11px]">&ldquo;{item.customLabel}&rdquo;</p>
                    )}
                    <p className="text-stone-400">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-semibold text-stone-800 tabular-nums">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-4 bg-white rounded-xl border border-[#EDE7DC] text-xs space-y-1.5">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal:</span>
                <span className="font-medium text-stone-800">${selectedOrder.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Shipping:</span>
                <span className="font-medium text-stone-800">${selectedOrder.shippingFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#212E20] pt-2 border-t border-[#F2ECE1]">
                <span>Total:</span>
                <span>${selectedOrder.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="text-right">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-5 py-2 bg-[#212E20] text-white text-xs font-semibold rounded-lg"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
