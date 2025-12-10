import { Category, Product } from '../types';
import api from './api';

// Get All Products
export const getProducts = async (): Promise<Product[]> => {
    try {
        const response = await api.get<{ success: boolean; products: Product[] }>('/products');
        return response.data.products;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to fetch products');
    }
};

// Get Product by ID
export const getProductById = async (id: string): Promise<Product> => {
    try {
        const response = await api.get<{ success: boolean; product: Product }>(`/products/${id}`);
        return response.data.product;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to fetch product');
    }
};

// Get Products by Category
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
    try {
        const response = await api.get<{ success: boolean; products: Product[] }>(
            `/products/category/${category}`
        );
        return response.data.products;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to fetch products');
    }
};

// Get All Categories
export const getCategories = async (): Promise<Category[]> => {
    try {
        const response = await api.get<{ success: boolean; categories: Category[] }>('/categories');
        return response.data.categories;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to fetch categories');
    }
};

// Get Featured Products
export const getFeaturedProducts = async (): Promise<Product[]> => {
    try {
        const response = await api.get<{ success: boolean; products: Product[] }>('/products/featured');
        return response.data.products;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to fetch featured products');
    }
};

// Get Best Seller Products
export const getBestSellers = async (): Promise<Product[]> => {
    try {
        const response = await api.get<{ success: boolean; products: Product[] }>('/products/bestsellers');
        return response.data.products;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to fetch best sellers');
    }
};

// Search Products
export const searchProducts = async (query: string): Promise<Product[]> => {
    try {
        const response = await api.get<{ success: boolean; products: Product[] }>(
            `/products/search?q=${encodeURIComponent(query)}`
        );
        return response.data.products;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to search products');
    }
};

export default {
    getProducts,
    getProductById,
    getProductsByCategory,
    getCategories,
    getFeaturedProducts,
    getBestSellers,
    searchProducts,
};
