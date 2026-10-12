export interface ProductVariation {
  id: string;
  name: string;
  type: 'size' | 'color' | 'scent' | 'blend';
  value: string;
  priceOffset: number;
  stock: number;
  image: string;
}

export interface CustomOptionItem {
  id: string;
  name: string;
  botanicalName?: string;
  origin: string;
  description: string;
  priceOffset: number;
  benefits?: string[];
}

export interface CustomizationConfig {
  baseLabel: string;
  baseOptions: CustomOptionItem[];
  boostersLabel: string;
  boosterOptions: CustomOptionItem[];
  maxBoosters: number;
  scentsLabel: string;
  scentOptions: CustomOptionItem[];
  allowLabelEngraving: boolean;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'Skincare' | 'Wellness & Fragrance' | 'Home & Living' | 'Body & Bath' | 'Handcrafted Crafts';
  price: number;
  salePrice?: number;
  rating: number;
  reviewsCount: number;
  originCountry: string;
  originCountryCode: string;
  originRegion: string;
  description: string;
  story: string;
  ingredients: string[];
  ingredientDetails?: {
    name: string;
    botanicalName: string;
    origin: string;
    benefit: string;
  }[];
  isCustomizable: boolean;
  customizationConfig?: CustomizationConfig;
  variations: ProductVariation[];
  images: string[];
  stock: number;
  featured?: boolean;
  bestseller?: boolean;
  isNewArrival?: boolean;
  tags: string[];
}

export interface CustomizationSelection {
  baseId: string;
  baseName: string;
  selectedBoosterIds: string[];
  selectedBoosterNames: string[];
  scentId: string;
  scentName: string;
  customLabel?: string;
  additionalPrice: number;
}

export interface CartItem {
  id: string; // unique key (productId + variationId + hash of custom)
  productId: string;
  product: Product;
  selectedVariation?: ProductVariation;
  customization?: CustomizationSelection;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface ShippingAddress {
  fullName: string;
  street: string;
  apt?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface DeliveryMethod {
  id: string;
  name: string;
  price: number;
  estDays: string;
  carbonNeutral: boolean;
}

export interface OrderItemRecord {
  productId: string;
  name: string;
  variationName?: string;
  customizationSummary?: string;
  customLabel?: string;
  quantity: number;
  price: number;
  image: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  customerEmail: string;
  customerName: string;
  shippingAddress: ShippingAddress;
  deliveryMethod: DeliveryMethod;
  items: OrderItemRecord[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  couponCode?: string;
  total: number;
  status: OrderStatus;
  trackingNumber?: string;
  paymentMethod: string;
  paymentStatus: 'paid' | 'pending';
  createdAt: string;
  updatedAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: 'Ingredients' | 'Global Sourcing' | 'Rituals' | 'Sustainability';
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  readTime: string;
  coverImage: string;
  tags: string[];
  publishedAt: string;
}

export interface ProductReview {
  id: string;
  productId: string;
  userId?: string;
  userName: string;
  userCountry: string;
  rating: number;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  createdAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountPercent: number;
  minOrder: number;
  isActive: boolean;
}
