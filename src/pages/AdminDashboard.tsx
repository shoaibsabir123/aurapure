import React, { useState } from 'react';
import { 
  Package, 
  ShoppingBag, 
  DollarSign, 
  Users, 
  AlertTriangle, 
  Plus, 
  Edit3, 
  Trash2, 
  Sparkles, 
  Check, 
  Truck, 
  Tag, 
  BookOpen, 
  Star, 
  X,
  Search,
  Sliders,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product, Order, OrderStatus, Coupon, BlogPost } from '../types';

export const AdminDashboard: React.FC = () => {
  const { 
    products, 
    orders, 
    updateOrderStatus, 
    addProduct, 
    updateProduct, 
    deleteProduct,
    coupons, 
    addCoupon, 
    toggleCoupon,
    blogPosts, 
    addBlogPost, 
    deleteBlogPost,
    reviews,
    showToast 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'coupons' | 'blog' | 'reviews'>('overview');
  
  // Order search/filter
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [editingTrackingOrderId, setEditingTrackingOrderId] = useState<string | null>(null);
  const [newTrackingNumber, setNewTrackingNumber] = useState('');

  // Product Add / Edit Modal state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  
  // Product form fields
  const [formName, setFormName] = useState('');
  const [formSubtitle, setFormSubtitle] = useState('');
  const [formCategory, setFormCategory] = useState<'Skincare' | 'Wellness & Fragrance' | 'Home & Living' | 'Body & Bath' | 'Handcrafted Crafts'>('Skincare');
  const [formPrice, setFormPrice] = useState(50);
  const [formSalePrice, setFormSalePrice] = useState<number | undefined>(undefined);
  const [formOriginCountry, setFormOriginCountry] = useState('Morocco');
  const [formOriginRegion, setFormOriginRegion] = useState('Souss Valley');
  const [formDescription, setFormDescription] = useState('');
  const [formStory, setFormStory] = useState('');
  const [formStock, setFormStock] = useState(50);
  const [formIsCustomizable, setFormIsCustomizable] = useState(false);
  const [formFeatured, setFormFeatured] = useState(false);
  const [formBestseller, setFormBestseller] = useState(false);
  const [formImage, setFormImage] = useState('https://images.unsplash.com/photo-1608248597359-0524458f4a13?auto=format&fit=crop&w=900&q=80');

  // Coupon modal
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState(15);
  const [newCouponMinOrder, setNewCouponMinOrder] = useState(50);

  // Blog modal
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogCategory, setBlogCategory] = useState<'Ingredients' | 'Global Sourcing' | 'Rituals' | 'Sustainability'>('Rituals');
  const [blogExcerpt, setBlogExcerpt] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('Aura Pure Herbalist');
  const [blogImage, setBlogImage] = useState('https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80');

  // Summary Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const lowStockProducts = products.filter((p) => p.stock <= 15);
  const uniqueCustomerEmails = Array.from(new Set(orders.map((o) => o.customerEmail))).length;

  const openAddProductModal = () => {
    setEditingProduct(null);
    setFormName('');
    setFormSubtitle('');
    setFormCategory('Skincare');
    setFormPrice(50);
    setFormSalePrice(undefined);
    setFormOriginCountry('Morocco');
    setFormOriginRegion('Atlas');
    setFormDescription('');
    setFormStory('');
    setFormStock(50);
    setFormIsCustomizable(false);
    setFormFeatured(false);
    setFormBestseller(false);
    setFormImage('https://images.unsplash.com/photo-1608248597359-0524458f4a13?auto=format&fit=crop&w=900&q=80');
    setIsProductModalOpen(true);
  };

  const openEditProductModal = (prod: Product) => {
    setEditingProduct(prod);
    setFormName(prod.name);
    setFormSubtitle(prod.subtitle);
    setFormCategory(prod.category);
    setFormPrice(prod.price);
    setFormSalePrice(prod.salePrice);
    setFormOriginCountry(prod.originCountry);
    setFormOriginRegion(prod.originRegion);
    setFormDescription(prod.description);
    setFormStory(prod.story);
    setFormStock(prod.stock);
    setFormIsCustomizable(prod.isCustomizable);
    setFormFeatured(!!prod.featured);
    setFormBestseller(!!prod.bestseller);
    setFormImage(prod.images[0] || '');
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      await updateProduct(editingProduct.id, {
        name: formName,
        subtitle: formSubtitle,
        category: formCategory,
        price: Number(formPrice),
        salePrice: formSalePrice ? Number(formSalePrice) : undefined,
        originCountry: formOriginCountry,
        originRegion: formOriginRegion,
        description: formDescription,
        story: formStory,
        stock: Number(formStock),
        isCustomizable: formIsCustomizable,
        featured: formFeatured,
        bestseller: formBestseller,
        images: [formImage, ...editingProduct.images.slice(1)],
      });
    } else {
      await addProduct({
        name: formName,
        subtitle: formSubtitle,
        category: formCategory,
        price: Number(formPrice),
        salePrice: formSalePrice ? Number(formSalePrice) : undefined,
        rating: 5.0,
        reviewsCount: 1,
        originCountry: formOriginCountry,
        originCountryCode: 'GLOBAL',
        originRegion: formOriginRegion,
        description: formDescription,
        story: formStory,
        ingredients: ['Natural Botanical Cold-Pressed Extract'],
        isCustomizable: formIsCustomizable,
        variations: [
          {
            id: `var-${Date.now()}`,
            name: 'Standard Apothecary Format',
            type: 'size',
            value: 'Standard',
            priceOffset: 0,
            stock: Number(formStock),
            image: formImage
          }
        ],
        images: [formImage],
        stock: Number(formStock),
        featured: formFeatured,
        bestseller: formBestseller,
        tags: ['Botanical', 'Aura Pure', formCategory],
      });
    }
    setIsProductModalOpen(false);
  };

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode) return;
    await addCoupon({
      id: `coupon-${Date.now()}`,
      code: newCouponCode.trim().toUpperCase(),
      discountPercent: Number(newCouponDiscount),
      minOrder: Number(newCouponMinOrder),
      isActive: true,
    });
    setNewCouponCode('');
  };

  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle || !blogContent) return;
    const slug = blogTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    await addBlogPost({
      title: blogTitle,
      slug,
      category: blogCategory,
      excerpt: blogExcerpt,
      content: blogContent,
      author: blogAuthor,
      authorRole: 'Botanical Researcher',
      readTime: '4 min read',
      coverImage: blogImage,
      tags: ['Aura Pure', blogCategory],
    });
    setIsBlogModalOpen(false);
    setBlogTitle('');
    setBlogContent('');
    setBlogExcerpt('');
  };

  const filteredOrders = orders.filter((o) => {
    if (orderStatusFilter !== 'all' && o.status !== orderStatusFilter) return false;
    if (orderSearch.trim()) {
      const q = orderSearch.toLowerCase();
      return (
        o.orderNumber.toLowerCase().includes(q) ||
        o.customerEmail.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      
      {/* Admin Top Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#EAE3D6] gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#485E42] bg-[#E8EFE5] px-2.5 py-0.5 rounded">
              Store Master Admin
            </span>
            <span className="text-xs text-stone-400">Live Production Database</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#212E20] mt-1">
            Aura Pure Management Console
          </h1>
        </div>

        {/* Global Action */}
        <div className="flex items-center gap-3">
          <button
            onClick={openAddProductModal}
            className="px-4 py-2.5 bg-[#212E20] hover:bg-[#344633] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#EAE3D6] overflow-x-auto gap-6 sm:gap-8">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 text-sm font-semibold transition-colors shrink-0 ${
            activeTab === 'overview' ? 'text-[#212E20] border-b-2 border-[#485E42]' : 'text-stone-400 hover:text-stone-700'
          }`}
        >
          Executive Overview
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 text-sm font-semibold transition-colors shrink-0 flex items-center gap-1.5 ${
            activeTab === 'orders' ? 'text-[#212E20] border-b-2 border-[#485E42]' : 'text-stone-400 hover:text-stone-700'
          }`}
        >
          <span>Orders</span>
          <span className="text-xs bg-[#EAE3D4] text-[#2F442A] px-1.5 py-0.5 rounded font-mono">
            {orders.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`pb-3 text-sm font-semibold transition-colors shrink-0 flex items-center gap-1.5 ${
            activeTab === 'products' ? 'text-[#212E20] border-b-2 border-[#485E42]' : 'text-stone-400 hover:text-stone-700'
          }`}
        >
          <span>Catalog Products</span>
          <span className="text-xs bg-[#EAE3D4] text-[#2F442A] px-1.5 py-0.5 rounded font-mono">
            {products.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('coupons')}
          className={`pb-3 text-sm font-semibold transition-colors shrink-0 ${
            activeTab === 'coupons' ? 'text-[#212E20] border-b-2 border-[#485E42]' : 'text-stone-400 hover:text-stone-700'
          }`}
        >
          Promotions & Coupons
        </button>
        <button
          onClick={() => setActiveTab('blog')}
          className={`pb-3 text-sm font-semibold transition-colors shrink-0 ${
            activeTab === 'blog' ? 'text-[#212E20] border-b-2 border-[#485E42]' : 'text-stone-400 hover:text-stone-700'
          }`}
        >
          Journal Management
        </button>
      </div>

      {/* TAB 1: OVERVIEW METRICS */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-6 bg-white rounded-2xl border border-[#EDE7DC] space-y-2 shadow-sm">
              <div className="flex items-center justify-between text-stone-500">
                <span className="text-xs font-semibold uppercase tracking-wider">Gross Sales</span>
                <DollarSign className="w-5 h-5 text-[#485E42]" />
              </div>
              <p className="font-serif text-3xl font-bold text-[#212E20] tabular-nums">
                ${totalRevenue.toFixed(2)}
              </p>
              <p className="text-[11px] text-emerald-700 font-medium">100% processed without dispute</p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-[#EDE7DC] space-y-2 shadow-sm">
              <div className="flex items-center justify-between text-stone-500">
                <span className="text-xs font-semibold uppercase tracking-wider">Total Orders</span>
                <ShoppingBag className="w-5 h-5 text-[#485E42]" />
              </div>
              <p className="font-serif text-3xl font-bold text-[#212E20] tabular-nums">
                {orders.length}
              </p>
              <p className="text-[11px] text-stone-500">{orders.filter(o => o.status === 'confirmed').length} awaiting fulfillment</p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-[#EDE7DC] space-y-2 shadow-sm">
              <div className="flex items-center justify-between text-stone-500">
                <span className="text-xs font-semibold uppercase tracking-wider">Active Customers</span>
                <Users className="w-5 h-5 text-[#485E42]" />
              </div>
              <p className="font-serif text-3xl font-bold text-[#212E20] tabular-nums">
                {uniqueCustomerEmails}
              </p>
              <p className="text-[11px] text-stone-500">Verified international buyers</p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-[#EDE7DC] space-y-2 shadow-sm">
              <div className="flex items-center justify-between text-stone-500">
                <span className="text-xs font-semibold uppercase tracking-wider">Inventory Alerts</span>
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              <p className="font-serif text-3xl font-bold text-[#212E20] tabular-nums">
                {lowStockProducts.length}
              </p>
              <p className="text-[11px] text-amber-700 font-medium">Formulations &le; 15 units</p>
            </div>
          </div>

          {/* Low Stock Warning List */}
          {lowStockProducts.length > 0 && (
            <div className="p-5 bg-amber-50/70 rounded-2xl border border-amber-200/80 space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-semibold text-xs">
                <AlertTriangle className="w-4 h-4 text-amber-700" />
                <span>Low Inventory Alert: Order raw botanical shipments</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {lowStockProducts.map((p) => (
                  <div key={p.id} className="bg-white p-3 rounded-xl border border-amber-200 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-stone-800 truncate max-w-[180px]">{p.name}</p>
                      <p className="text-stone-400">{p.originCountry}</p>
                    </div>
                    <span className="text-amber-800 font-bold tabular-nums bg-amber-50 px-2 py-0.5 rounded">
                      {p.stock} units
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Orders Overview */}
          <div className="bg-white rounded-2xl border border-[#EDE7DC] p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-medium text-[#212E20]">
                Recent Orders Stream
              </h3>
              <button
                onClick={() => setActiveTab('orders')}
                className="text-xs font-semibold text-[#485E42] hover:text-[#212E20]"
              >
                Inspect All Orders &rarr;
              </button>
            </div>

            <div className="divide-y divide-[#F2ECE1]">
              {orders.slice(0, 5).map((order) => (
                <div key={order.id} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-mono font-bold text-[#212E20]">{order.orderNumber}</span>
                    <span className="text-stone-400 ml-2">by {order.customerName}</span>
                    <p className="text-stone-400 text-[11px]">{new Date(order.createdAt).toLocaleDateString()} · {order.items.length} items</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-stone-800 tabular-nums">${order.total.toFixed(2)}</span>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-stone-100">
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: ORDERS MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          
          {/* Controls: Search and Status filter */}
          <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#EDE7DC] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                placeholder="Search by order #, email, customer..."
                className="w-full pl-8 pr-3 py-1.5 bg-white border border-[#DACFBF] rounded-lg text-xs"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs text-stone-500">Status:</span>
              <select
                value={orderStatusFilter}
                onChange={(e) => setOrderStatusFilter(e.target.value)}
                className="bg-white border border-[#DACFBF] rounded-lg px-3 py-1.5 text-xs text-stone-700"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="processing">Processing (Compounding)</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-2xl border border-[#EDE7DC] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-600">
                <thead className="bg-[#FAF8F5] border-b border-[#EDE7DC] text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Order #</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Formulations & Customizations</th>
                    <th className="py-3 px-4">Total</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Tracking</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F2ECE1]">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-stone-400">
                        No orders match current criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-stone-50/60 transition-colors">
                        <td className="py-4 px-4 font-mono font-bold text-[#212E20]">
                          {order.orderNumber}
                        </td>
                        <td className="py-4 px-4">
                          <p className="font-semibold text-stone-800">{order.customerName}</p>
                          <p className="text-[11px] text-stone-400">{order.customerEmail}</p>
                          <p className="text-[10px] text-stone-400">{order.shippingAddress.country}</p>
                        </td>
                        <td className="py-4 px-4 max-w-xs">
                          {order.items.map((it, idx) => (
                            <div key={idx} className="mb-1 last:mb-0">
                              <p className="font-medium text-stone-800 truncate">
                                {it.quantity}x {it.name}
                              </p>
                              {it.customizationSummary && (
                                <p className="text-[10px] text-[#695325] bg-[#FAF6EC] px-1 rounded inline-block truncate max-w-xs">
                                  {it.customizationSummary}
                                </p>
                              )}
                              {it.customLabel && (
                                <p className="text-[10px] text-stone-500 italic">Label: &ldquo;{it.customLabel}&rdquo;</p>
                              )}
                            </div>
                          ))}
                        </td>
                        <td className="py-4 px-4 font-semibold text-stone-800 tabular-nums">
                          ${order.total.toFixed(2)}
                        </td>
                        <td className="py-4 px-4">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                            className="bg-white border border-[#DACFBF] rounded-lg px-2 py-1 text-xs font-semibold text-stone-700"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="py-4 px-4">
                          {editingTrackingOrderId === order.id ? (
                            <div className="flex items-center gap-1">
                              <input
                                type="text"
                                value={newTrackingNumber}
                                onChange={(e) => setNewTrackingNumber(e.target.value)}
                                placeholder="Tracking #"
                                className="w-28 px-1.5 py-1 text-[11px] border border-[#DACFBF] rounded"
                              />
                              <button
                                onClick={() => {
                                  updateOrderStatus(order.id, order.status, newTrackingNumber);
                                  setEditingTrackingOrderId(null);
                                }}
                                className="px-2 py-1 bg-[#485E42] text-white rounded text-[10px]"
                              >
                                Save
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5">
                              <span className="font-mono text-[11px] text-stone-600">
                                {order.trackingNumber || 'Unassigned'}
                              </span>
                              <button
                                onClick={() => {
                                  setEditingTrackingOrderId(order.id);
                                  setNewTrackingNumber(order.trackingNumber || '');
                                }}
                                className="text-[#485E42] hover:text-[#212E20] text-[10px] font-semibold underline"
                              >
                                Edit
                              </button>
                            </div>
                          )}
                        </td>
                        <td className="py-4 px-4 text-right">
                          <button
                            onClick={() => updateOrderStatus(order.id, 'delivered')}
                            className="text-xs text-emerald-800 hover:text-emerald-950 font-semibold"
                          >
                            Mark Delivered
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: CATALOG PRODUCTS MANAGEMENT */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-medium text-[#212E20]">
              Active Formulations & Inventory ({products.length})
            </h3>
            <button
              onClick={openAddProductModal}
              className="px-4 py-2 bg-[#212E20] hover:bg-[#344633] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Product</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl border border-[#EDE7DC] p-5 shadow-sm space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex gap-3">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-xl object-cover bg-[#F3ECE0]"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] text-[#485E42] font-semibold uppercase">{p.originCountry}</span>
                      <h4 className="font-serif text-base font-semibold text-[#212E20] truncate">{p.name}</h4>
                      <p className="text-xs text-stone-500 font-semibold mt-0.5 tabular-nums">
                        ${p.price} {p.salePrice && <span className="line-through text-stone-400">${p.salePrice}</span>}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-[#F2ECE1] text-xs space-y-1 text-stone-600">
                    <p className="flex justify-between">
                      <span>Stock On-Hand:</span>
                      <strong className={`tabular-nums ${p.stock <= 15 ? 'text-amber-800' : 'text-stone-800'}`}>{p.stock} units</strong>
                    </p>
                    <p className="flex justify-between">
                      <span>Customizable:</span>
                      <span className={p.isCustomizable ? 'text-emerald-700 font-bold' : 'text-stone-400'}>
                        {p.isCustomizable ? 'Yes' : 'No'}
                      </span>
                    </p>
                    <p className="flex justify-between">
                      <span>Variations:</span>
                      <span>{p.variations.length} formats</span>
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#F2ECE1] flex items-center justify-between">
                  <button
                    onClick={() => openEditProductModal(p)}
                    className="px-3 py-1.5 bg-[#FAF8F5] border border-[#DACFBF] text-xs font-semibold rounded-lg hover:bg-[#F2ECE1] flex items-center gap-1"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Formula</span>
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete product "${p.name}"?`)) {
                        deleteProduct(p.id);
                      }
                    }}
                    className="p-1.5 text-stone-400 hover:text-red-700 transition-colors"
                    aria-label="Delete product"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: COUPONS */}
      {activeTab === 'coupons' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-[#EDE7DC] space-y-4">
            <h3 className="font-serif text-lg font-medium text-[#212E20]">Create New Promotion Code</h3>
            <form onSubmit={handleCreateCoupon} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Coupon Code</label>
                <input
                  type="text"
                  required
                  value={newCouponCode}
                  onChange={(e) => setNewCouponCode(e.target.value)}
                  placeholder="e.g. BOTANICAL20"
                  className="w-full px-3 py-2 border border-[#DACFBF] rounded-lg text-xs uppercase"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Discount %</label>
                <input
                  type="number"
                  min={1}
                  max={90}
                  required
                  value={newCouponDiscount}
                  onChange={(e) => setNewCouponDiscount(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-[#DACFBF] rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Min Order ($)</label>
                <input
                  type="number"
                  min={0}
                  value={newCouponMinOrder}
                  onChange={(e) => setNewCouponMinOrder(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-[#DACFBF] rounded-lg text-xs"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-[#485E42] text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#384A33]"
              >
                Create Coupon
              </button>
            </form>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {coupons.map((c) => (
              <div key={c.id} className="p-4 bg-white rounded-xl border border-[#EDE7DC] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-[#212E20]">{c.code}</span>
                    <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      {c.discountPercent}% Off
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1">Min Order: ${c.minOrder}</p>
                </div>
                <button
                  onClick={() => toggleCoupon(c.id)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg border ${
                    c.isActive
                      ? 'border-emerald-700 text-emerald-800 bg-emerald-50'
                      : 'border-stone-300 text-stone-400 bg-stone-50'
                  }`}
                >
                  {c.isActive ? 'Active' : 'Paused'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: JOURNAL MANAGEMENT */}
      {activeTab === 'blog' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-medium text-[#212E20]">Published Editorial Stories</h3>
            <button
              onClick={() => setIsBlogModalOpen(true)}
              className="px-4 py-2 bg-[#212E20] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Write Story</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <div key={post.id} className="bg-white p-5 rounded-2xl border border-[#EDE7DC] space-y-3 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-[#485E42] font-semibold uppercase">{post.category}</span>
                  <h4 className="font-serif text-base font-semibold text-[#212E20] line-clamp-2 mt-1">{post.title}</h4>
                  <p className="text-xs text-stone-500 line-clamp-2 mt-1">{post.excerpt}</p>
                </div>
                <div className="pt-3 border-t border-[#F2ECE1] flex items-center justify-between text-xs">
                  <span className="text-stone-400">{post.publishedAt}</span>
                  <button
                    onClick={() => deleteBlogPost(post.id)}
                    className="text-stone-400 hover:text-red-700 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PRODUCT ADD/EDIT MODAL */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm p-4 sm:p-6 flex items-center justify-center">
          <div className="bg-[#FAF8F5] rounded-2xl max-w-3xl w-full border border-[#E8DFD0] shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#EDE7DC]">
              <h3 className="font-serif text-xl font-semibold text-[#212E20]">
                {editingProduct ? `Edit "${editingProduct.name}"` : 'Create New Botanical Product'}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Organic Structure Oil"
                    className="w-full px-3 py-2 border border-[#DACFBF] rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full px-3 py-2 border border-[#DACFBF] rounded-lg text-xs bg-white"
                  >
                    <option value="Skincare">Skincare</option>
                    <option value="Wellness & Fragrance">Wellness & Fragrance</option>
                    <option value="Body & Bath">Body & Bath</option>
                    <option value="Home & Living">Home & Living</option>
                    <option value="Handcrafted Crafts">Handcrafted Crafts</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Subtitle / Botanical Benefit</label>
                <input
                  type="text"
                  required
                  value={formSubtitle}
                  onChange={(e) => setFormSubtitle(e.target.value)}
                  placeholder="e.g. Nourish & Restore with Jojoba and Rosehip"
                  className="w-full px-3 py-2 border border-[#DACFBF] rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">Price ($)</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-[#DACFBF] rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">Sale Price ($)</label>
                  <input
                    type="number"
                    min={1}
                    value={formSalePrice || ''}
                    onChange={(e) => setFormSalePrice(e.target.value ? Number(e.target.value) : undefined)}
                    placeholder="Optional"
                    className="w-full px-3 py-2 border border-[#DACFBF] rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">Stock On-Hand</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={formStock}
                    onChange={(e) => setFormStock(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-[#DACFBF] rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">Origin Country</label>
                  <input
                    type="text"
                    required
                    value={formOriginCountry}
                    onChange={(e) => setFormOriginCountry(e.target.value)}
                    placeholder="e.g. Morocco"
                    className="w-full px-3 py-2 border border-[#DACFBF] rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">Origin Region</label>
                  <input
                    type="text"
                    required
                    value={formOriginRegion}
                    onChange={(e) => setFormOriginRegion(e.target.value)}
                    placeholder="e.g. Souss Valley"
                    className="w-full px-3 py-2 border border-[#DACFBF] rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Product Description</label>
                <textarea
                  rows={3}
                  required
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-[#DACFBF] rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Image URL</label>
                <input
                  type="url"
                  required
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  className="w-full px-3 py-2 border border-[#DACFBF] rounded-lg text-xs"
                />
              </div>

              <div className="flex flex-wrap gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-medium text-stone-700">
                  <input
                    type="checkbox"
                    checked={formIsCustomizable}
                    onChange={(e) => setFormIsCustomizable(e.target.checked)}
                    className="rounded border-[#DACFBF] text-[#485E42]"
                  />
                  <span>Enable Custom Formulation Studio</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-medium text-stone-700">
                  <input
                    type="checkbox"
                    checked={formFeatured}
                    onChange={(e) => setFormFeatured(e.target.checked)}
                    className="rounded border-[#DACFBF] text-[#485E42]"
                  />
                  <span>Mark as Featured Product</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-medium text-stone-700">
                  <input
                    type="checkbox"
                    checked={formBestseller}
                    onChange={(e) => setFormBestseller(e.target.checked)}
                    className="rounded border-[#DACFBF] text-[#485E42]"
                  />
                  <span>Mark as Bestseller</span>
                </label>
              </div>

              <div className="pt-4 border-t border-[#EDE7DC] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 border border-[#DACFBF] text-xs font-semibold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#212E20] text-white text-xs font-semibold rounded-lg hover:bg-[#344633]"
                >
                  {editingProduct ? 'Save Updates' : 'Publish Product'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* BLOG STORY MODAL */}
      {isBlogModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm p-4 sm:p-6 flex items-center justify-center">
          <div className="bg-[#FAF8F5] rounded-2xl max-w-2xl w-full border border-[#E8DFD0] shadow-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#EDE7DC]">
              <h3 className="font-serif text-lg font-semibold text-[#212E20]">Write Botanical Journal Article</h3>
              <button onClick={() => setIsBlogModalOpen(false)} className="text-stone-400">✕</button>
            </div>
            <form onSubmit={handleCreateBlog} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={blogTitle}
                  onChange={(e) => setBlogTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-[#DACFBF] rounded-lg text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">Category</label>
                  <select
                    value={blogCategory}
                    onChange={(e) => setBlogCategory(e.target.value as any)}
                    className="w-full px-3 py-2 border border-[#DACFBF] rounded-lg text-xs bg-white"
                  >
                    <option value="Rituals">Rituals</option>
                    <option value="Global Sourcing">Global Sourcing</option>
                    <option value="Sustainability">Sustainability</option>
                    <option value="Ingredients">Ingredients</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">Author</label>
                  <input
                    type="text"
                    required
                    value={blogAuthor}
                    onChange={(e) => setBlogAuthor(e.target.value)}
                    className="w-full px-3 py-2 border border-[#DACFBF] rounded-lg text-xs"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Excerpt</label>
                <input
                  type="text"
                  required
                  value={blogExcerpt}
                  onChange={(e) => setBlogExcerpt(e.target.value)}
                  className="w-full px-3 py-2 border border-[#DACFBF] rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Story Content</label>
                <textarea
                  rows={5}
                  required
                  value={blogContent}
                  onChange={(e) => setBlogContent(e.target.value)}
                  className="w-full px-3 py-2 border border-[#DACFBF] rounded-lg text-xs font-sans"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsBlogModalOpen(false)}
                  className="px-4 py-2 border border-[#DACFBF] text-xs font-semibold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#212E20] text-white text-xs font-semibold rounded-lg"
                >
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
