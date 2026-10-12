import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where 
} from 'firebase/firestore';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut as fbSignOut, 
  onAuthStateChanged, 
  User 
} from 'firebase/auth';
import { db, auth, handleFirestoreError, OperationType } from '../firebase';
import { 
  Product, 
  CartItem, 
  Order, 
  BlogPost, 
  ProductReview, 
  Coupon, 
  OrderStatus, 
  CustomizationSelection, 
  ProductVariation,
  ShippingAddress,
  DeliveryMethod
} from '../types';
import { 
  SEED_PRODUCTS, 
  SEED_BLOG_POSTS, 
  SEED_COUPONS, 
  SEED_REVIEWS 
} from '../data/seedData';

interface StoreContextType {
  products: Product[];
  isLoadingProducts: boolean;
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, variation?: ProductVariation, customization?: CustomizationSelection, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  totalAmount: number;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  orders: Order[];
  placeOrder: (
    shippingAddress: ShippingAddress, 
    deliveryMethod: DeliveryMethod, 
    paymentMethod: string, 
    guestEmail?: string,
    guestName?: string
  ) => Promise<{ success: boolean; orderId?: string; orderNumber?: string; error?: string }>;
  updateOrderStatus: (orderId: string, status: OrderStatus, trackingNumber?: string) => Promise<boolean>;
  reviews: ProductReview[];
  addReview: (review: Omit<ProductReview, 'id' | 'createdAt'>) => Promise<boolean>;
  blogPosts: BlogPost[];
  addBlogPost: (post: Omit<BlogPost, 'id' | 'publishedAt'>) => Promise<boolean>;
  deleteBlogPost: (postId: string) => Promise<boolean>;
  coupons: Coupon[];
  addCoupon: (coupon: Coupon) => Promise<boolean>;
  toggleCoupon: (couponId: string) => Promise<boolean>;
  currentUser: User | null;
  isAdmin: boolean;
  signInWithGoogle: () => Promise<void>;
  simulateCustomerLogin: (email: string, name: string) => void;
  simulateAdminToggle: () => void;
  signOut: () => Promise<void>;
  recentlyViewed: string[];
  addRecentlyViewed: (productId: string) => void;
  // Admin product actions
  addProduct: (product: Omit<Product, 'id'>) => Promise<boolean>;
  updateProduct: (productId: string, updates: Partial<Product>) => Promise<boolean>;
  deleteProduct: (productId: string) => Promise<boolean>;
  // Active notification toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(SEED_PRODUCTS);
  const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(true);
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('aurapure_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aurapure_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('aurapure_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [reviews, setReviews] = useState<ProductReview[]>(SEED_REVIEWS);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(SEED_BLOG_POSTS);
  const [coupons, setCoupons] = useState<Coupon[]>(SEED_COUPONS);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [simulatedRole, setSimulatedRole] = useState<'guest' | 'customer' | 'admin'>('guest');
  const [simulatedUser, setSimulatedUser] = useState<{ email: string; name: string } | null>(null);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aurapure_recent');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  // Synchronize Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Determine admin status
  const isAdmin = 
    simulatedRole === 'admin' || 
    currentUser?.email === 'rizwansabirksa1990@gmail.com' ||
    simulatedUser?.email === 'rizwansabirksa1990@gmail.com';

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('aurapure_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Persist wishlist
  useEffect(() => {
    try {
      localStorage.setItem('aurapure_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Persist orders
  useEffect(() => {
    try {
      localStorage.setItem('aurapure_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  // Load or Seed Products from Firestore
  useEffect(() => {
    let isMounted = true;
    async function initCatalog() {
      setIsLoadingProducts(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        if (!querySnapshot.empty) {
          const dbProducts: Product[] = [];
          querySnapshot.forEach((docSnap) => {
            dbProducts.push(docSnap.data() as Product);
          });
          if (isMounted) setProducts(dbProducts);
        } else {
          // Attempt to populate seed products to Firestore
          for (const item of SEED_PRODUCTS) {
            try {
              await setDoc(doc(db, 'products', item.id), item);
            } catch (err) {
              console.warn('Seeding product to Firestore skipped or denied:', err);
            }
          }
          if (isMounted) setProducts(SEED_PRODUCTS);
        }
      } catch (err) {
        console.warn('Firestore fetch products failed, using resilient local seed:', err);
        if (isMounted) setProducts(SEED_PRODUCTS);
      } finally {
        if (isMounted) setIsLoadingProducts(false);
      }
    }

    initCatalog();
    return () => { isMounted = false; };
  }, []);

  // Load orders from Firestore
  useEffect(() => {
    async function fetchOrders() {
      try {
        let q;
        if (isAdmin) {
          q = collection(db, 'orders');
        } else if (currentUser?.uid) {
          q = query(collection(db, 'orders'), where('userId', '==', currentUser.uid));
        } else {
          return;
        }
        const snap = await getDocs(q);
        if (!snap.empty) {
          const orderList: Order[] = [];
          snap.forEach((d) => orderList.push(d.data() as Order));
          setOrders(orderList);
        }
      } catch {
        // Fall back to localStorage orders
      }
    }
    fetchOrders();
  }, [currentUser, isAdmin]);

  // Add to cart
  const addToCart = (
    product: Product, 
    variation?: ProductVariation, 
    customization?: CustomizationSelection, 
    quantity = 1
  ) => {
    const variationPrice = variation ? variation.priceOffset : 0;
    const customPrice = customization ? customization.additionalPrice : 0;
    const basePrice = product.salePrice ?? product.price;
    const unitPrice = basePrice + variationPrice + customPrice;

    // Generate unique composite key
    const customKey = customization 
      ? `${customization.baseId}-${customization.selectedBoosterIds.sort().join('_')}-${customization.scentId}-${customization.customLabel || ''}`
      : 'standard';
    const variationKey = variation ? variation.id : 'default';
    const cartItemId = `${product.id}_${variationKey}_${customKey}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          totalPrice: newQty * unitPrice,
        };
        return updated;
      } else {
        const newItem: CartItem = {
          id: cartItemId,
          productId: product.id,
          product,
          selectedVariation: variation,
          customization,
          quantity,
          unitPrice,
          totalPrice: unitPrice * quantity,
        };
        return [...prev, newItem];
      }
    });

    setIsCartOpen(true);
    showToast(`Added "${product.name}" to your shopping bag.`);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === cartItemId) {
          return {
            ...item,
            quantity,
            totalPrice: item.unitPrice * quantity,
          };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);
  const shippingFee = subtotal > 0 ? (subtotal >= 75 ? 0 : 8) : 0;
  const discountAmount = appliedCoupon 
    ? (subtotal * appliedCoupon.discountPercent) / 100 
    : 0;
  const totalAmount = Math.max(0, subtotal - discountAmount + shippingFee);

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code === cleanCode && c.isActive);
    if (!found) {
      return { success: false, message: 'Invalid or expired promotional code.' };
    }
    if (subtotal < found.minOrder) {
      return { 
        success: false, 
        message: `This coupon requires a minimum subtotal of $${found.minOrder}.` 
      };
    }
    setAppliedCoupon(found);
    return { success: true, message: `Applied ${found.code} (${found.discountPercent}% OFF)!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Item removed from your wishlist.');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to your wishlist.');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  // Place Order
  const placeOrder = async (
    shippingAddress: ShippingAddress, 
    deliveryMethod: DeliveryMethod, 
    paymentMethod: string,
    guestEmail?: string,
    guestName?: string
  ) => {
    if (cart.length === 0) {
      return { success: false, error: 'Your cart is empty.' };
    }

    const orderNumber = `AP-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const orderId = `order-${Date.now()}`;
    const email = currentUser?.email || simulatedUser?.email || guestEmail || 'customer@example.com';
    const name = currentUser?.displayName || simulatedUser?.name || guestName || shippingAddress.fullName;

    const orderItems = cart.map((item) => {
      const customParts: string[] = [];
      if (item.customization) {
        customParts.push(`Base: ${item.customization.baseName}`);
        if (item.customization.selectedBoosterNames.length > 0) {
          customParts.push(`Boosters: ${item.customization.selectedBoosterNames.join(', ')}`);
        }
        customParts.push(`Scent: ${item.customization.scentName}`);
        if (item.customization.customLabel) {
          customParts.push(`Label: "${item.customization.customLabel}"`);
        }
      }

      return {
        productId: item.productId,
        name: item.product.name,
        variationName: item.selectedVariation?.name,
        customizationSummary: customParts.length > 0 ? customParts.join(' · ') : undefined,
        customLabel: item.customization?.customLabel,
        quantity: item.quantity,
        price: item.unitPrice,
        image: item.selectedVariation?.image || item.product.images[0],
      };
    });

    const newOrder: Order = {
      id: orderId,
      orderNumber,
      userId: currentUser?.uid || simulatedUser?.email || 'guest',
      customerEmail: email,
      customerName: name,
      shippingAddress,
      deliveryMethod,
      items: orderItems,
      subtotal,
      shippingFee: deliveryMethod.price > 0 ? deliveryMethod.price : shippingFee,
      discount: discountAmount,
      couponCode: appliedCoupon?.code,
      total: totalAmount,
      status: 'confirmed',
      paymentMethod,
      paymentStatus: 'paid',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      // Write order to Firestore
      await setDoc(doc(db, 'orders', orderId), newOrder);
    } catch (err) {
      console.warn('Firestore order write error (using resilient fallback):', err);
    }

    // Always update local state
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();

    // Deduct stock locally
    setProducts((prev) =>
      prev.map((prod) => {
        const purchasedItem = cart.find((c) => c.productId === prod.id);
        if (purchasedItem) {
          return {
            ...prod,
            stock: Math.max(0, prod.stock - purchasedItem.quantity),
          };
        }
        return prod;
      })
    );

    return { success: true, orderId, orderNumber };
  };

  const updateOrderStatus = async (orderId: string, status: OrderStatus, trackingNumber?: string) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      const updates: Record<string, unknown> = {
        status,
        updatedAt: new Date().toISOString(),
      };
      if (trackingNumber !== undefined) {
        updates.trackingNumber = trackingNumber;
      }
      await updateDoc(orderRef, updates);
    } catch (err) {
      console.warn('Firestore update order status fallback:', err);
    }

    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status,
              trackingNumber: trackingNumber ?? o.trackingNumber,
              updatedAt: new Date().toISOString(),
            }
          : o
      )
    );
    showToast(`Order status updated to: ${status}`);
    return true;
  };

  // Reviews
  const addReview = async (reviewData: Omit<ProductReview, 'id' | 'createdAt'>) => {
    const reviewId = `rev-${Date.now()}`;
    const newReview: ProductReview = {
      ...reviewData,
      id: reviewId,
      createdAt: new Date().toISOString().split('T')[0],
    };

    try {
      await setDoc(doc(db, 'reviews', reviewId), newReview);
    } catch (err) {
      console.warn('Firestore add review fallback:', err);
    }

    setReviews((prev) => [newReview, ...prev]);
    showToast('Thank you! Your botanical review has been published.');
    return true;
  };

  // Blog
  const addBlogPost = async (postData: Omit<BlogPost, 'id' | 'publishedAt'>) => {
    const postId = postData.slug || `post-${Date.now()}`;
    const newPost: BlogPost = {
      ...postData,
      id: postId,
      publishedAt: new Date().toISOString().split('T')[0],
    };

    try {
      await setDoc(doc(db, 'blogPosts', postId), newPost);
    } catch (err) {
      console.warn('Firestore add blog fallback:', err);
    }

    setBlogPosts((prev) => [newPost, ...prev]);
    showToast('Editorial article published successfully.');
    return true;
  };

  const deleteBlogPost = async (postId: string) => {
    try {
      await deleteDoc(doc(db, 'blogPosts', postId));
    } catch (err) {
      console.warn('Firestore delete blog fallback:', err);
    }
    setBlogPosts((prev) => prev.filter((p) => p.id !== postId));
    showToast('Article removed.');
    return true;
  };

  // Coupons
  const addCoupon = async (coupon: Coupon) => {
    try {
      await setDoc(doc(db, 'coupons', coupon.id), coupon);
    } catch (err) {
      console.warn('Firestore add coupon fallback:', err);
    }
    setCoupons((prev) => [coupon, ...prev]);
    showToast(`Coupon ${coupon.code} created.`);
    return true;
  };

  const toggleCoupon = async (couponId: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === couponId ? { ...c, isActive: !c.isActive } : c))
    );
    showToast('Coupon status updated.');
    return true;
  };

  // Admin Product Management
  const addProduct = async (productData: Omit<Product, 'id'>) => {
    const newId = productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newProduct: Product = { ...productData, id: newId };

    try {
      await setDoc(doc(db, 'products', newId), newProduct);
    } catch (err) {
      console.warn('Firestore add product fallback:', err);
    }

    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Added product "${newProduct.name}" to catalog.`);
    return true;
  };

  const updateProduct = async (productId: string, updates: Partial<Product>) => {
    try {
      await updateDoc(doc(db, 'products', productId), updates);
    } catch (err) {
      console.warn('Firestore update product fallback:', err);
    }

    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, ...updates } : p))
    );
    showToast('Product updated successfully.');
    return true;
  };

  const deleteProduct = async (productId: string) => {
    try {
      await deleteDoc(doc(db, 'products', productId));
    } catch (err) {
      console.warn('Firestore delete product fallback:', err);
    }

    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast('Product deleted from catalog.');
    return true;
  };

  // Recently viewed
  const addRecentlyViewed = (productId: string) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((id) => id !== productId);
      const updated = [productId, ...filtered].slice(0, 6);
      try {
        localStorage.setItem('aurapure_recent', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  // Auth actions
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const res = await signInWithPopup(auth, provider);
      showToast(`Welcome back, ${res.user.displayName || 'valued customer'}!`);
    } catch (err) {
      console.error('Google sign in error:', err);
      showToast('Google Sign-In was cancelled or unavailable.');
    }
  };

  const simulateCustomerLogin = (email: string, name: string) => {
    setSimulatedRole('customer');
    setSimulatedUser({ email, name });
    showToast(`Logged in as ${name}`);
  };

  const simulateAdminToggle = () => {
    if (simulatedRole === 'admin') {
      setSimulatedRole('guest');
      setSimulatedUser(null);
      showToast('Switched to Customer Store View');
    } else {
      setSimulatedRole('admin');
      setSimulatedUser({ email: 'rizwansabirksa1990@gmail.com', name: 'Rizwan (Admin)' });
      showToast('Switched to Admin Mode (Store Management)');
    }
  };

  const signOut = async () => {
    try {
      await fbSignOut(auth);
    } catch (e) {
      console.error(e);
    }
    setSimulatedRole('guest');
    setSimulatedUser(null);
    showToast('Signed out successfully.');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        isLoadingProducts,
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        subtotal,
        shippingFee,
        discountAmount,
        totalAmount,
        wishlist,
        toggleWishlist,
        isWishlisted,
        orders,
        placeOrder,
        updateOrderStatus,
        reviews,
        addReview,
        blogPosts,
        addBlogPost,
        deleteBlogPost,
        coupons,
        addCoupon,
        toggleCoupon,
        currentUser,
        isAdmin,
        signInWithGoogle,
        simulateCustomerLogin,
        simulateAdminToggle,
        signOut,
        recentlyViewed,
        addRecentlyViewed,
        addProduct,
        updateProduct,
        deleteProduct,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
