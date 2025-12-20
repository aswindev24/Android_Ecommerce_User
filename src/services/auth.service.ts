import { AuthResponse, LoginCredentials, RegisterData, User } from '../types';
import { getToken, getUser, removeToken, removeUser, saveToken, saveUser } from '../utils/storage';
import api from './api';

// Login
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
        const response = await api.post('/users/login', credentials);
        const { success, token, user, message } = response.data;

        if (success) {
            await saveToken(token);
            await saveUser(user);
            return { success, message, token, user };
        } else {
            throw new Error(message || 'Login failed');
        }
    } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message || 'Login failed');
    }
};

// Register
export const register = async (data: RegisterData): Promise<AuthResponse> => {
    try {
        const response = await api.post('/users/register', data);
        const { success, token, user, message } = response.data;

        if (success) {
            // Note: We are NOT saving token/user here because the user wants to login manually after registration
            return { success, message, token, user };
        } else {
            throw new Error(message || 'Registration failed');
        }
    } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message || 'Registration failed');
    }
};

// Logout
export const logout = async (): Promise<void> => {
    try {
        await removeToken();
        await removeUser();
    } catch (error) {
        console.error('Logout error:', error);
        throw error;
    }
};

// Get Current User
export const getCurrentUser = async (): Promise<User> => {
    try {
        const token = await getToken();
        if (!token) {
            throw new Error('Not authenticated');
        }

        const user = await getUser();
        if (!user) {
            throw new Error('User data not found');
        }

        return user;
    } catch (error: any) {
        throw new Error(error.message || 'Failed to get user data');
    }
};

// Update Profile
export const updateProfile = async (data: Partial<User>): Promise<User> => {
    try {
        const response = await api.put('/users/profile', data);
        const updatedUser = response.data;

        // Save updated user data
        await saveUser(updatedUser);

        return updatedUser;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message || 'Failed to update profile');
    }
};

export default {
    login,
    register,
    logout,
    getCurrentUser,
    updateProfile,
};
