import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { CartItem, Product } from '../types';

interface CartContextType {
    items: CartItem[];
    itemCount: number;
    total: number;
    isLoading: boolean;
    addToCart: (product: Product, quantity?: number) => Promise<void>;
    removeFromCart: (itemId: string) => Promise<void>;
    updateQuantity: (itemId: string, quantity: number) => Promise<void>;
    clearCart: () => Promise<void>;
    refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Calculate totals
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const total = items.reduce((sum, item) => sum + item.subtotal, 0);

    // Load cart on mount
    useEffect(() => {
        // Optionally load cart from API or local storage
        // For now, we'll start with empty cart
    }, []);

    const addToCart = async (product: Product, quantity: number = 1) => {
        try {
            setIsLoading(true);

            // Check if product already in cart
            const existingItemIndex = items.findIndex(
                item => item.product.id === product.id
            );

            if (existingItemIndex > -1) {
                // Update quantity if already in cart
                const newItems = [...items];
                newItems[existingItemIndex].quantity += quantity;
                newItems[existingItemIndex].subtotal =
                    newItems[existingItemIndex].quantity * product.price;
                setItems(newItems);
            } else {
                // Add new item to cart
                const newItem: CartItem = {
                    id: Date.now().toString(),
                    product,
                    quantity,
                    subtotal: product.price * quantity,
                };
                setItems([...items, newItem]);
            }

            // Optionally sync with API
            // await cartService.addToCart(product.id, quantity);

            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: `${product.title} added to cart!`,
                position: 'bottom'
            });
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.message || 'Failed to add to cart',
                position: 'bottom'
            });
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const removeFromCart = async (itemId: string) => {
        try {
            setIsLoading(true);

            const newItems = items.filter(item => item.id !== itemId);
            setItems(newItems);

            // Optionally sync with API
            // await cartService.removeFromCart(itemId);
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.message || 'Failed to remove from cart',
                position: 'bottom'
            });
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const updateQuantity = async (itemId: string, quantity: number) => {
        try {
            setIsLoading(true);

            if (quantity <= 0) {
                await removeFromCart(itemId);
                return;
            }

            const newItems = items.map(item => {
                if (item.id === itemId) {
                    return {
                        ...item,
                        quantity,
                        subtotal: item.product.price * quantity,
                    };
                }
                return item;
            });

            setItems(newItems);

            // Optionally sync with API
            // await cartService.updateCartItem(itemId, quantity);
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.message || 'Failed to update quantity',
                position: 'bottom'
            });
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const clearCart = async () => {
        try {
            setIsLoading(true);
            setItems([]);

            // Optionally sync with API
            // await cartService.clearCart();
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.message || 'Failed to clear cart',
                position: 'bottom'
            });
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const refreshCart = async () => {
        try {
            setIsLoading(true);
            // Optionally fetch cart from API
            // const cart = await cartService.getCart();
            // setItems(cart.items);
        } catch (error: any) {
            console.error('Failed to refresh cart:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const value: CartContextType = {
        items,
        itemCount,
        total,
        isLoading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        refreshCart,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
