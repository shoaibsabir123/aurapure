import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  User as UserIcon, 
  Menu, 
  X, 
  Sparkles, 
  ShieldCheck, 
  Compass, 
  Leaf, 
  ChevronDown 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setCurrentView, onOpenSearch }) => {
  const { cart, setIsCartOpen, wishlist, currentUser, isAdmin, simulateAdminToggle, signOut } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleNav = (view: string) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-[#EAE3D6] transition-all">
      {/* Promotional Bar */}
      {!announcementDismissed && (
        <div className="bg-[#2D3A29] text-[#EFE9DF] text-xs px-4 py-2 flex items-center justify-between tracking-wide font-medium">
          <div className="mx-auto flex items-center gap-2 text-center">
            <Sparkles className="w-3.5 h-3.5 text-[#C4A962] shrink-0" />
            <span>
              Complimentary Carbon-Neutral Worldwide Shipping on Orders Over $75 · Code <strong className="text-[#C4A962]">WELCOME15</strong> for 15% Off
            </span>
          </div>
          <button 
            onClick={() => setAnnouncementDismissed(true)} 
            className="text-stone-400 hover:text-white p-1 ml-2 text-xs"
            aria-label="Dismiss banner"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Navigation Row - 3-Zone Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2.5 text-left focus:outline-none group"
          >
            <div className="w-8 h-8 rounded-full bg-[#485E42] text-white flex items-center justify-center shadow-sm group-hover:bg-[#3B4D36] transition-colors">
              <Leaf className="w-4 h-4 text-[#E2D4B7]" />
            </div>
            <span className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[#212E20]">
              Aura Pure
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation Links (4-6 links) */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#465343]">
          <button
            onClick={() => handleNav('shop')}
            className={`transition-colors hover:text-[#212E20] ${
              currentView === 'shop' ? 'text-[#212E20] font-semibold border-b-2 border-[#485E42] pb-0.5' : ''
            }`}
          >
            Shop All
          </button>
          <button
            onClick={() => handleNav('custom-lab')}
            className={`flex items-center gap-1.5 transition-colors hover:text-[#212E20] ${
              currentView === 'custom-lab' ? 'text-[#212E20] font-semibold border-b-2 border-[#485E42] pb-0.5' : ''
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B39055]" />
            <span>Custom Lab</span>
          </button>
          <button
            onClick={() => handleNav('origins')}
            className={`transition-colors hover:text-[#212E20] ${
              currentView === 'origins' ? 'text-[#212E20] font-semibold border-b-2 border-[#485E42] pb-0.5' : ''
            }`}
          >
            Origins & Sourcing
          </button>
          <button
            onClick={() => handleNav('blog')}
            className={`transition-colors hover:text-[#212E20] ${
              currentView === 'blog' ? 'text-[#212E20] font-semibold border-b-2 border-[#485E42] pb-0.5' : ''
            }`}
          >
            Journal
          </button>
          <button
            onClick={() => handleNav('about')}
            className={`transition-colors hover:text-[#212E20] ${
              currentView === 'about' ? 'text-[#212E20] font-semibold border-b-2 border-[#485E42] pb-0.5' : ''
            }`}
          >
            Our Philosophy
          </button>
        </nav>

        {/* Zone 3: Primary Actions (Search, Wishlist, Bag, Account/Admin) */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="p-2 text-[#465343] hover:text-[#212E20] transition-colors rounded-full hover:bg-[#F2ECE1]"
            aria-label="Search catalog"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Wishlist Button */}
          <button
            onClick={() => handleNav('wishlist')}
            className="p-2 text-[#465343] hover:text-[#212E20] transition-colors rounded-full hover:bg-[#F2ECE1] relative"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#B39055] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Shopping Bag Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 px-3 py-2 bg-[#2D3A29] text-[#FBF9F5] rounded-full hover:bg-[#202A1D] transition-colors shadow-sm text-xs font-medium"
            aria-label="Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="tabular-nums font-semibold">{cartItemsCount}</span>
          </button>

          {/* Account & Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
              className="flex items-center gap-1.5 p-2 text-[#465343] hover:text-[#212E20] transition-colors rounded-full hover:bg-[#F2ECE1]"
              aria-label="Account Menu"
            >
              <UserIcon className="w-5 h-5" />
              <ChevronDown className="w-3 h-3 hidden sm:block opacity-60" />
            </button>

            {accountDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-[#EAE3D6] py-2 z-50 text-sm animate-in fade-in slide-in-from-top-2"
                onMouseLeave={() => setAccountDropdownOpen(false)}
              >
                <div className="px-4 py-2 border-b border-[#F2ECE1]">
                  <p className="text-xs text-stone-500 font-medium">Account Status</p>
                  <p className="font-medium text-[#212E20] truncate">
                    {currentUser?.email || (isAdmin ? 'Admin Mode (Active)' : 'Guest Customer')}
                  </p>
                </div>

                <button
                  onClick={() => {
                    handleNav('account');
                    setAccountDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-[#FAF7F2] text-[#333E31] transition-colors flex items-center gap-2"
                >
                  <UserIcon className="w-4 h-4 text-stone-400" />
                  <span>My Account & Orders</span>
                </button>

                <button
                  onClick={() => {
                    handleNav('admin');
                    setAccountDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-[#FAF7F2] text-[#333E31] transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#485E42]" />
                    <span>Admin Dashboard</span>
                  </div>
                  {isAdmin && (
                    <span className="text-[10px] bg-[#E8EFE5] text-[#2F442A] px-1.5 py-0.5 rounded font-semibold">
                      Live
                    </span>
                  )}
                </button>

                <div className="border-t border-[#F2ECE1] my-1 pt-1">
                  <button
                    onClick={() => {
                      simulateAdminToggle();
                      setAccountDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-[#FAF7F2] text-xs text-[#70562D] font-medium"
                  >
                    {isAdmin ? '⇄ Switch to Customer View' : '⇄ Switch to Admin Mode'}
                  </button>
                  {currentUser && (
                    <button
                      onClick={() => {
                        signOut();
                        setAccountDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-1.5 hover:bg-[#FAF7F2] text-xs text-stone-500 hover:text-red-700"
                    >
                      Sign Out
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#465343] hover:text-[#212E20] lg:hidden rounded-lg hover:bg-[#F2ECE1]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FBF9F5] border-b border-[#EAE3D6] px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2 text-base font-medium text-[#465343]">
            <button
              onClick={() => handleNav('shop')}
              className="text-left py-2 px-3 rounded-md hover:bg-[#F2ECE1]"
            >
              Shop All Products
            </button>
            <button
              onClick={() => handleNav('custom-lab')}
              className="text-left py-2 px-3 rounded-md hover:bg-[#F2ECE1] flex items-center gap-2 text-[#212E20] font-semibold"
            >
              <Sparkles className="w-4 h-4 text-[#B39055]" />
              <span>Custom Formulation Lab</span>
            </button>
            <button
              onClick={() => handleNav('origins')}
              className="text-left py-2 px-3 rounded-md hover:bg-[#F2ECE1] flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-stone-400" />
              <span>Origins & Sourcing</span>
            </button>
            <button
              onClick={() => handleNav('blog')}
              className="text-left py-2 px-3 rounded-md hover:bg-[#F2ECE1]"
            >
              Editorial Journal
            </button>
            <button
              onClick={() => handleNav('about')}
              className="text-left py-2 px-3 rounded-md hover:bg-[#F2ECE1]"
            >
              Our Philosophy
            </button>
            <button
              onClick={() => handleNav('account')}
              className="text-left py-2 px-3 rounded-md hover:bg-[#F2ECE1]"
            >
              My Account & Order Tracking
            </button>
            <button
              onClick={() => handleNav('admin')}
              className="text-left py-2 px-3 rounded-md hover:bg-[#F2ECE1] text-[#485E42] font-semibold flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Management</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
