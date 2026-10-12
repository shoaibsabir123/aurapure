import React, { useState, useEffect } from 'react';
import { 
  Star, 
  Heart, 
  Sparkles, 
  MapPin, 
  ShieldCheck, 
  RotateCcw, 
  Truck, 
  Leaf, 
  Plus, 
  Minus, 
  Check, 
  Share2, 
  MessageSquarePlus,
  ArrowRight
} from 'lucide-react';
import { Product, ProductVariation } from '../types';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';

interface ProductDetailPageProps {
  product: Product;
  onCustomize: (product: Product, variation?: ProductVariation) => void;
  onSelectProduct: (product: Product) => void;
  onDirectCheckout: () => void;
  onBackToShop: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onCustomize,
  onSelectProduct,
  onDirectCheckout,
  onBackToShop
}) => {
  const { 
    addToCart, 
    isWishlisted, 
    toggleWishlist, 
    reviews, 
    addReview, 
    products, 
    addRecentlyViewed, 
    showToast 
  } = useStore();

  // Active variation
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation>(
    product.variations.length > 0 ? product.variations[0] : {
      id: 'default',
      name: 'Standard Format',
      type: 'size',
      value: 'Standard',
      priceOffset: 0,
      stock: product.stock,
      image: product.images[0]
    }
  );

  // Active main image
  const [activeImage, setActiveImage] = useState<string>(
    selectedVariation?.image || product.images[0]
  );

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'story' | 'ingredients' | 'ritual' | 'reviews'>('story');
  
  // Review submission form
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewName, setReviewName] = useState('');
  const [reviewCountry, setReviewCountry] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');

  // Register recently viewed
  useEffect(() => {
    addRecentlyViewed(product.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product.id]);

  // When variation changes, sync active image and check stock
  const handleVariationChange = (variation: ProductVariation) => {
    setSelectedVariation(variation);
    if (variation.image) {
      setActiveImage(variation.image);
    }
  };

  const wishlisted = isWishlisted(product.id);
  const effectivePrice = (product.salePrice ?? product.price) + selectedVariation.priceOffset;
  const isOutOfStock = selectedVariation.stock <= 0;

  const handleAddToCart = () => {
    if (product.isCustomizable) {
      onCustomize(product, selectedVariation);
      return;
    }
    addToCart(product, selectedVariation, undefined, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedVariation, undefined, quantity);
    onDirectCheckout();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.subtitle,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard.');
    }
  };

  const productReviews = reviews.filter((r) => r.productId === product.id);
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.originCountry === product.originCountry))
    .slice(0, 4);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewComment || !reviewTitle) {
      showToast('Please complete all review fields.');
      return;
    }
    await addReview({
      productId: product.id,
      userName: reviewName,
      userCountry: reviewCountry || 'International Customer',
      rating: reviewRating,
      title: reviewTitle,
      comment: reviewComment,
      verifiedPurchase: true,
    });
    setReviewName('');
    setReviewCountry('');
    setReviewTitle('');
    setReviewComment('');
    setShowReviewForm(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
        <button onClick={onBackToShop} className="hover:text-[#212E20] transition-colors">
          Shop All
        </button>
        <span>/</span>
        <span className="text-stone-700">{product.category}</span>
        <span>/</span>
        <span className="text-[#212E20] font-semibold truncate max-w-xs">{product.name}</span>
      </div>

      {/* Main Contiguous Purchase Module & Image Gallery */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Stage Image */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#F3ECE0] border border-[#E8DFD0] shadow-sm">
            <img
              src={activeImage}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            {product.isCustomizable && (
              <div className="absolute top-4 left-4 bg-[#EAE3CE] text-[#52411F] text-xs font-semibold px-3 py-1 rounded-md flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#B39055]" />
                <span>Custom Formulation Supported</span>
              </div>
            )}
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all ${
                wishlisted 
                  ? 'bg-white text-[#9C3D3D] shadow-md' 
                  : 'bg-white/80 text-stone-600 hover:bg-white shadow-sm'
              }`}
              aria-label="Wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Thumbnails Row */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                  activeImage === img
                    ? 'border-[#485E42] shadow-sm'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`${product.name} thumb ${idx}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
            {/* Show variation images if available */}
            {product.variations.filter(v => v.image && !product.images.includes(v.image)).map((v) => (
              <button
                key={v.id}
                onClick={() => handleVariationChange(v)}
                className={`w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                  selectedVariation.id === v.id
                    ? 'border-[#485E42] shadow-sm'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={v.image}
                  alt={v.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-stone-500 font-medium uppercase tracking-wider">
              <span className="flex items-center gap-1.5 text-[#485E42]">
                <MapPin className="w-3.5 h-3.5" />
                {product.originCountry} · {product.originRegion}
              </span>
              <button 
                onClick={handleShare}
                className="text-stone-400 hover:text-stone-700 flex items-center gap-1"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span className="capitalize">Share</span>
              </button>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#212E20] leading-tight">
              {product.name}
            </h1>
            <p className="text-xs sm:text-sm text-stone-600">
              {product.subtitle}
            </p>

            {/* Rating Stars */}
            <div className="flex items-center gap-2 pt-1">
              <div className="flex text-[#B39055]">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} 
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-stone-700 tabular-nums">
                {product.rating.toFixed(1)}
              </span>
              <span className="text-xs text-stone-400">
                ({product.reviewsCount} customer reviews)
              </span>
            </div>
          </div>

          {/* Pricing & Stock Status */}
          <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#EDE7DC] flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-serif font-bold text-[#212E20] tabular-nums">
                  ${effectivePrice.toFixed(2)}
                </span>
                {product.salePrice && (
                  <span className="text-sm text-stone-400 line-through tabular-nums">
                    ${(product.price + selectedVariation.priceOffset).toFixed(2)}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-stone-500 mt-0.5">
                Complimentary worldwide shipping on orders over $75
              </p>
            </div>

            <div className="text-right">
              {isOutOfStock ? (
                <span className="text-xs font-semibold text-red-700 bg-red-50 px-2.5 py-1 rounded">
                  Out of Stock
                </span>
              ) : selectedVariation.stock <= 10 ? (
                <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded">
                  Low Stock: {selectedVariation.stock} left
                </span>
              ) : (
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded">
                  In Stock ({selectedVariation.stock} units)
                </span>
              )}
            </div>
          </div>

          {/* Variation Selector (e.g. Size / Format / Color) */}
          {product.variations.length > 1 && (
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-800 uppercase tracking-wider flex items-center justify-between">
                <span>Select Format / Variation:</span>
                <span className="text-stone-500 font-normal normal-case text-xs">
                  {selectedVariation.name}
                </span>
              </label>

              <div className="grid grid-cols-2 gap-2.5">
                {product.variations.map((v) => {
                  const isSelected = selectedVariation.id === v.id;
                  return (
                    <button
                      key={v.id}
                      onClick={() => handleVariationChange(v)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-[#485E42] bg-[#F4F1EA] ring-1 ring-[#485E42] shadow-sm'
                          : 'border-[#EDE7DC] bg-white hover:border-[#D5CABE]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#212E20]">{v.name}</span>
                        {v.priceOffset > 0 && (
                          <span className="text-[10px] text-stone-500">+${v.priceOffset}</span>
                        )}
                      </div>
                      <p className="text-[11px] text-stone-500 mt-0.5">{v.value}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Customization Atelier Banner if applicable */}
          {product.isCustomizable && (
            <div className="p-4 bg-[#F5EFE4] rounded-xl border border-[#DECDB7] space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#57431B]">
                <Sparkles className="w-4 h-4 text-[#B39055]" />
                <span>Bespoke Botanical Customization</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Personalize this formulation by choosing your preferred carrier oil, adding bio-active boosters (like Blue Tansy or Sea Buckthorn), and printing your name on the label.
              </p>
              <button
                onClick={() => onCustomize(product, selectedVariation)}
                className="w-full py-2.5 bg-[#485E42] hover:bg-[#3A4B35] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C4A962]" />
                <span>Open Custom Formulation Studio</span>
              </button>
            </div>
          )}

          {/* Quantity & Add to Cart Controls */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-[#DACFBF] rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-3 hover:bg-stone-100 text-stone-600 font-bold"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 text-xs font-semibold tabular-nums text-stone-800">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-3 hover:bg-stone-100 text-stone-600 font-bold"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`flex-1 py-3.5 px-6 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md ${
                  isOutOfStock
                    ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                    : 'bg-[#212E20] hover:bg-[#344633] text-white active:scale-[0.99]'
                }`}
              >
                {product.isCustomizable ? (
                  <>
                    <Sparkles className="w-4 h-4 text-[#C4A962]" />
                    <span>Customize & Add · ${(effectivePrice * quantity).toFixed(2)}</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Add to Bag · ${(effectivePrice * quantity).toFixed(2)}</span>
                  </>
                )}
              </button>
            </div>

            {/* Direct Buy Now Button */}
            {!product.isCustomizable && !isOutOfStock && (
              <button
                onClick={handleBuyNow}
                className="w-full py-3 bg-[#EAE2D2] hover:bg-[#DDD3BF] text-[#212E20] text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors"
              >
                Buy Now (Instant Checkout)
              </button>
            )}
          </div>

          {/* Trust Guarantees */}
          <div className="pt-4 border-t border-[#EAE3D6] grid grid-cols-2 gap-3 text-xs text-stone-500">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#485E42]" />
              <span>Carbon-Neutral Worldwide Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-[#485E42]" />
              <span>30-Day Fresh Botanical Guarantee</span>
            </div>
          </div>

        </div>

      </div>

      {/* Tabs: Story, Ingredients, Ritual Guide, Reviews */}
      <div className="pt-8 border-t border-[#EAE3D6]">
        
        {/* Tab Headers */}
        <div className="flex border-b border-[#EAE3D6] overflow-x-auto gap-8">
          <button
            onClick={() => setActiveTab('story')}
            className={`pb-3 text-sm font-semibold transition-colors shrink-0 ${
              activeTab === 'story'
                ? 'text-[#212E20] border-b-2 border-[#485E42]'
                : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            The Origin & Artisan Story
          </button>
          <button
            onClick={() => setActiveTab('ingredients')}
            className={`pb-3 text-sm font-semibold transition-colors shrink-0 ${
              activeTab === 'ingredients'
                ? 'text-[#212E20] border-b-2 border-[#485E42]'
                : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            Ingredients & Botanical Benefits
          </button>
          <button
            onClick={() => setActiveTab('ritual')}
            className={`pb-3 text-sm font-semibold transition-colors shrink-0 ${
              activeTab === 'ritual'
                ? 'text-[#212E20] border-b-2 border-[#485E42]'
                : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            Ritual & Usage Guide
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 text-sm font-semibold transition-colors shrink-0 flex items-center gap-1.5 ${
              activeTab === 'reviews'
                ? 'text-[#212E20] border-b-2 border-[#485E42]'
                : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            <span>Customer Reviews</span>
            <span className="text-xs bg-[#EAE3D4] text-[#334231] px-1.5 py-0.5 rounded font-mono">
              {productReviews.length}
            </span>
          </button>
        </div>

        {/* Tab Content Panes */}
        <div className="py-8 max-w-4xl">
          
          {/* Tab 1: Story */}
          {activeTab === 'story' && (
            <div className="space-y-4 text-sm text-stone-700 leading-relaxed">
              <h3 className="font-serif text-2xl font-medium text-[#212E20]">
                Provenance from {product.originCountry}
              </h3>
              <p>{product.description}</p>
              <div className="p-5 bg-[#FAF8F5] rounded-xl border border-[#EDE7DC] space-y-2">
                <h4 className="font-semibold text-xs uppercase tracking-wider text-[#485E42]">Artisan Collective</h4>
                <p className="text-xs text-stone-600 leading-relaxed">{product.story}</p>
              </div>
            </div>
          )}

          {/* Tab 2: Ingredients */}
          {activeTab === 'ingredients' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-2xl font-medium text-[#212E20] mb-2">
                  Full Botanical Transparency
                </h3>
                <p className="text-xs text-stone-600">
                  Every formulation is 100% free from mineral oil, silicones, PEGs, synthetic fragrances, and artificial preservatives.
                </p>
              </div>

              {product.ingredientDetails && product.ingredientDetails.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.ingredientDetails.map((ing) => (
                    <div key={ing.name} className="p-4 bg-white rounded-xl border border-[#EDE7DC]">
                      <div className="flex items-center justify-between">
                        <h4 className="font-serif text-base font-semibold text-[#212E20]">{ing.name}</h4>
                        <span className="text-[10px] text-[#485E42] font-semibold">{ing.origin}</span>
                      </div>
                      <p className="text-[11px] font-mono text-stone-400 italic">{ing.botanicalName}</p>
                      <p className="text-xs text-stone-600 mt-2">{ing.benefit}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#EDE7DC]">
                <h4 className="text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                  INCI Ingredient Registry
                </h4>
                <p className="text-xs text-stone-500 font-mono leading-relaxed">
                  {product.ingredients.join(' · ')}
                </p>
              </div>
            </div>
          )}

          {/* Tab 3: Ritual */}
          {activeTab === 'ritual' && (
            <div className="space-y-4 text-sm text-stone-700 leading-relaxed">
              <h3 className="font-serif text-2xl font-medium text-[#212E20]">
                The Botanical Application Ritual
              </h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <span className="font-serif text-lg font-bold text-[#485E42]">01.</span>
                  <div>
                    <h4 className="font-semibold text-xs uppercase tracking-wider text-stone-800">Warm & Inhale</h4>
                    <p className="text-xs text-stone-600 mt-0.5">Dispense 3-5 drops into the palms of clean hands. Press palms together to warm the botanical lipid blend to skin temperature, cup hands over nose and take three deep grounding breaths.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="font-serif text-lg font-bold text-[#485E42]">02.</span>
                  <div>
                    <h4 className="font-semibold text-xs uppercase tracking-wider text-stone-800">Ascending Press</h4>
                    <p className="text-xs text-stone-600 mt-0.5">Gently press onto freshly cleansed, damp face, neck, and décolletage in upward circular motions until fully absorbed into cellular membranes.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="font-serif text-lg font-bold text-[#485E42]">03.</span>
                  <div>
                    <h4 className="font-semibold text-xs uppercase tracking-wider text-stone-800">Day & Night Harmony</h4>
                    <p className="text-xs text-stone-600 mt-0.5">Use each morning as a protective antioxidant shield before SPF, and each evening as a restorative lipid replenishment.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Reviews */}
          {activeTab === 'reviews' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between pb-4 border-b border-[#EAE3D6]">
                <div>
                  <h3 className="font-serif text-2xl font-medium text-[#212E20]">
                    Verified Customer Reviews
                  </h3>
                  <p className="text-xs text-stone-500">
                    Average {product.rating.toFixed(1)} / 5.0 based on real botanical experiences
                  </p>
                </div>

                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="px-4 py-2 bg-[#212E20] hover:bg-[#344633] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <MessageSquarePlus className="w-3.5 h-3.5" />
                  <span>{showReviewForm ? 'Cancel Review' : 'Write a Review'}</span>
                </button>
              </div>

              {/* Review Submission Form */}
              {showReviewForm && (
                <form onSubmit={handleSubmitReview} className="p-6 bg-white rounded-xl border border-[#DACFBF] space-y-4 shadow-sm">
                  <h4 className="font-serif text-lg font-semibold text-[#212E20]">
                    Share Your Experience
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={reviewName}
                        onChange={(e) => setReviewName(e.target.value)}
                        placeholder="e.g. Elena Vance"
                        className="w-full px-3 py-2 border border-[#DACFBF] rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">Your Location / Country</label>
                      <input
                        type="text"
                        value={reviewCountry}
                        onChange={(e) => setReviewCountry(e.target.value)}
                        placeholder="e.g. France"
                        className="w-full px-3 py-2 border border-[#DACFBF] rounded-lg text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">Rating</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          className="p-1 text-stone-300 hover:text-[#B39055]"
                        >
                          <Star className={`w-6 h-6 ${star <= reviewRating ? 'fill-[#B39055] text-[#B39055]' : ''}`} />
                        </button>
                      ))}
                      <span className="text-xs font-semibold text-stone-700 ml-2">
                        {reviewRating} of 5 Stars
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">Headline</label>
                    <input
                      type="text"
                      required
                      value={reviewTitle}
                      onChange={(e) => setReviewTitle(e.target.value)}
                      placeholder="e.g. Sublime absorption and calm skin"
                      className="w-full px-3 py-2 border border-[#DACFBF] rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">Your Review</label>
                    <textarea
                      required
                      rows={3}
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="How has this product supported your skin barrier?"
                      className="w-full px-3 py-2 border border-[#DACFBF] rounded-lg text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#485E42] text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#394B34] transition-colors"
                  >
                    Submit Botanical Review
                  </button>
                </form>
              )}

              {/* Reviews List */}
              {productReviews.length === 0 ? (
                <div className="text-center py-8 text-stone-500 text-xs">
                  Be the first to review this global formulation.
                </div>
              ) : (
                <div className="space-y-4">
                  {productReviews.map((rev) => (
                    <div key={rev.id} className="p-5 bg-white rounded-xl border border-[#EDE7DC] space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex text-[#B39055]">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                        <span className="text-[11px] text-stone-400 font-mono">{rev.createdAt}</span>
                      </div>
                      <h4 className="font-serif text-base font-semibold text-[#212E20]">{rev.title}</h4>
                      <p className="text-xs text-stone-600 leading-relaxed italic">{rev.comment}</p>
                      <div className="pt-2 text-[11px] text-stone-500 flex items-center gap-2">
                        <span className="font-medium text-stone-700">{rev.userName}</span>
                        <span>·</span>
                        <span>{rev.userCountry}</span>
                        {rev.verifiedPurchase && (
                          <>
                            <span>·</span>
                            <span className="text-emerald-700 font-semibold">Verified Buyer</span>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      {/* Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <div className="pt-12 border-t border-[#EAE3D6] space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl font-medium text-[#212E20]">
              You May Also Appreciate
            </h3>
            <button
              onClick={onBackToShop}
              className="text-xs font-semibold uppercase tracking-wider text-[#485E42] hover:text-[#212E20] flex items-center gap-1"
            >
              <span>Explore All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onSelect={onSelectProduct}
                onCustomize={() => onCustomize(p)}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
