import React, { useState } from 'react';
import { 
  Leaf, 
  Globe, 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  MapPin, 
  Mail, 
  CheckCircle2, 
  Send 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AboutPage: React.FC = () => {
  const { showToast } = useStore();
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [sentMessage, setSentMessage] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) {
      showToast('Please complete all contact form fields.');
      return;
    }
    setSentMessage(true);
    showToast('Your message has reached our botanical concierge. We will respond within 24 hours.');
  };

  const cooperatives = [
    { country: 'Pakistan', cooperative: 'Khewra Halite & Hunza Apricot Collective', artisans: 'Karakoram & Salt Range Artisans' },
    { country: 'Morocco', cooperative: 'Souss Valley Argan & Jojoba Union', artisans: '64 Women Harvesters' },
    { country: 'Japan', cooperative: 'Uji Hillside Organic Tea Guild', artisans: '4th Generation Masters' },
    { country: 'France', cooperative: 'Valensole High-Altitude Lavender Guild', artisans: 'Generational Distillers' },
    { country: 'India', cooperative: 'Pampore Saffron & Sandalwood Guild', artisans: 'Fair-Trade Artisans' },
    { country: 'Ghana', cooperative: 'Tamale Pagba Wild Shea Cooperative', artisans: '120 Women Processors' },
    { country: 'Mexico', cooperative: 'San Bartolo Coyotepec Ceramic Collective', artisans: 'Zapotec Master Potters' },
    { country: 'Portugal', cooperative: 'Alentejo Montado Regenerative Foresters', artisans: 'Generational Strippers' },
    { country: 'Italy', cooperative: 'Tuscan Biodynamic Olive Estates', artisans: 'Cold-Press Pioneers' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      
      {/* Hero Manifesto */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold text-[#485E42] uppercase tracking-widest flex items-center justify-center gap-1.5">
          <Leaf className="w-3.5 h-3.5" />
          <span>Our Ethical Foundation</span>
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-medium text-[#212E20] leading-tight">
          Born from the Earth. <br />
          <span className="italic font-normal text-[#485E42]">Curated for Conscious Living.</span>
        </h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
          Aura Pure was founded on a singular conviction: the earth provides everything the skin and soul need to flourish. By bridging generational botanical wisdom from remote corners of the globe with modern lipid biochemistry, we bring pure ritual into daily life.
        </p>
      </div>

      {/* Hero Image Showcase */}
      <div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-md bg-[#F3ECE0] border border-[#E8DFD0]">
        <img
          src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1600&q=85"
          alt="Natural Botanicals & Sustainable Craftsmanship"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-8 sm:p-12 text-white">
          <div className="max-w-xl space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#C4A962]">Direct Artisan Trade</p>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium">Every harvest sustains generational craft</h3>
          </div>
        </div>
      </div>

      {/* 4 Brand Pillars Detailed */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-[#FAF8F5] rounded-2xl border border-[#EDE7DC] space-y-3">
          <div className="w-10 h-10 rounded-full bg-[#EAE2D2] flex items-center justify-center text-[#485E42]">
            <Leaf className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-semibold text-[#212E20]">Pure Formulation</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Zero cheap fillers, silicones, synthetic fragrances, or water-diluted bases. Every ingredient fulfills a biological and restorative purpose.
          </p>
        </div>

        <div className="p-6 bg-[#FAF8F5] rounded-2xl border border-[#EDE7DC] space-y-3">
          <div className="w-10 h-10 rounded-full bg-[#EAE2D2] flex items-center justify-center text-[#485E42]">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-semibold text-[#212E20]">Bespoke Personalization</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            We believe your skincare should be as individual as your fingerprint. Customize base lipids, bio-active boosters, and aromas in real time.
          </p>
        </div>

        <div className="p-6 bg-[#FAF8F5] rounded-2xl border border-[#EDE7DC] space-y-3">
          <div className="w-10 h-10 rounded-full bg-[#EAE2D2] flex items-center justify-center text-[#485E42]">
            <Globe className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-semibold text-[#212E20]">Direct Fair Trade</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            We bypass commodity brokers to contract directly with family estates and women-led cooperatives, paying up to 250% of market rates.
          </p>
        </div>

        <div className="p-6 bg-[#FAF8F5] rounded-2xl border border-[#EDE7DC] space-y-3">
          <div className="w-10 h-10 rounded-full bg-[#EAE2D2] flex items-center justify-center text-[#485E42]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-semibold text-[#212E20]">Zero-Waste Loop</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Infinitely recyclable pharmaceutical amber glass, regenerative cork closures, and garden-compostable mycelium packing mailers.
          </p>
        </div>
      </div>

      {/* Global Cooperatives Directory */}
      <div className="bg-[#FAF8F5] p-8 sm:p-12 rounded-2xl border border-[#EDE7DC] space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="font-serif text-3xl font-medium text-[#212E20]">
            Global Sourcing Cooperatives
          </h2>
          <p className="text-xs text-stone-600">
            A transparent window into the hands that plant, tend, and harvest our raw botanical ingredients.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cooperatives.map((c) => (
            <div key={c.country} className="p-4 bg-white rounded-xl border border-[#EAE3D6] space-y-1 text-left">
              <span className="text-[10px] text-[#485E42] font-semibold uppercase tracking-wider">{c.country}</span>
              <h4 className="font-serif text-base font-semibold text-[#212E20]">{c.cooperative}</h4>
              <p className="text-xs text-stone-500">{c.artisans}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Concierge Form */}
      <div className="max-w-2xl mx-auto bg-white p-8 sm:p-10 rounded-2xl border border-[#EDE7DC] shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-semibold text-[#485E42] uppercase tracking-widest flex items-center justify-center gap-1.5">
            <Mail className="w-3.5 h-3.5" />
            <span>Connect with Us</span>
          </span>
          <h3 className="font-serif text-2xl font-medium text-[#212E20]">
            Botanical Concierge & Inquiry
          </h3>
          <p className="text-xs text-stone-500">
            Have questions regarding formulation compatibility, ingredient sourcing, or bespoke wholesale?
          </p>
        </div>

        {sentMessage ? (
          <div className="p-6 bg-[#F4EFE6] rounded-xl border border-[#DACFBF] text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-[#485E42] mx-auto" />
            <h4 className="font-serif text-lg font-semibold text-[#212E20]">Message Received</h4>
            <p className="text-xs text-stone-600">Our resident herbalist will be in touch with you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">Your Name</label>
              <input
                type="text"
                required
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Elena Vance"
                className="w-full px-3.5 py-2.5 border border-[#DACFBF] rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">Email Address</label>
              <input
                type="email"
                required
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="elena@example.com"
                className="w-full px-3.5 py-2.5 border border-[#DACFBF] rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">Message or Formulation Question</label>
              <textarea
                required
                rows={4}
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                placeholder="Ask about specific botanical benefits or bespoke recommendations..."
                className="w-full px-3.5 py-2.5 border border-[#DACFBF] rounded-lg text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#212E20] hover:bg-[#344633] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Message to Apothecary</span>
            </button>
          </form>
        )}
      </div>

    </div>
  );
};
