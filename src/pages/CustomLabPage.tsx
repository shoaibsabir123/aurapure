import React, { useState } from 'react';
import { 
  Sparkles, 
  Leaf, 
  ArrowRight, 
  Check, 
  FlaskConical, 
  Sliders, 
  ShieldCheck, 
  Info 
} from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface CustomLabPageProps {
  onOpenCustomizer: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const CustomLabPage: React.FC<CustomLabPageProps> = ({ onOpenCustomizer, onSelectProduct }) => {
  const { products } = useStore();
  const customizableProducts = products.filter((p) => p.isCustomizable);

  const pillars = [
    {
      title: 'Lipid Architecture',
      desc: 'Choose non-comedogenic carrier bases tailored to your barrier profile, from high-altitude Chilean Rosehip to rare Moroccan Prickly Pear.',
      icon: Leaf
    },
    {
      title: 'Targeted Bio-Actives',
      desc: 'Fortify with cold-pressed boosters like chamazulene-rich Blue Tansy, restorative Sea Buckthorn, or gentle Ayurvedic Bakuchiol.',
      icon: FlaskConical
    },
    {
      title: 'Sensory Alchemy',
      desc: 'Infuse subtle therapeutic steam-distilled notes like Tunisian Neroli and Bergamot, or keep 100% fragrance-free.',
      icon: Sliders
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      
      {/* Editorial Lab Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAE3D4] text-[#485E42] text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#B39055]" />
          <span>The Bespoke Formulation Atelier</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl font-medium text-[#212E20] leading-tight">
          Craft Your Personal Botanical Formula
        </h1>

        <p className="text-sm text-stone-600 leading-relaxed max-w-xl mx-auto">
          Mass-market formulas assume everyone shares identical skin lipids. At Aura Pure, we blend your bespoke facial oil, ceremonial clay mask, or pillow mist fresh upon order using pure organic certified botanicals.
        </p>
      </div>

      {/* 3 Pillars of Formulation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pillars.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="p-6 bg-[#FAF8F5] rounded-2xl border border-[#EDE7DC] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#EAE2D2] flex items-center justify-center text-[#485E42]">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#212E20]">{item.title}</h3>
              <p className="text-xs text-stone-600 leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Customizable Products Matrix */}
      <div className="space-y-8">
        <div className="flex items-center justify-between pb-4 border-b border-[#EAE3D6]">
          <div>
            <h2 className="font-serif text-2xl font-medium text-[#212E20]">
              Formulation Templates Ready for Customization
            </h2>
            <p className="text-xs text-stone-500">
              Select a foundational archetype below to enter the interactive compounding studio
            </p>
          </div>
          <span className="text-xs font-semibold text-[#485E42] uppercase tracking-wider">
            {customizableProducts.length} Formulations Available
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {customizableProducts.map((product) => (
            <div 
              key={product.id}
              className="bg-white rounded-2xl border border-[#EDE7DC] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/3] bg-[#F3ECE0] overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#EAE3CE] text-[#52411F] text-[11px] font-semibold px-2.5 py-1 rounded-md flex items-center gap-1 shadow-sm">
                    <Sparkles className="w-3 h-3 text-[#B39055]" />
                    <span>Customizable</span>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-[#1C251B]/70 backdrop-blur-md text-white text-[11px] px-2 py-0.5 rounded">
                    {product.originCountry}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <span className="text-[10px] text-stone-500 uppercase tracking-wider font-semibold">
                    {product.category}
                  </span>
                  <h3 className="font-serif text-xl font-medium text-[#212E20]">
                    {product.name}
                  </h3>
                  <p className="text-xs text-stone-600 line-clamp-2">
                    {product.subtitle}
                  </p>

                  {/* Highlights */}
                  {product.customizationConfig && (
                    <div className="pt-2 text-xs text-stone-500 space-y-1">
                      <p className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#485E42]" />
                        <span>{product.customizationConfig.baseOptions.length} Base selections</span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#485E42]" />
                        <span>{product.customizationConfig.boosterOptions.length} Bio-Active Boosters</span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#485E42]" />
                        <span>Complimentary label hand-inscription</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-[#F2ECE1] flex items-center justify-between mb-3">
                  <span className="text-xs text-stone-500">Starting from</span>
                  <span className="text-lg font-serif font-bold text-[#212E20] tabular-nums">
                    ${product.salePrice ?? product.price}
                  </span>
                </div>

                <button
                  onClick={() => onOpenCustomizer(product)}
                  className="w-full py-3 bg-[#212E20] hover:bg-[#344633] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#C4A962]" />
                  <span>Customize This Blend</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Atelier Quality Guarantee */}
      <div className="bg-[#FAF8F5] p-8 rounded-2xl border border-[#EDE7DC] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 max-w-xl text-left">
          <h4 className="font-serif text-xl font-medium text-[#212E20]">
            The Apothecary Purity Guarantee
          </h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            Every custom order is recorded in our Master Formulary. Our herbalists compound your formulation under sterile nitrogen atmospheric hoods to preserve cold-pressed nutrients before amber bottle sealing.
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold text-[#485E42] shrink-0">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>Zero Preservatives</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#B39055]" />
            <span>Freshly Compounded</span>
          </div>
        </div>
      </div>

    </div>
  );
};
