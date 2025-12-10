import { Cart } from '../types';
import api from './api';

// Get Cart
export const getCart = async (): Promise<Cart> => {
    try {
        const response = await api.get<{ success: boolean; cart: Cart }>('/cart');
        return response.data.cart;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to fetch cart');
    }
};

// Add to Cart
export const addToCart = async (productId: string, quantity: number = 1): Promise<Cart> => {
    try {
        const response = await api.post<{ success: boolean; cart: Cart }>('/cart/add', {
            productId,
            quantity,
        });
        return response.data.cart;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to add to cart');
    }
};

// Update Cart Item
export const updateCartItem = async (itemId: string, quantity: number): Promise<Cart> => {
    try {
        const response = await api.put<{ success: boolean; cart: Cart }>('/cart/update', {
            itemId,
            quantity,
        });
        return response.data.cart;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to update cart');
    }
};

// Remove from Cart
export const removeFromCart = async (itemId: string): Promise<Cart> => {
    try {
        const response = await api.delete<{ success: boolean; cart: Cart }>(`/cart/remove/${itemId}`);
        return response.data.cart;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to remove from cart');
    }
};

// Clear Cart
export const clearCart = async (): Promise<void> => {
    try {
        await api.delete('/cart/clear');
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to clear cart');
    }
};

export default {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
};
