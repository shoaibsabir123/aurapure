import React, { useState } from 'react';
import { Leaf, ArrowRight, Shield, Heart, Globe, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface FooterProps {
  setCurrentView: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentView }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useStore();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address.');
      return;
    }
    setSubscribed(true);
    showToast('Welcome to the Aura Pure circle! Use code WELCOME15 for 15% off.');
  };

  return (
    <footer className="bg-[#1C251B] text-[#D8DFD6] pt-16 pb-12 border-t border-[#293627]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Brand Promises / Badges Bar (Inspired by organic.jpg) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-14 border-b border-[#2C3B2A]">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#293827] flex items-center justify-center shrink-0 text-[#C4A962]">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white tracking-wide uppercase">Organic</h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">Pure cold-pressed botanicals, zero toxic pesticides or synthetics.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#293827] flex items-center justify-center shrink-0 text-[#C4A962]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white tracking-wide uppercase">Safe</h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">No parabens, phthalates, artificial fragrance, or harsh sulfates.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#293827] flex items-center justify-center shrink-0 text-[#C4A962]">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white tracking-wide uppercase">Kind</h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">100% cruelty-free, vegan certified & ethically wild-harvested.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#293827] flex items-center justify-center shrink-0 text-[#C4A962]">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white tracking-wide uppercase">Sustainable</h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">Infinitely recyclable amber glass, Portuguese cork & mycelium mailers.</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-14 border-b border-[#2C3B2A]">
          {/* Col 1 & 2: Brand Manifesto */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#485E42] text-white flex items-center justify-center">
                <Leaf className="w-3.5 h-3.5 text-[#E2D4B7]" />
              </div>
              <span className="font-serif text-2xl font-normal tracking-tight text-white">
                Aura Pure
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Discovering the earth’s most potent bio-active botanicals. Hand-compounded formulas, personalized skincare alchemy, and direct cooperative partnerships spanning Kyoto, the Atlas Mountains, Valensole, and Oaxaca.
            </p>
            <div className="pt-2 text-xs text-[#C4A962] font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pure Ingredients · Radiant You</span>
            </div>
          </div>

          {/* Col 3: Discover */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Discover</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => setCurrentView('shop')} className="hover:text-white transition-colors">
                  All Collections
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('custom-lab')} className="hover:text-white transition-colors">
                  Custom Formulation Lab
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('origins')} className="hover:text-white transition-colors">
                  Origins & Cooperatives
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('shop')} className="hover:text-white transition-colors">
                  Bestsellers
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('blog')} className="hover:text-white transition-colors">
                  Botanical Journal
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Values & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Philosophy</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => setCurrentView('about')} className="hover:text-white transition-colors">
                  Our Origin Story
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('about')} className="hover:text-white transition-colors">
                  Zero-Plastic Packaging
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('account')} className="hover:text-white transition-colors">
                  Track Your Order
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('admin')} className="hover:text-white transition-colors">
                  Admin Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">The Inner Circle</h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Receive seasonal harvest dispatches, bespoke formulation guides, and a 15% introductory code.
            </p>
            {subscribed ? (
              <div className="bg-[#293827] text-[#C4A962] p-3 rounded-lg text-xs font-medium">
                Thank you. Code <strong>WELCOME15</strong> is ready for your first harvest.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-[#263324] border border-[#354532] text-white text-xs px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-[#C4A962] placeholder:text-stone-500"
                    required
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-[#485E42] hover:bg-[#587251] text-white rounded-md flex items-center justify-center transition-colors text-xs"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Aura Pure International. Crafted with natural conscience.</p>
          <div className="flex items-center gap-6">
            <span>Cold-Pressed & Compounded Fresh</span>
            <span>·</span>
            <span>Worldwide Carbon-Neutral</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
