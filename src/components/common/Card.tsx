import React, { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { BORDER_RADIUS, COLORS, SHADOWS, SPACING } from '../../constants/theme';

interface CardProps {
    children: ReactNode;
    style?: ViewStyle;
    elevation?: 'none' | 'sm' | 'base' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({ children, style, elevation = 'base' }) => {
    const shadowStyle = SHADOWS[elevation];

    return (
        <View style={[styles.card, shadowStyle, style]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.md,
        padding: SPACING.base,
    },
});

export default Card;
