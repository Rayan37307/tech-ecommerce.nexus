export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  category: string;
  brand: string;
  description: string;
  fullDescription: string;
  images: string[]; // At least 2 images for hover swap & gallery
  specs: Record<string, string>;
  colors?: string[];
  storageOptions?: string[];
  switchTypes?: string[];
  inStock: boolean;
  stockCount: number;
  tags: string[];
  isTrending?: boolean;
}

export interface CartItem {
  id: string; // unique cart item id (productId + selected variant keys)
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedStorage?: string;
  selectedSwitchType?: string;
}

export interface Address {
  name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface ShippingMethod {
  id: string;
  name: string;
  price: number;
  estimate: string;
}

export interface PaymentDetails {
  cardholderName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  deliveryEstimate: string;
  address: Address;
  shippingMethod: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  addresses: Address[];
}
