/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CustomizerModal } from './components/CustomizerModal';
import { SearchModal } from './components/SearchModal';
import { Toast } from './components/Toast';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CustomLabPage } from './pages/CustomLabPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { AccountPage } from './pages/AccountPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { BlogPage } from './pages/BlogPage';
import { AboutPage } from './pages/AboutPage';
import { Product, ProductVariation } from './types';

const MainAppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [customizingProduct, setCustomizingProduct] = useState<Product | null>(null);
  const [initialCustomVariation, setInitialCustomVariation] = useState<ProductVariation | undefined>(undefined);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState<string>('');
  const [confirmedOrderNumber, setConfirmedOrderNumber] = useState<string>('');
  const [shopCountryFilter, setShopCountryFilter] = useState<string | undefined>(undefined);
  const [shopCategoryFilter, setShopCategoryFilter] = useState<string | undefined>(undefined);

  const navigateTo = (view: string, filter?: string) => {
    if (filter) {
      setShopCountryFilter(filter);
    } else {
      setShopCountryFilter(undefined);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCustomizer = (product: Product, variation?: ProductVariation) => {
    setCustomizingProduct(product);
    setInitialCustomVariation(variation);
  };

  const handleOrderSuccess = (orderId: string, orderNumber: string) => {
    setConfirmedOrderId(orderId);
    setConfirmedOrderNumber(orderNumber);
    setCurrentView('order-confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#242A24]">
      {/* 3-Zone Navigation Header */}
      <Navbar
        currentView={currentView}
        setCurrentView={(view) => navigateTo(view)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomePage
            onSelectProduct={handleSelectProduct}
            onCustomizeProduct={(p) => handleOpenCustomizer(p)}
            onNavigate={(view, filter) => navigateTo(view, filter)}
          />
        )}

        {currentView === 'shop' && (
          <ShopPage
            onSelectProduct={handleSelectProduct}
            onCustomizeProduct={(p) => handleOpenCustomizer(p)}
            initialCountryFilter={shopCountryFilter}
            initialCategoryFilter={shopCategoryFilter}
          />
        )}

        {currentView === 'origins' && (
          <ShopPage
            onSelectProduct={handleSelectProduct}
            onCustomizeProduct={(p) => handleOpenCustomizer(p)}
            initialCountryFilter={shopCountryFilter || 'All'}
          />
        )}

        {currentView === 'product-detail' && selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            onCustomize={(p, v) => handleOpenCustomizer(p, v)}
            onSelectProduct={handleSelectProduct}
            onDirectCheckout={() => navigateTo('checkout')}
            onBackToShop={() => navigateTo('shop')}
          />
        )}

        {currentView === 'custom-lab' && (
          <CustomLabPage
            onOpenCustomizer={(p) => handleOpenCustomizer(p)}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentView === 'checkout' && (
          <CheckoutPage
            onBackToShop={() => navigateTo('shop')}
            onOrderSuccess={handleOrderSuccess}
          />
        )}

        {currentView === 'order-confirmation' && (
          <OrderConfirmationPage
            orderId={confirmedOrderId}
            orderNumber={confirmedOrderNumber}
            onNavigateHome={() => navigateTo('home')}
            onNavigateAccount={() => navigateTo('account')}
          />
        )}

        {currentView === 'account' && (
          <AccountPage
            onSelectProduct={handleSelectProduct}
            onNavigateShop={() => navigateTo('shop')}
          />
        )}

        {currentView === 'wishlist' && (
          <AccountPage
            onSelectProduct={handleSelectProduct}
            onNavigateShop={() => navigateTo('shop')}
          />
        )}

        {currentView === 'admin' && (
          <AdminDashboard />
        )}

        {currentView === 'blog' && (
          <BlogPage />
        )}

        {currentView === 'about' && (
          <AboutPage />
        )}
      </main>

      {/* Global Footer */}
      <Footer setCurrentView={(view) => navigateTo(view)} />

      {/* Modals & Drawers */}
      <CartDrawer
        onCheckout={() => navigateTo('checkout')}
        onExplore={() => navigateTo('shop')}
      />

      {customizingProduct && (
        <CustomizerModal
          product={customizingProduct}
          initialVariation={initialCustomVariation}
          onClose={() => {
            setCustomizingProduct(null);
            setInitialCustomVariation(undefined);
          }}
        />
      )}

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={handleSelectProduct}
      />

      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainAppContent />
    </StoreProvider>
  );
}
