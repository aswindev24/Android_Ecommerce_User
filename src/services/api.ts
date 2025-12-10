import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { API_CONFIG } from '../constants/config';
import { getToken } from '../utils/storage';

// Create axios instance
const api: AxiosInstance = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor - Add auth token to requests
api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        try {
            const token = await getToken();
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.error('Error getting token:', error);
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Response interceptor - Handle errors globally
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error: AxiosError) => {
        if (error.response) {
            // Server responded with error status
            const status = error.response.status;

            switch (status) {
                case 401:
                    // Unauthorized - Token expired or invalid
                    console.log('Unauthorized - Please login again');
                    // You can dispatch logout action here
                    break;
                case 403:
                    console.log('Forbidden - Access denied');
                    break;
                case 404:
                    console.log('Resource not found');
                    break;
                case 500:
                    console.log('Server error - Please try again later');
                    break;
                default:
                    console.log('An error occurred:', error.message);
            }
        } else if (error.request) {
            // Request made but no response received
            console.log('Network error - Please check your connection');
        } else {
            // Something else happened
            console.log('Error:', error.message);
        }

        return Promise.reject(error);
    }
);

export default api;
