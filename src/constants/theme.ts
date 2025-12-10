export const COLORS = {
    // Primary Colors
    primary: '#2874F0',
    primaryDark: '#1a5ac6',
    primaryLight: '#5c96f5',

    // Secondary Colors
    secondary: '#4ECDC4',
    secondaryDark: '#3DBDB5',
    secondaryLight: '#6FD9D1',

    // Accent Colors
    accent: '#FFE66D',
    accentDark: '#F5DC5A',
    accentLight: '#FFED8F',

    // Neutral Colors
    white: '#FFFFFF',
    black: '#000000',
    gray100: '#F8F9FA',
    gray200: '#E9ECEF',
    gray300: '#DEE2E6',
    gray400: '#CED4DA',
    gray500: '#ADB5BD',
    gray600: '#6C757D',
    gray700: '#495057',
    gray800: '#343A40',
    gray900: '#212529',

    // Semantic Colors
    success: '#51CF66',
    warning: '#FFD43B',
    error: '#FF6B6B',
    info: '#339AF0',

    // Background
    background: '#FFFFFF',
    backgroundLight: '#F8F9FA',
    backgroundDark: '#F1F3F5',

    // Text
    textPrimary: '#212529',
    textSecondary: '#6C757D',
    textLight: '#ADB5BD',
    textWhite: '#FFFFFF',

    // Border
    border: '#DEE2E6',
    borderLight: '#E9ECEF',
    borderDark: '#CED4DA',

    // Overlay
    overlay: 'rgba(0, 0, 0, 0.5)',
    overlayLight: 'rgba(0, 0, 0, 0.3)',
};

export const TYPOGRAPHY = {
    // Font Sizes
    xxs: 5,
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,

    // Font Weights
    light: '300' as const,
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
};

export const SPACING = {
    xs: 4,
    sm: 8,
    md: 12,
    base: 16,
    lg: 20,
    xl: 24,
    '2xl': 32,
    '3xl': 40,
    '4xl': 48,
};

export const BORDER_RADIUS = {
    none: 0,
    sm: 4,
    base: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    full: 9999,
};

export const SHADOWS = {
    none: {
        shadowColor: 'transparent',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
    },
    sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    base: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
        elevation: 4,
    },
    lg: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,
    },
    xl: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 8,
    },
};

export const LAYOUT = {
    screenPadding: SPACING.base,
    containerMaxWidth: 1200,
    headerHeight: 60,
    tabBarHeight: 60,
};

export const ANIMATION = {
    duration: {
        fast: 200,
        normal: 300,
        slow: 500,
    },
    easing: {
        linear: 'linear' as const,
        ease: 'ease' as const,
        easeIn: 'ease-in' as const,
        easeOut: 'ease-out' as const,
        easeInOut: 'ease-in-out' as const,
    },
};

export default {
    COLORS,
    TYPOGRAPHY,
    SPACING,
    BORDER_RADIUS,
    SHADOWS,
    LAYOUT,
    ANIMATION,
};
