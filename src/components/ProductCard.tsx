import React, { useState } from 'react';
import { Heart, Star, Sparkles, Plus, Check } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onCustomize?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect, onCustomize }) => {
  const { isWishlisted, toggleWishlist, addToCart } = useStore();
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const wishlisted = isWishlisted(product.id);
  const displayImage = product.images[isHovered && product.images.length > 1 ? 1 : 0] || product.images[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.isCustomizable && onCustomize) {
      onCustomize(product);
      return;
    }
    const defaultVar = product.variations.length > 0 ? product.variations[0] : undefined;
    addToCart(product, defaultVar);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div 
      onClick={() => onSelect(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer flex flex-col bg-[#FAF8F5] rounded-xl overflow-hidden border border-[#EBE4D8] hover:border-[#D0C5B4] hover:shadow-md transition-all duration-200"
    >
      {/* Product Image Stage */}
      <div className="relative aspect-[4/3] w-full bg-[#F3EFE8] overflow-hidden">
        {!imageError ? (
          <img
            src={displayImage}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#EAE4D8] to-[#DFD7C7] text-[#556452]">
            <Sparkles className="w-8 h-8 mb-2 opacity-50" />
            <span className="font-serif text-base font-medium">{product.name}</span>
            <span className="text-xs text-stone-500 mt-1">{product.originCountry}</span>
          </div>
        )}

        {/* Wishlist Button Overlay */}
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
            wishlisted 
              ? 'bg-white text-[#9C3D3D] shadow-sm' 
              : 'bg-white/80 text-stone-600 hover:bg-white hover:text-stone-900 shadow-sm opacity-90'
          }`}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Subtle Country Indicator */}
        <div className="absolute bottom-3 left-3 bg-[#1C251B]/70 backdrop-blur-md text-[#EFEBE4] text-[11px] font-medium px-2.5 py-1 rounded-md tracking-wide">
          {product.originCountry}
        </div>

        {/* Customizable Marker */}
        {product.isCustomizable && (
          <div className="absolute top-3 left-3 bg-[#EAE3CE] text-[#52411F] text-[11px] font-semibold px-2 py-0.5 rounded flex items-center gap-1 shadow-sm">
            <Sparkles className="w-3 h-3 text-[#B39055]" />
            <span>Customizable</span>
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Unboxed Metadata (Zero-Pill discipline) */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium uppercase tracking-wider mb-1">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>{product.originRegion}</span>
          </div>

          {/* Product Title */}
          <h3 className="font-serif text-lg font-medium text-[#212E20] group-hover:text-[#485E42] transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Product Subtitle / Key Benefit */}
          <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">
            {product.subtitle}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex items-center text-[#B39055]">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-xs font-semibold text-stone-700 tabular-nums">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-[11px] text-stone-400">
              ({product.reviewsCount})
            </span>
          </div>
        </div>

        {/* Pricing & Action Baselines */}
        <div className="mt-4 pt-3 border-t border-[#EDE7DC] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-semibold text-[#212E20] tabular-nums">
              ${product.salePrice ?? product.price}
            </span>
            {product.salePrice && (
              <span className="text-xs text-stone-400 line-through tabular-nums">
                ${product.price}
              </span>
            )}
            {product.isCustomizable && (
              <span className="text-[10px] text-stone-400">base</span>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              addedAnimation 
                ? 'bg-[#485E42] text-white' 
                : product.isCustomizable
                ? 'bg-[#EAE3CE] text-[#473B24] hover:bg-[#DDD3BC]'
                : 'bg-[#212E20] text-[#FBF9F5] hover:bg-[#344633]'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : product.isCustomizable ? (
              <>
                <Sparkles className="w-3.5 h-3.5 text-[#B39055]" />
                <span>Customize</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
