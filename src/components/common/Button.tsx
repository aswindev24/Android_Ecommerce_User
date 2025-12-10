import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    TouchableOpacityProps,
    ViewStyle,
} from 'react-native';
import { BORDER_RADIUS, COLORS, SHADOWS, SPACING, TYPOGRAPHY } from '../../constants/theme';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'small' | 'medium' | 'large';
    loading?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    size = 'medium',
    loading = false,
    disabled = false,
    fullWidth = false,
    style,
    textStyle,
    ...props
}) => {
    const getButtonStyle = (): ViewStyle => {
        const baseStyle: ViewStyle = {
            ...styles.button,
            ...SHADOWS.sm,
        };

        // Variant styles
        switch (variant) {
            case 'primary':
                baseStyle.backgroundColor = COLORS.primary;
                break;
            case 'secondary':
                baseStyle.backgroundColor = COLORS.secondary;
                break;
            case 'outline':
                baseStyle.backgroundColor = 'transparent';
                baseStyle.borderWidth = 2;
                baseStyle.borderColor = COLORS.primary;
                break;
        }

        // Size styles
        switch (size) {
            case 'small':
                baseStyle.paddingVertical = SPACING.sm;
                baseStyle.paddingHorizontal = SPACING.base;
                break;
            case 'medium':
                baseStyle.paddingVertical = SPACING.md;
                baseStyle.paddingHorizontal = SPACING.lg;
                break;
            case 'large':
                baseStyle.paddingVertical = SPACING.base;
                baseStyle.paddingHorizontal = SPACING.xl;
                break;
        }

        if (fullWidth) {
            baseStyle.width = '100%';
        }

        if (disabled || loading) {
            baseStyle.opacity = 0.6;
        }

        return baseStyle;
    };

    const getTextStyle = (): TextStyle => {
        const baseTextStyle: TextStyle = {
            ...styles.text,
            fontWeight: TYPOGRAPHY.semibold,
        };

        // Variant text styles
        switch (variant) {
            case 'primary':
            case 'secondary':
                baseTextStyle.color = COLORS.white;
                break;
            case 'outline':
                baseTextStyle.color = COLORS.primary;
                break;
        }

        // Size text styles
        switch (size) {
            case 'small':
                baseTextStyle.fontSize = TYPOGRAPHY.sm;
                break;
            case 'medium':
                baseTextStyle.fontSize = TYPOGRAPHY.base;
                break;
            case 'large':
                baseTextStyle.fontSize = TYPOGRAPHY.lg;
                break;
        }

        return baseTextStyle;
    };

    return (
        <TouchableOpacity
            style={[getButtonStyle(), style]}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.7}
            {...props}
        >
            {loading ? (
                <ActivityIndicator color={variant === 'outline' ? COLORS.primary : COLORS.white} />
            ) : (
                <Text style={[getTextStyle(), textStyle]}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: BORDER_RADIUS.base,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    text: {
        textAlign: 'center',
    },
});

export default Button;
