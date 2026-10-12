import React, { useState } from 'react';
import { Search, X, ArrowRight, Sparkles, MapPin } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectProduct }) => {
  const { products } = useStore();
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredProducts = products.filter((p) => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return true;
    return (
      p.name.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term) ||
      p.originCountry.toLowerCase().includes(term) ||
      p.ingredients.some((ing) => ing.toLowerCase().includes(term)) ||
      p.tags.some((tag) => tag.toLowerCase().includes(term))
    );
  });

  const popularSearches = ['Matcha', 'Jojoba Oil', 'Morocco', 'Japan', 'Lavender', 'Custom Oil', 'Kaolin Clay'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm p-4 sm:p-6 flex items-start justify-center pt-20">
      <div className="bg-[#FAF8F5] rounded-2xl max-w-2xl w-full border border-[#E8DFD0] shadow-2xl overflow-hidden flex flex-col">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[#EAE3D6] flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-stone-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by botanical name, ingredient, country (e.g. Morocco, Matcha)..."
            className="w-full bg-transparent text-sm text-[#212E20] focus:outline-none placeholder:text-stone-400 font-medium"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-stone-400 hover:text-stone-600 text-xs px-2 py-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors ml-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Tags */}
        <div className="px-5 py-3 bg-[#F4EFE6] border-b border-[#EAE3D6] flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-stone-500 font-medium shrink-0">Popular:</span>
          {popularSearches.map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchTerm(tag)}
              className="px-2.5 py-1 bg-white hover:bg-[#EAE3D4] text-stone-700 rounded-md border border-[#E3D9C9] shrink-0 transition-colors text-[11px]"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-5 space-y-3">
          {filteredProducts.length === 0 ? (
            <div className="py-12 text-center text-stone-500 space-y-2">
              <p className="font-serif text-lg text-stone-800">No botanicals found</p>
              <p className="text-xs">Try searching for ingredients like Rosehip, Shea Butter, or countries like France or Japan.</p>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="group p-3 bg-white hover:bg-[#F6F4EE] rounded-xl border border-[#EDE7DC] hover:border-[#DACFBF] transition-all flex items-center gap-4 cursor-pointer"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 rounded-lg object-cover bg-[#F3EFE8] shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-[10px] text-stone-500 uppercase tracking-wider">
                    <span>{product.category}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-2.5 h-2.5" />
                      {product.originCountry}
                    </span>
                  </div>
                  <h4 className="font-serif text-base font-medium text-[#212E20] group-hover:text-[#485E42] transition-colors truncate">
                    {product.name}
                  </h4>
                  <p className="text-xs text-stone-500 truncate">
                    {product.subtitle}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold text-[#212E20] tabular-nums">
                    ${product.salePrice ?? product.price}
                  </p>
                  {product.isCustomizable && (
                    <span className="text-[10px] text-[#B39055] font-medium flex items-center gap-0.5 justify-end">
                      <Sparkles className="w-3 h-3" />
                      Custom
                    </span>
                  )}
                </div>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#485E42] group-hover:translate-x-1 transition-all shrink-0 ml-1" />
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 bg-[#FAF8F5] border-t border-[#EAE3D6] text-right text-[11px] text-stone-500">
          Showing {filteredProducts.length} results
        </div>

      </div>
    </div>
  );
};
