import { VALIDATION } from '../constants/config';

// Email Validation
export const validateEmail = (email: string): { isValid: boolean; error?: string } => {
    if (!email) {
        return { isValid: false, error: 'Email is required' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { isValid: false, error: 'Please enter a valid email address' };
    }

    return { isValid: true };
};

// Password Validation
export const validatePassword = (password: string): { isValid: boolean; error?: string } => {
    if (!password) {
        return { isValid: false, error: 'Password is required' };
    }

    if (password.length < VALIDATION.PASSWORD_MIN_LENGTH) {
        return {
            isValid: false,
            error: `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters`
        };
    }

    return { isValid: true };
};

// Name Validation
export const validateName = (name: string): { isValid: boolean; error?: string } => {
    if (!name) {
        return { isValid: false, error: 'Name is required' };
    }

    if (name.length < VALIDATION.NAME_MIN_LENGTH) {
        return {
            isValid: false,
            error: `Name must be at least ${VALIDATION.NAME_MIN_LENGTH} characters`
        };
    }

    if (name.length > VALIDATION.NAME_MAX_LENGTH) {
        return {
            isValid: false,
            error: `Name must not exceed ${VALIDATION.NAME_MAX_LENGTH} characters`
        };
    }

    return { isValid: true };
};

// Phone Number Validation
export const validatePhone = (phone: string): { isValid: boolean; error?: string } => {
    if (!phone) {
        return { isValid: false, error: 'Phone number is required' };
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
        return { isValid: false, error: 'Please enter a valid 10-digit phone number' };
    }

    return { isValid: true };
};

// Confirm Password Validation
export const validateConfirmPassword = (
    password: string,
    confirmPassword: string
): { isValid: boolean; error?: string } => {
    if (!confirmPassword) {
        return { isValid: false, error: 'Please confirm your password' };
    }

    if (password !== confirmPassword) {
        return { isValid: false, error: 'Passwords do not match' };
    }

    return { isValid: true };
};

// Generic Required Field Validation
export const validateRequired = (
    value: string,
    fieldName: string
): { isValid: boolean; error?: string } => {
    if (!value || value.trim() === '') {
        return { isValid: false, error: `${fieldName} is required` };
    }

    return { isValid: true };
};

// Pincode Validation
export const validatePincode = (pincode: string): { isValid: boolean; error?: string } => {
    if (!pincode) {
        return { isValid: false, error: 'Pincode is required' };
    }

    const pincodeRegex = /^[0-9]{6}$/;
    if (!pincodeRegex.test(pincode)) {
        return { isValid: false, error: 'Please enter a valid 6-digit pincode' };
    }

    return { isValid: true };
};
