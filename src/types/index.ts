// User & Authentication Types
export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
    createdAt?: string;
    address?: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    phone: string;
    password: string;
}

export interface AuthResponse {
    success: boolean;
    token: string;
    user: User;
    message?: string;
}

// Product Types
export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    originalPrice?: number;
    image: string;
    images?: string[];
    rating: number;
    reviews?: number;
    category: string;
    stock: number;
    brand?: string;
    discount?: number;
    isFeatured?: boolean;
    isBestSeller?: boolean;
}

export interface Category {
    id: string;
    name: string;
    image: string;
    icon?: string;
    productCount?: number;
}

// Cart Types
export interface CartItem {
    id: string;
    product: Product;
    quantity: number;
    subtotal: number;
}

export interface Cart {
    items: CartItem[];
    total: number;
    itemCount: number;
}

// Order Types
export interface OrderItem {
    productId: string;
    productName: string;
    productImage: string;
    quantity: number;
    price: number;
    subtotal: number;
}

export interface DeliveryAddress {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    landmark?: string;
}

export interface Order {
    id: string;
    orderNumber: string;
    items: OrderItem[];
    total: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    deliveryAddress: DeliveryAddress;
    paymentMethod: string;
    createdAt: string;
    deliveredAt?: string;
}

// Navigation Types
export type RootStackParamList = {
    Auth: undefined;
    Main: undefined;
};

export type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
};

export type HomeStackParamList = {
    Home: undefined;
    CategoryList: undefined;
    ProductList: { categoryId: string; categoryName: string; searchQuery?: string };
    Electronics: undefined;
    Fashion: undefined;
    HomeAppliances: undefined;
    Beauty: undefined;
    Sports: undefined;
    ProductDetail: { productId: string };
};

export type CartStackParamList = {
    Cart: undefined;
    Checkout: undefined;
};

export type ProfileStackParamList = {
    Profile: undefined;
    EditProfile: undefined;
    OrderHistory: undefined;
    OrderDetail: { orderId: string };
};

export type BottomTabParamList = {
    HomeTab: undefined;
    CartTab: undefined;
    ProfileTab: undefined;
};
