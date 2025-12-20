import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants/theme';

interface LoadingProps {
    fullScreen?: boolean;
    message?: string;
    size?: 'small' | 'large';
    color?: string;
}

const Loading: React.FC<LoadingProps> = ({
    fullScreen = false,
    message,
    size = 'large',
    color = COLORS.primary,
}) => {
    if (fullScreen) {
        return (
            <View style={styles.fullScreenContainer}>
                <ActivityIndicator size={size} color={color} />
                {message && <Text style={styles.message}>{message}</Text>}

            </View>
        );
    }

    return (
        <View style={styles.inlineContainer}>
            <ActivityIndicator size={size} color={color} />
            {message && <Text style={styles.message}>{message}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    fullScreenContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
    },
    inlineContainer: {
        padding: SPACING.xl,
        justifyContent: 'center',
        alignItems: 'center',
    },
    message: {
        marginTop: SPACING.md,
        fontSize: TYPOGRAPHY.base,
        color: COLORS.textSecondary,
        textAlign: 'center',
    },
});

export default Loading;
