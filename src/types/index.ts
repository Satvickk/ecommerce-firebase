export interface ProductColor {
  value: string;
  label?: string;
}

export interface Product {
  docId: string;
  title: string;
  description: string;
  price: number;
  featuredImage: string;
  productType: "newArrival" | "trending" | "popular" | "regular" | string;
  review?: number | string;
  color?: ProductColor[];
  stripeProductId?: string;
  stripePriceId?: string;
  quantity?: number;
  WishListDocId?: string;
  id?: string;
  fileId?: string;
  status?: number;
}

export interface UserAuth {
  userId: string | null;
  userName: string | null;
  userEmail: string | null;
  isLogged: boolean;
}

export interface UserProfile {
  docId?: string;
  userId: string;
  name: string;
  email: string;
  address: string;
  contact: string;
  pincode: string;
  userRole: number; // 1 = customer, 2 = admin
  password?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  selectedProducts: CartItem[];
  totalCost: number;
}

export interface CheckoutState {
  selectedProducts: CartItem[];
  totalCost: number;
  checkoutDocId?: string;
}

export interface CustomerDetails {
  customerName?: string;
  name?: string;
  address: string;
  contact: string;
  pincode: string;
  email?: string;
}

export interface Order {
  docId?: string;
  orderId: string;
  orderDetails: {
    selectedProducts: CartItem[];
    totalCost: number;
    checkoutDocId?: string;
  };
  customerDetails: CustomerDetails;
  orderDate: string;
  deliveryDate?: string;
  deliveryCancelledDate?: string;
  deliveryStatus: number; // 1 = Delivered, 2 = Pending, 3 = Cancelled, 4 = Not Delivered, 5 = Scheduled
  userId: string;
}

export interface OrderState {
  content: Order[];
  totalDoc: number;
}

export interface AllProductsState {
  content: Product[];
  totalDoc: number;
}

export interface AllUsersState {
  content: UserProfile[];
  totalDoc: number;
}

export interface WishlistState {
  customerId: string;
  selectedProducts: Product[];
  totalDoc: number;
  wishlistDocId?: string;
}

export interface CreateOrderPayload {
  orderDetails: CheckoutState;
  customerDetails: CustomerDetails;
  userId: string;
}
