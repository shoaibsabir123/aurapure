import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  Search, 
  Sparkles, 
  X, 
  SlidersHorizontal, 
  ArrowUpDown, 
  Check, 
  RotateCcw 
} from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';

interface ShopPageProps {
  onSelectProduct: (product: Product) => void;
  onCustomizeProduct: (product: Product) => void;
  initialCountryFilter?: string;
  initialCategoryFilter?: string;
}

export const ShopPage: React.FC<ShopPageProps> = ({ 
  onSelectProduct, 
  onCustomizeProduct,
  initialCountryFilter,
  initialCategoryFilter
}) => {
  const { products, isLoadingProducts } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategoryFilter || 'All');
  const [selectedCountry, setSelectedCountry] = useState<string>(initialCountryFilter || 'All');
  const [onlyCustomizable, setOnlyCustomizable] = useState<boolean>(false);
  const [maxPrice, setMaxPrice] = useState<number>(100);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const categories = ['All', 'Skincare', 'Wellness & Fragrance', 'Body & Bath', 'Home & Living', 'Handcrafted Crafts'];
  const countries = ['All', 'Pakistan', 'Morocco & Chile', 'Japan & France', 'France', 'India', 'Mexico', 'Italy', 'Ghana', 'Portugal'];

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== 'All' && p.category !== selectedCategory) {
        return false;
      }
      // Country filter
      if (selectedCountry !== 'All' && !p.originCountry.toLowerCase().includes(selectedCountry.toLowerCase())) {
        return false;
      }
      // Customizable filter
      if (onlyCustomizable && !p.isCustomizable) {
        return false;
      }
      // Price filter
      const effectivePrice = p.salePrice ?? p.price;
      if (effectivePrice > maxPrice) {
        return false;
      }
      // Rating filter
      if (minRating > 0 && p.rating < minRating) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesSub = p.subtitle.toLowerCase().includes(query);
        const matchesIng = p.ingredients.some((i) => i.toLowerCase().includes(query));
        const matchesCountry = p.originCountry.toLowerCase().includes(query);
        const matchesTags = p.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchesName && !matchesSub && !matchesIng && !matchesCountry && !matchesTags) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return (a.salePrice ?? a.price) - (b.salePrice ?? b.price);
      if (sortBy === 'price-desc') return (b.salePrice ?? b.price) - (a.salePrice ?? a.price);
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [products, selectedCategory, selectedCountry, onlyCustomizable, maxPrice, minRating, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedCountry('All');
    setOnlyCustomizable(false);
    setMaxPrice(100);
    setMinRating(0);
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      
      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-semibold text-[#485E42] uppercase tracking-widest">
          Complete Collection
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#212E20]">
          The Global Apothecary
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
          Pure wild-harvested botanicals, restorative clay blends, and artisanal vessels sourced directly from verified ethical growers worldwide.
        </p>
      </div>

      {/* Filter / Sort Control Bar */}
      <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#EDE7DC] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Search Field */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search botanicals, ingredients, countries..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-[#DACFBF] rounded-lg text-xs text-[#212E20] focus:outline-none focus:border-[#485E42] placeholder:text-stone-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600"
            >
              ✕
            </button>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 justify-between md:justify-end">
          
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden px-3.5 py-2 bg-white border border-[#DACFBF] rounded-lg text-xs font-medium text-stone-700 flex items-center gap-1.5"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500 hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-[#DACFBF] rounded-lg px-3 py-2 text-xs font-medium text-stone-700 focus:outline-none focus:border-[#485E42]"
            >
              <option value="featured">Featured & Curated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Customer Rating</option>
              <option value="newest">New Arrivals</option>
            </select>
          </div>

          <span className="text-xs text-stone-500 font-medium tabular-nums pl-1 hidden sm:inline">
            {filteredProducts.length} items
          </span>
        </div>

      </div>

      {/* Main Grid & Filter Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Desktop Sidebar Filters */}
        <aside className={`lg:block ${mobileFilterOpen ? 'block' : 'hidden'} space-y-6 bg-[#FAF8F5] p-5 rounded-2xl border border-[#EDE7DC] self-start`}>
          
          <div className="flex items-center justify-between pb-3 border-b border-[#EAE3D6]">
            <h3 className="font-serif text-lg font-semibold text-[#212E20] flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#485E42]" />
              <span>Refine Catalog</span>
            </h3>
            <button
              onClick={resetFilters}
              className="text-xs text-stone-500 hover:text-[#485E42] flex items-center gap-1 font-medium"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-stone-800 uppercase tracking-wider block">
              Category
            </label>
            <div className="space-y-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                    selectedCategory === cat
                      ? 'bg-[#EAE3D4] text-[#212E20] font-semibold'
                      : 'text-stone-600 hover:bg-[#F2ECE1]'
                  }`}
                >
                  <span>{cat}</span>
                  {selectedCategory === cat && <Check className="w-3.5 h-3.5 text-[#485E42]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Country of Origin Filter */}
          <div className="space-y-2 pt-4 border-t border-[#EAE3D6]">
            <label className="text-xs font-semibold text-stone-800 uppercase tracking-wider block">
              Origin Country
            </label>
            <div className="space-y-1">
              {countries.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCountry(c)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                    selectedCountry === c
                      ? 'bg-[#EAE3D4] text-[#212E20] font-semibold'
                      : 'text-stone-600 hover:bg-[#F2ECE1]'
                  }`}
                >
                  <span>{c}</span>
                  {selectedCountry === c && <Check className="w-3.5 h-3.5 text-[#485E42]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Customizable Only Toggle */}
          <div className="pt-4 border-t border-[#EAE3D6]">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-800 font-medium select-none">
              <input
                type="checkbox"
                checked={onlyCustomizable}
                onChange={(e) => setOnlyCustomizable(e.target.checked)}
                className="rounded border-[#DACFBF] text-[#485E42] focus:ring-[#485E42]"
              />
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#B39055]" />
                <span>Customizable Blends Only</span>
              </span>
            </label>
          </div>

          {/* Max Price Slider */}
          <div className="space-y-2 pt-4 border-t border-[#EAE3D6]">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-stone-800 uppercase tracking-wider">
                Max Price
              </label>
              <span className="font-bold text-[#212E20] tabular-nums">${maxPrice}</span>
            </div>
            <input
              type="range"
              min={30}
              max={100}
              step={5}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#485E42]"
            />
            <div className="flex justify-between text-[10px] text-stone-400">
              <span>$30</span>
              <span>$100</span>
            </div>
          </div>

        </aside>

        {/* Product Grid Area */}
        <div className="lg:col-span-3">
          
          {isLoadingProducts ? (
            <div className="py-20 text-center text-stone-500">
              <div className="w-8 h-8 rounded-full border-2 border-[#485E42] border-t-transparent animate-spin mx-auto mb-3" />
              <p className="text-xs">Preparing botanical catalog...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="p-12 text-center bg-[#FAF8F5] rounded-2xl border border-[#EDE7DC] space-y-3">
              <Sparkles className="w-8 h-8 text-stone-400 mx-auto" />
              <h3 className="font-serif text-xl text-stone-800 font-medium">No matches found</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                We couldn&rsquo;t find items matching your active filter criteria. Try adjusting the origin country or price range.
              </p>
              <button
                onClick={resetFilters}
                className="mt-2 px-5 py-2 bg-[#212E20] text-white text-xs font-semibold rounded-lg hover:bg-[#344633] transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={onSelectProduct}
                  onCustomize={onCustomizeProduct}
                />
              ))}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
