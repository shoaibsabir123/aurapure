import React, { useState } from 'react';
import { X, Sparkles, Check, Info, Shield, Plus, ArrowRight } from 'lucide-react';
import { Product, CustomizationSelection, ProductVariation } from '../types';
import { useStore } from '../context/StoreContext';

interface CustomizerModalProps {
  product: Product;
  onClose: () => void;
  initialVariation?: ProductVariation;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({ 
  product, 
  onClose,
  initialVariation 
}) => {
  const { addToCart } = useStore();
  const config = product.customizationConfig;

  // Selected variation
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation>(
    initialVariation || (product.variations.length > 0 ? product.variations[0] : {
      id: 'default',
      name: 'Standard Format',
      type: 'size',
      value: 'Standard',
      priceOffset: 0,
      stock: product.stock,
      image: product.images[0]
    })
  );

  // Customization choices
  const [selectedBaseId, setSelectedBaseId] = useState<string>(
    config?.baseOptions[0]?.id || ''
  );
  const [selectedBoosterIds, setSelectedBoosterIds] = useState<string[]>([]);
  const [selectedScentId, setSelectedScentId] = useState<string>(
    config?.scentOptions[0]?.id || ''
  );
  const [customLabel, setCustomLabel] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  if (!config) return null;

  // Selected entities
  const currentBase = config.baseOptions.find((b) => b.id === selectedBaseId) || config.baseOptions[0];
  const currentScent = config.scentOptions.find((s) => s.id === selectedScentId) || config.scentOptions[0];
  const currentBoosters = config.boosterOptions.filter((b) => selectedBoosterIds.includes(b.id));

  // Pricing calculations
  const baseProductPrice = product.salePrice ?? product.price;
  const variationPrice = selectedVariation.priceOffset;
  const baseOptionPrice = currentBase?.priceOffset || 0;
  const boostersPrice = currentBoosters.reduce((sum, b) => sum + b.priceOffset, 0);
  const scentPrice = currentScent?.priceOffset || 0;
  const totalCustomAdditions = baseOptionPrice + boostersPrice + scentPrice;
  const unitPrice = baseProductPrice + variationPrice + totalCustomAdditions;
  const totalPrice = unitPrice * quantity;

  const toggleBooster = (boosterId: string) => {
    if (selectedBoosterIds.includes(boosterId)) {
      setSelectedBoosterIds((prev) => prev.filter((id) => id !== boosterId));
    } else {
      if (selectedBoosterIds.length >= config.maxBoosters) {
        // Replace first selected or alert
        const replaced = [...selectedBoosterIds.slice(1), boosterId];
        setSelectedBoosterIds(replaced);
      } else {
        setSelectedBoosterIds((prev) => [...prev, boosterId]);
      }
    }
  };

  const handleAddToCart = () => {
    const customPayload: CustomizationSelection = {
      baseId: currentBase.id,
      baseName: currentBase.name,
      selectedBoosterIds,
      selectedBoosterNames: currentBoosters.map((b) => b.name),
      scentId: currentScent.id,
      scentName: currentScent.name,
      customLabel: customLabel.trim() || undefined,
      additionalPrice: totalCustomAdditions,
    };

    addToCart(product, selectedVariation, customPayload, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div className="bg-[#FAF8F5] rounded-2xl max-w-4xl w-full border border-[#E8DFD0] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[92vh]">
        
        {/* Left Column: Visual Preview & Live Formula Sheet */}
        <div className="md:w-5/12 bg-[#F3ECE0] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E8DFD0] overflow-y-auto">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-semibold tracking-wider uppercase text-[#54684E] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#B39055]" />
                Bespoke Atelier
              </span>
              <span className="text-xs text-stone-500">{product.originCountry}</span>
            </div>

            {/* Product Variation Image Preview */}
            <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-white shadow-inner mb-5">
              <img
                src={selectedVariation.image || product.images[0]}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              {/* Bottle Custom Engraving Overlay Simulation */}
              {customLabel && (
                <div className="absolute inset-x-4 bottom-4 bg-[#FBF9F5]/90 backdrop-blur-md p-2 rounded-lg border border-[#DACFBF] text-center shadow-md">
                  <p className="text-[10px] text-stone-500 uppercase tracking-widest font-mono">Bespoke Compounded For</p>
                  <p className="font-serif text-sm font-semibold text-[#212E20] truncate italic">&ldquo;{customLabel}&rdquo;</p>
                </div>
              )}
            </div>

            <h3 className="font-serif text-xl font-medium text-[#212E20] leading-snug">
              {product.name}
            </h3>
            <p className="text-xs text-stone-600 mt-1">
              {product.subtitle}
            </p>

            {/* Selected Recipe Live Card */}
            <div className="mt-5 p-4 bg-white/80 rounded-xl border border-[#E5DAC8] text-xs space-y-2">
              <h4 className="font-semibold text-stone-800 uppercase tracking-wider text-[10px] flex items-center justify-between">
                <span>Formula Blueprint</span>
                <span className="text-[#485E42]">Freshly Compounded</span>
              </h4>

              <div className="space-y-1.5 pt-1 text-stone-700">
                <div className="flex justify-between">
                  <span className="text-stone-500">Base:</span>
                  <span className="font-medium text-right max-w-[170px] truncate">{currentBase.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Boosters ({selectedBoosterIds.length}/{config.maxBoosters}):</span>
                  <span className="font-medium text-right max-w-[170px] truncate">
                    {currentBoosters.length > 0 ? currentBoosters.map((b) => b.name).join(', ') : 'None selected'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Scent:</span>
                  <span className="font-medium text-right max-w-[170px] truncate">{currentScent.name}</span>
                </div>
                {selectedVariation && (
                  <div className="flex justify-between">
                    <span className="text-stone-500">Format:</span>
                    <span className="font-medium text-right">{selectedVariation.name}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Pricing summary */}
          <div className="mt-6 pt-4 border-t border-[#E5DAC8] flex items-center justify-between">
            <div>
              <p className="text-[11px] text-stone-500 uppercase tracking-wider">Bespoke Price</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-serif font-bold text-[#212E20] tabular-nums">
                  ${unitPrice.toFixed(2)}
                </span>
                {totalCustomAdditions > 0 && (
                  <span className="text-xs text-[#52644D]">
                    (+${totalCustomAdditions} custom)
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Customization Controls */}
        <div className="md:w-7/12 p-6 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Header with Close */}
            <div className="flex items-center justify-between pb-4 border-b border-[#EDE7DC]">
              <div>
                <h3 className="font-serif text-lg font-semibold text-[#212E20]">Customize Your Formulation</h3>
                <p className="text-xs text-stone-500">Tailor pure natural ingredients to your skin and sensory desires</p>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200 transition-colors"
                aria-label="Close customizer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-5 space-y-6">
              {/* Step 0: Product Variation (e.g. Size / Volume) */}
              {product.variations.length > 1 && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-stone-800 uppercase tracking-wider flex items-center justify-between">
                    <span>1. Select Size / Vessel Format</span>
                    <span className="text-stone-400 normal-case font-normal text-[11px]">
                      {selectedVariation.value}
                    </span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {product.variations.map((v) => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVariation(v)}
                        className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                          selectedVariation.id === v.id
                            ? 'border-[#485E42] bg-[#F1EFEA] font-medium text-[#212E20] shadow-sm'
                            : 'border-[#EDE7DC] bg-white hover:border-[#D5CABE] text-stone-600'
                        }`}
                      >
                        <p className="font-semibold">{v.name}</p>
                        <p className="text-[11px] text-stone-500 mt-0.5">
                          {v.priceOffset === 0 ? 'Included' : `+$${v.priceOffset}`}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 1: Base Ingredient */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-stone-800 uppercase tracking-wider flex items-center justify-between">
                  <span>2. Choose {config.baseLabel}</span>
                  <span className="text-[#485E42] text-[11px] normal-case font-medium">
                    {currentBase.origin}
                  </span>
                </label>
                <div className="space-y-2">
                  {config.baseOptions.map((base) => {
                    const isSelected = selectedBaseId === base.id;
                    return (
                      <button
                        key={base.id}
                        type="button"
                        onClick={() => setSelectedBaseId(base.id)}
                        className={`w-full p-3 rounded-xl border text-left transition-all flex items-start justify-between ${
                          isSelected
                            ? 'border-[#485E42] bg-[#F6F4ED] shadow-sm ring-1 ring-[#485E42]'
                            : 'border-[#EDE7DC] bg-white hover:border-[#DCD2C3]'
                        }`}
                      >
                        <div className="pr-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-[#212E20]">{base.name}</span>
                            {base.priceOffset > 0 && (
                              <span className="text-[10px] text-[#86672E] font-medium bg-[#F7F2E7] px-1.5 py-0.5 rounded">
                                +${base.priceOffset}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-stone-500 mt-0.5 leading-relaxed">
                            {base.description}
                          </p>
                        </div>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected ? 'bg-[#485E42] border-[#485E42] text-white' : 'border-stone-300'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Botanical Active Boosters */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-stone-800 uppercase tracking-wider">
                    3. {config.boostersLabel}
                  </label>
                  <span className="text-[11px] text-stone-500">
                    Selected: {selectedBoosterIds.length} of {config.maxBoosters} max
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {config.boosterOptions.map((booster) => {
                    const isSelected = selectedBoosterIds.includes(booster.id);
                    return (
                      <button
                        key={booster.id}
                        type="button"
                        onClick={() => toggleBooster(booster.id)}
                        className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'border-[#485E42] bg-[#F6F4ED] shadow-sm ring-1 ring-[#485E42]'
                            : 'border-[#EDE7DC] bg-white hover:border-[#DCD2C3]'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <h5 className="text-xs font-semibold text-[#212E20] line-clamp-1">{booster.name}</h5>
                            <span className="text-[10px] font-bold text-[#86672E] shrink-0 ml-1">
                              +${booster.priceOffset}
                            </span>
                          </div>
                          <p className="text-[10px] text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                            {booster.description}
                          </p>
                        </div>
                        <div className="mt-2 pt-2 border-t border-[#F2ECE1] flex items-center justify-between text-[10px]">
                          <span className="text-stone-400">{booster.origin}</span>
                          <span className={`font-semibold ${isSelected ? 'text-[#485E42]' : 'text-stone-500'}`}>
                            {isSelected ? '✓ Selected' : '+ Add'}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Natural Aromatic Profile */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-stone-800 uppercase tracking-wider flex items-center justify-between">
                  <span>4. {config.scentsLabel}</span>
                  <span className="text-stone-400 normal-case font-normal text-[11px]">100% steam-distilled</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {config.scentOptions.map((scent) => {
                    const isSelected = selectedScentId === scent.id;
                    return (
                      <button
                        key={scent.id}
                        type="button"
                        onClick={() => setSelectedScentId(scent.id)}
                        className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                          isSelected
                            ? 'border-[#485E42] bg-[#F6F4ED] ring-1 ring-[#485E42] text-[#212E20]'
                            : 'border-[#EDE7DC] bg-white hover:border-[#DCD2C3] text-stone-600'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold line-clamp-1">{scent.name}</span>
                          {scent.priceOffset > 0 && (
                            <span className="text-[10px] text-[#86672E] font-medium">+${scent.priceOffset}</span>
                          )}
                        </div>
                        <p className="text-[10px] text-stone-500 mt-1 line-clamp-2">
                          {scent.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 4: Custom Label Engraving */}
              {config.allowLabelEngraving && (
                <div className="space-y-1.5 bg-[#F6F4ED] p-3.5 rounded-xl border border-[#EDE7DC]">
                  <label className="text-xs font-semibold text-[#212E20] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#B39055]" />
                    <span>Personalized Label Inscription (Complimentary)</span>
                  </label>
                  <p className="text-[11px] text-stone-500">
                    Hand-printed on your apothecary amber vessel (e.g. &ldquo;Elena&rsquo;s Radiant Oil&rdquo;)
                  </p>
                  <input
                    type="text"
                    maxLength={32}
                    value={customLabel}
                    onChange={(e) => setCustomLabel(e.target.value)}
                    placeholder="Enter recipient name or ritual note..."
                    className="w-full mt-1 px-3 py-2 bg-white border border-[#DACFBF] rounded-lg text-xs text-stone-800 focus:outline-none focus:border-[#485E42]"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Action Footer */}
          <div className="mt-8 pt-4 border-t border-[#EDE7DC] flex items-center justify-between gap-4">
            {/* Quantity */}
            <div className="flex items-center border border-[#DACFBF] rounded-lg overflow-hidden bg-white">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 hover:bg-stone-100 text-stone-600 font-bold"
              >
                -
              </button>
              <span className="px-3 text-xs font-semibold tabular-nums text-stone-800">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 hover:bg-stone-100 text-stone-600 font-bold"
              >
                +
              </button>
            </div>

            {/* Add to Bag Button */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 py-3.5 px-6 bg-[#212E20] hover:bg-[#344633] text-white text-xs font-semibold uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
            >
              <Sparkles className="w-4 h-4 text-[#C4A962]" />
              <span>Add Custom Blend to Bag · ${totalPrice.toFixed(2)}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
