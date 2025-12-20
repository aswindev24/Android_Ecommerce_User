import { SavedAddress } from '../types';
import api from './api';

// Create Address
export const createAddress = async (addressData: Partial<SavedAddress>): Promise<SavedAddress> => {
    try {
        const response = await api.post('/addresses', addressData);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message || 'Failed to create address');
    }
};

// Get All Addresses
export const getAddresses = async (): Promise<SavedAddress[]> => {
    try {
        const response = await api.get('/addresses');
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message || 'Failed to fetch addresses');
    }
};

// Update Address
export const updateAddress = async (id: string, addressData: Partial<SavedAddress>): Promise<SavedAddress> => {
    try {
        const response = await api.put(`/addresses/${id}`, addressData);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message || 'Failed to update address');
    }
};

// Delete Address
export const deleteAddress = async (id: string): Promise<{ message: string }> => {
    try {
        const response = await api.delete(`/addresses/${id}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message || 'Failed to delete address');
    }
};

export default {
    createAddress,
    getAddresses,
    updateAddress,
    deleteAddress,
};
