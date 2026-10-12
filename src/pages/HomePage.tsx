import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Leaf, 
  ShieldCheck, 
  Heart, 
  Globe, 
  CheckCircle2, 
  Star, 
  Compass, 
  ChevronRight,
  Eye
} from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';

interface HomePageProps {
  onSelectProduct: (product: Product) => void;
  onCustomizeProduct: (product: Product) => void;
  onNavigate: (view: string, filter?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ 
  onSelectProduct, 
  onCustomizeProduct, 
  onNavigate 
}) => {
  const { products, reviews } = useStore();
  const [selectedIngredientIndex, setSelectedIngredientIndex] = useState(0);

  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);
  const bestsellers = products.filter((p) => p.bestseller).slice(0, 4);

  const natureIngredients = [
    {
      name: 'Organic Jojoba Oil',
      botanical: 'Simmondsia Chinensis',
      origin: 'Souss Valley, Morocco',
      benefit: 'Balances sebum and deeply locks hydration without ever congesting pores.',
      image: 'https://images.unsplash.com/photo-1608248597359-0524458f4a13?auto=format&fit=crop&w=600&q=80',
      productLink: 'organic-structure-oil'
    },
    {
      name: 'Wild Rosehip Seed',
      botanical: 'Rosa Canina',
      origin: 'Andean Foothills, Chile',
      benefit: 'Packed with trans-retinoic acid and provitamin A to brighten and regenerate tissue.',
      image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80',
      productLink: 'organic-structure-oil'
    },
    {
      name: 'Ceremonial First-Flush Matcha',
      botanical: 'Camellia Sinensis',
      origin: 'Uji, Kyoto, Japan',
      benefit: 'Detoxifies and neutralizes free radicals with 137x more EGCG than standard green tea.',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
      productLink: 'organic-clay-face-mask'
    },
    {
      name: 'Ultra-Fine White Kaolin Clay',
      botanical: 'Hydrated Aluminium Silicate',
      origin: 'Brittany Coast, France',
      benefit: 'Silky mineral clay that gently draws out deep impurities while refining pore clarity.',
      image: 'https://images.unsplash.com/photo-1567928815117-640a34b29b6f?auto=format&fit=crop&w=600&q=80',
      productLink: 'organic-clay-face-mask'
    },
    {
      name: 'High-Altitude True Lavender',
      botanical: 'Lavandula Angustifolia',
      origin: 'Plateau de Valensole, France',
      benefit: 'Steam-distilled volatile linalool that soothes the nervous system for regenerative sleep.',
      image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&q=80',
      productLink: 'provence-botanical-pillow-mist'
    },
    {
      name: 'Ancient Himalayan Pink Halite',
      botanical: 'Mineral Halite Crystal',
      origin: 'Khewra Salt Range, Pakistan',
      benefit: '84 bio-available trace minerals that stimulate lymphatic micro-circulation and remineralize tissue.',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
      productLink: 'pakistan-himalayan-pink-salt-polish'
    },
    {
      name: 'Hunza Glacial Wild Apricot Oil',
      botanical: 'Prunus Armeniaca',
      origin: 'Hunza Valley, Gilgit-Baltistan, Pakistan',
      benefit: 'Karakoram mountain youth nectar rich in provitamin A and essential oleic fatty acids.',
      image: 'https://images.unsplash.com/photo-1608248597359-0524458f4a13?auto=format&fit=crop&w=600&q=80',
      productLink: 'hunza-wild-apricot-elixir'
    }
  ];

  const countries = [
    { name: 'Pakistan', region: 'Khewra & Hunza Valley', specialty: 'Ancient Himalayan Pink Halite & Wild Apricot' },
    { name: 'Japan', region: 'Kyoto & Uji', specialty: 'Ceremonial Matcha & Minerals' },
    { name: 'Morocco', region: 'Souss Valley & Atlas', specialty: 'Cold-Pressed Golden Jojoba & Argan' },
    { name: 'France', region: 'Valensole & Brittany', specialty: 'True Lavender & White Kaolin' },
    { name: 'India', region: 'Kashmir & Karnataka', specialty: 'Mongra Saffron & Sandalwood' },
    { name: 'Italy', region: 'Tuscany & Calabria', specialty: 'Biodynamic Olive & Bergamot' },
    { name: 'Ghana', region: 'Northern Savanna', specialty: 'Wild Baobab & Raw Shea' },
    { name: 'Mexico', region: 'Oaxaca Valley', specialty: 'Hand-Burnished Smoked Terracotta' },
    { name: 'Portugal', region: 'Alentejo Montado', specialty: 'Regenerative Cork & Stoneware' }
  ];

  return (
    <div className="space-y-20 sm:space-y-28">
      
      {/* 1. HERO SECTION (Directly inspired by organic.jpg) */}
      <section className="relative bg-[#F5EFE6] border-b border-[#E8DFD0] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Hero Typography */}
            <div className="lg:col-span-6 space-y-6 text-left">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8E0D0] text-[#485E42] text-xs font-semibold tracking-wider uppercase">
                <Leaf className="w-3.5 h-3.5 text-[#B39055]" />
                <span>Global Botanicals · Pure Formula</span>
              </div>

              <div className="space-y-2">
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#1F271E] leading-[1.12]">
                  Clean Beauty. <br />
                  <span className="italic font-normal text-[#485E42]">Organic Skincare.</span>
                </h1>
                <p className="font-serif text-xl sm:text-2xl text-[#675432] font-normal tracking-wide">
                  Pure Ingredients. Radiant You.
                </p>
              </div>

              <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-xl">
                Nourishing skincare and handcrafted lifestyle artifacts sourced directly from organic family cooperatives in Japan, Morocco, France, and beyond. Customize your personal formulation with active botanicals.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => onNavigate('shop')}
                  className="px-8 py-4 bg-[#212E20] hover:bg-[#344633] text-white text-xs font-semibold uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
                >
                  <span>Shop Collections</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('custom-lab')}
                  className="px-8 py-4 bg-white/80 hover:bg-white text-[#212E20] border border-[#DACFBF] text-xs font-semibold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Sparkles className="w-4 h-4 text-[#B39055]" />
                  <span>Custom Formulation Lab</span>
                </button>
              </div>

              {/* Trust Badge Trio */}
              <div className="pt-6 border-t border-[#E5DAC8] grid grid-cols-3 gap-4 text-left">
                <div>
                  <p className="font-serif text-lg font-bold text-[#212E20]">100%</p>
                  <p className="text-[11px] text-stone-500">Bio-Active Natural</p>
                </div>
                <div>
                  <p className="font-serif text-lg font-bold text-[#212E20]">9 Countries</p>
                  <p className="text-[11px] text-stone-500">Ethical Cooperatives</p>
                </div>
                <div>
                  <p className="font-serif text-lg font-bold text-[#212E20]">Bespoke</p>
                  <p className="text-[11px] text-stone-500">Formulated on Order</p>
                </div>
              </div>

            </div>

            {/* Right Hero Image Card (Aesthetic Studio Still Life) */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl overflow-hidden shadow-xl border border-[#DFD5C4] bg-[#FAF8F5]">
                <img
                  src="https://images.unsplash.com/photo-1608248597359-0524458f4a13?auto=format&fit=crop&w=1200&q=85"
                  alt="Aura Pure Organic Skincare Still Life"
                  referrerPolicy="no-referrer"
                  className="w-full aspect-[4/3] object-cover object-center"
                />

                {/* Floating Aesthetic Card 1: Organic Structure Oil */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-[#EAE3D6] shadow-lg max-w-[190px] text-left">
                  <div className="flex items-center gap-1 text-[10px] text-[#556950] font-semibold uppercase tracking-wider">
                    <Sparkles className="w-3 h-3 text-[#B39055]" />
                    <span>Signature Elixir</span>
                  </div>
                  <h4 className="font-serif text-sm font-semibold text-[#212E20] mt-0.5">Organic Structure Oil</h4>
                  <p className="text-[10px] text-stone-500 mt-0.5">Jojoba + Rosehip + Vitamin E</p>
                  <p className="text-xs font-bold text-[#212E20] mt-1 tabular-nums">$68.00</p>
                </div>

                {/* Floating Aesthetic Card 2: Clean Formula Seal */}
                <div className="absolute bottom-4 left-4 bg-[#233121]/90 backdrop-blur-md p-3 rounded-xl border border-[#3E523A] shadow-lg text-white max-w-[210px] text-left">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-[#C4A962]">Clean Promise</p>
                  <p className="text-xs font-serif font-medium mt-0.5 text-stone-100">Cold-Pressed · Non-Toxic · Cruelty Free</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 4 Brand Pillars Bar (Directly from organic.jpg) */}
        <div className="bg-[#FAF8F5] border-t border-[#E8DFD0] py-6 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            
            <div className="flex flex-col items-center space-y-1">
              <div className="w-8 h-8 rounded-full bg-[#EAE2D2] flex items-center justify-center text-[#485E42]">
                <Leaf className="w-4 h-4" />
              </div>
              <span className="font-serif text-sm font-semibold text-[#212E20] uppercase tracking-wider">Clean</span>
              <span className="text-[11px] text-stone-500">100% Organic Ingredients</span>
            </div>

            <div className="flex flex-col items-center space-y-1">
              <div className="w-8 h-8 rounded-full bg-[#EAE2D2] flex items-center justify-center text-[#485E42]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="font-serif text-sm font-semibold text-[#212E20] uppercase tracking-wider">Safe</span>
              <span className="text-[11px] text-stone-500">No Harsh Chemicals</span>
            </div>

            <div className="flex flex-col items-center space-y-1">
              <div className="w-8 h-8 rounded-full bg-[#EAE2D2] flex items-center justify-center text-[#485E42]">
                <Heart className="w-4 h-4" />
              </div>
              <span className="font-serif text-sm font-semibold text-[#212E20] uppercase tracking-wider">Kind</span>
              <span className="text-[11px] text-stone-500">Cruelty-Free & Vegan</span>
            </div>

            <div className="flex flex-col items-center space-y-1">
              <div className="w-8 h-8 rounded-full bg-[#EAE2D2] flex items-center justify-center text-[#485E42]">
                <Globe className="w-4 h-4" />
              </div>
              <span className="font-serif text-sm font-semibold text-[#212E20] uppercase tracking-wider">Sustainable</span>
              <span className="text-[11px] text-stone-500">Good for You & the Planet</span>
            </div>

          </div>
        </div>
      </section>


      {/* 2. FEATURED BESTSELLERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#EAE3D6] gap-4">
          <div>
            <span className="text-xs font-semibold text-[#485E42] uppercase tracking-widest">
              Curated Catalog
            </span>
            <h2 className="font-serif text-3xl font-medium text-[#212E20] mt-1">
              Featured Global Formulations
            </h2>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            className="text-xs font-semibold uppercase tracking-wider text-[#485E42] hover:text-[#212E20] flex items-center gap-1 transition-colors self-start md:self-auto"
          >
            <span>View All {products.length} Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onCustomize={onCustomizeProduct}
            />
          ))}
        </div>
      </section>


      {/* 3. "POWERED BY NATURE" INGREDIENT SPOTLIGHT (Inspired by organic.jpg) */}
      <section className="bg-[#F4EFE6] border-y border-[#E8DFD0] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-semibold text-[#485E42] uppercase tracking-widest flex items-center justify-center gap-1.5">
              <Leaf className="w-3.5 h-3.5" />
              <span>Bio-Active Transparency</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#212E20]">
              Powered by Nature
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Every drop and powder is verified for purity and origin. Explore the active botanical agents that define our clean restorative formulas.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Ingredients Selector List */}
            <div className="lg:col-span-5 space-y-2.5">
              {natureIngredients.map((item, idx) => {
                const isActive = selectedIngredientIndex === idx;
                return (
                  <button
                    key={item.name}
                    onClick={() => setSelectedIngredientIndex(idx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-4 ${
                      isActive
                        ? 'bg-white border-[#485E42] shadow-md ring-1 ring-[#485E42]'
                        : 'bg-[#FAF8F5] border-[#E8DFD0] hover:bg-white hover:border-[#D5C9B8]'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-[#E8E0D2]">
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-serif text-base font-semibold text-[#212E20] truncate">
                          {item.name}
                        </h4>
                        <span className="text-[10px] text-stone-400 font-mono shrink-0 ml-2">
                          0{idx + 1}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#5A6E55] italic truncate">{item.botanical}</p>
                      <p className="text-xs text-stone-600 mt-1 line-clamp-1">
                        {item.benefit}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Ingredient Spotlight Hero Box */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E5DAC8] p-6 sm:p-8 shadow-sm flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:w-1/2 aspect-square rounded-xl overflow-hidden bg-[#F3ECE0] shadow-inner">
                <img
                  src={natureIngredients[selectedIngredientIndex].image}
                  alt={natureIngredients[selectedIngredientIndex].name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-full md:w-1/2 space-y-4 text-left">
                <div className="inline-flex items-center gap-1.5 text-xs text-[#485E42] font-semibold uppercase tracking-wider">
                  <Compass className="w-3.5 h-3.5" />
                  <span>{natureIngredients[selectedIngredientIndex].origin}</span>
                </div>

                <div>
                  <h3 className="font-serif text-2xl font-medium text-[#212E20]">
                    {natureIngredients[selectedIngredientIndex].name}
                  </h3>
                  <p className="font-mono text-xs text-stone-500 italic mt-0.5">
                    {natureIngredients[selectedIngredientIndex].botanical}
                  </p>
                </div>

                <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#EDE7DC]">
                  <p className="text-xs font-semibold text-[#212E20] uppercase tracking-wider mb-1">
                    Physiological Action:
                  </p>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {natureIngredients[selectedIngredientIndex].benefit}
                  </p>
                </div>

                <button
                  onClick={() => {
                    const match = products.find(p => p.id === natureIngredients[selectedIngredientIndex].productLink);
                    if (match) onSelectProduct(match);
                  }}
                  className="w-full py-2.5 px-4 bg-[#212E20] hover:bg-[#344633] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Explore Formula Containing This Botanical</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* 4. BESPOKE CUSTOMIZATION LAB TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#2D3A29] rounded-2xl overflow-hidden shadow-xl text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 sm:p-12 lg:p-16 items-center">
            
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3D4D39] text-[#C4A962] text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Custom Lab Experience</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#F7F4EE] leading-tight">
                Bespoke Skincare Alchemy. <br />
                <span className="italic text-[#C4A962]">Compounded Just for You.</span>
              </h2>

              <p className="text-sm text-stone-300 leading-relaxed max-w-lg">
                Your skin barrier is unique. Select your foundational organic carrier oil, add concentrated active boosters like Moroccan Blue Tansy or Himalayan Sea Buckthorn, choose steam-distilled aromatic notes, and have your personalized bottle hand-inscribed.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C4A962] shrink-0" />
                  <span>Choose Base Lipids</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C4A962] shrink-0" />
                  <span>Targeted Boosters</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C4A962] shrink-0" />
                  <span>Custom Inscribed Label</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => onNavigate('custom-lab')}
                  className="px-8 py-3.5 bg-[#C4A962] hover:bg-[#B39650] text-[#1C251B] text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Enter the Formulation Atelier</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="aspect-square rounded-xl overflow-hidden bg-[#222C1F] border border-[#40523C] p-4 flex flex-col justify-between">
                <img
                  src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80"
                  alt="Custom compounding dropper bottle"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 5. DISCOVER PRODUCTS FROM AROUND THE WORLD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-semibold text-[#485E42] uppercase tracking-widest flex items-center justify-center gap-1.5">
            <Compass className="w-3.5 h-3.5" />
            <span>Ethical Provenance</span>
          </span>
          <h2 className="font-serif text-3xl font-medium text-[#212E20]">
            The Aura Pure Atlas
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Click on any country of origin to explore direct artisan partnerships and authentic local harvests.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {countries.map((c) => (
            <button
              key={c.name}
              onClick={() => onNavigate('shop', c.name)}
              className="group p-5 bg-[#FAF8F5] hover:bg-white rounded-xl border border-[#EAE3D6] hover:border-[#485E42] hover:shadow-md transition-all text-left flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-semibold text-[#485E42] group-hover:text-[#2E412A] uppercase tracking-wider">
                  {c.region}
                </span>
                <h4 className="font-serif text-xl font-medium text-[#212E20] mt-0.5">
                  {c.name}
                </h4>
                <p className="text-xs text-stone-500 mt-2 line-clamp-2">
                  {c.specialty}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#F2ECE1] flex items-center justify-between text-xs text-stone-400 group-hover:text-[#212E20]">
                <span>Discover</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </section>


      {/* 6. VERIFIED CUSTOMER REVIEWS */}
      <section className="bg-[#FAF8F5] border-y border-[#EAE3D6] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#EAE3D6] gap-4">
            <div>
              <span className="text-xs font-semibold text-[#485E42] uppercase tracking-widest">
                Client Testimonials
              </span>
              <h2 className="font-serif text-3xl font-medium text-[#212E20] mt-1">
                Real Skin, Pure Radiance
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs text-stone-600">
              <div className="flex text-[#B39055]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="font-bold tabular-nums">4.9 / 5.0</span>
              <span>across 480+ international reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.slice(0, 3).map((rev) => (
              <div
                key={rev.id}
                className="bg-white p-6 rounded-xl border border-[#EDE7DC] shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex text-[#B39055]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    {rev.verifiedPurchase && (
                      <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                        Verified Order
                      </span>
                    )}
                  </div>
                  <h4 className="font-serif text-base font-semibold text-[#212E20]">
                    &ldquo;{rev.title}&rdquo;
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed italic">
                    {rev.comment}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F2ECE1] flex items-center justify-between text-xs text-stone-500">
                  <span className="font-semibold text-stone-800">{rev.userName}</span>
                  <span>{rev.userCountry}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};
