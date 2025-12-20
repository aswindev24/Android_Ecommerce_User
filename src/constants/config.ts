import { Platform } from 'react-native';

// API Configuration
export const API_CONFIG = {
    // Use 10.0.2.2 for Android emulator, localhost for iOS simulator
    BASE_URL: 'http://192.168.29.15:5001/api',
    TIMEOUT: 30000, // 30 seconds
};

// Storage Keys
export const STORAGE_KEYS = {
    AUTH_TOKEN: '@ecommerce_auth_token',
    USER_DATA: '@ecommerce_user_data',
    CART_DATA: '@ecommerce_cart_data',
};

// App Configuration
export const APP_CONFIG = {
    APP_NAME: 'EcommerceUser',
    VERSION: '1.0.0',
    SUPPORT_EMAIL: 'support@ecommerce.com',
    CURRENCY: '₹',
    CURRENCY_CODE: 'INR',
};

// Pagination
export const PAGINATION = {
    PRODUCTS_PER_PAGE: 20,
    ORDERS_PER_PAGE: 10,
};

// Validation Rules
export const VALIDATION = {
    PASSWORD_MIN_LENGTH: 6,
    PHONE_LENGTH: 10,
    NAME_MIN_LENGTH: 2,
    NAME_MAX_LENGTH: 50,
};

export default {
    API_CONFIG,
    STORAGE_KEYS,
    APP_CONFIG,
    PAGINATION,
    VALIDATION,
};
