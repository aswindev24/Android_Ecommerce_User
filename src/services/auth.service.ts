import { AuthResponse, LoginCredentials, RegisterData, User } from '../types';
import { getToken, getUser, removeToken, removeUser, saveToken, saveUser } from '../utils/storage';
// import api from './api'; // Commented out for mock authentication

/**
 * MOCK AUTHENTICATION SERVICE
 * This service uses mock data instead of real API calls for development/testing.
 * Valid credentials: test@gmail.com / test123
 * To use real backend API, uncomment the api import and replace mock implementations.
 */

// Mock user data for testing
const MOCK_USER: User = {
    id: '1',
    name: 'Test User',
    email: 'test@gmail.com',
    phone: '1234567890',
};

const MOCK_TOKEN = 'mock-jwt-token-12345';

// Mock credentials
const VALID_CREDENTIALS = {
    email: 'test@gmail.com',
    password: 'test123',
};

// Login (Mock Implementation)
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Check credentials
        if (
            credentials.email === VALID_CREDENTIALS.email &&
            credentials.password === VALID_CREDENTIALS.password
        ) {
            // Save token and user data
            await saveToken(MOCK_TOKEN);
            await saveUser(MOCK_USER);

            return {
                success: true,
                message: 'Login successful',
                token: MOCK_TOKEN,
                user: MOCK_USER,
            };
        } else {
            throw new Error('Invalid email or password');
        }
    } catch (error: any) {
        throw new Error(error.message || 'Login failed');
    }
};

// Register (Mock Implementation)
export const register = async (data: RegisterData): Promise<AuthResponse> => {
    try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Create new user from registration data
        const newUser: User = {
            id: Date.now().toString(),
            name: data.name,
            email: data.email,
            phone: data.phone,
        };

        // Save token and user data
        await saveToken(MOCK_TOKEN);
        await saveUser(newUser);

        return {
            success: true,
            message: 'Registration successful',
            token: MOCK_TOKEN,
            user: newUser,
        };
    } catch (error: any) {
        throw new Error(error.message || 'Registration failed');
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

// Get Current User (Mock Implementation)
export const getCurrentUser = async (): Promise<User> => {
    try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

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

// Update Profile (Mock Implementation)
export const updateProfile = async (data: Partial<User>): Promise<User> => {
    try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        const currentUser = await getUser();
        if (!currentUser) {
            throw new Error('User not found');
        }

        // Merge updated data with current user
        const updatedUser: User = {
            ...currentUser,
            ...data,
        };

        // Save updated user data
        await saveUser(updatedUser);

        return updatedUser;
    } catch (error: any) {
        throw new Error(error.message || 'Failed to update profile');
    }
};

export default {
    login,
    register,
    logout,
    getCurrentUser,
    updateProfile,
};
