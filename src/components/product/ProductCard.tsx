import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { APP_CONFIG } from '../../constants/config';
import { BORDER_RADIUS, COLORS, SHADOWS, SPACING, TYPOGRAPHY } from '../../constants/theme';
import { Product } from '../../types';

interface ProductCardProps {
    product: Product;
    onPress: () => void;
    onAddToCart?: () => void;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - SPACING.base * 3) / 2;

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress, onAddToCart }) => {
    return (
        <TouchableOpacity
            style={styles.card}
            onPress={onPress}
            activeOpacity={0.8}
        >
            {/* Discount Badge */}
            {product.discount && product.discount > 0 && (
                <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>{product.discount}% OFF</Text>
                </View>
            )}

            {/* Product Image */}
            <Image
                source={{ uri: product.image }}
                style={styles.image}
                resizeMode="cover"
            />

            {/* Product Info */}
            <View style={styles.infoContainer}>
                <Text style={styles.title} numberOfLines={2}>
                    {product.title}
                </Text>

                {/* Rating */}
                <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={14} color={COLORS.warning} />
                    <Text style={styles.rating}>{product.rating.toFixed(1)}</Text>
                    {product.reviews && (
                        <Text style={styles.reviews}>({product.reviews})</Text>
                    )}
                </View>

                {/* Price */}
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>
                        {APP_CONFIG.CURRENCY}{product.price}
                    </Text>
                    {product.originalPrice && product.originalPrice > product.price && (
                        <Text style={styles.originalPrice}>
                            {APP_CONFIG.CURRENCY}{product.originalPrice}
                        </Text>
                    )}
                </View>

                {/* Add to Cart Button */}
                {onAddToCart && (
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={(e) => {
                            e.stopPropagation();
                            onAddToCart();
                        }}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="cart-outline" size={18} color={COLORS.white} />
                    </TouchableOpacity>
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        width: CARD_WIDTH,
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.md,
        marginBottom: SPACING.base,
        ...SHADOWS.base,
        overflow: 'hidden',
    },
    discountBadge: {
        position: 'absolute',
        top: SPACING.sm,
        left: SPACING.sm,
        backgroundColor: COLORS.primary,
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.xs,
        borderRadius: BORDER_RADIUS.sm,
        zIndex: 1,
    },
    discountText: {
        color: COLORS.white,
        fontSize: TYPOGRAPHY.xs,
        fontWeight: TYPOGRAPHY.bold,
    },
    image: {
        width: '100%',
        height: CARD_WIDTH,
        backgroundColor: COLORS.gray100,
    },
    infoContainer: {
        padding: SPACING.md,
    },
    title: {
        fontSize: TYPOGRAPHY.sm,
        fontWeight: TYPOGRAPHY.semibold,
        color: COLORS.textPrimary,
        marginBottom: SPACING.xs,
        height: 36,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.xs,
    },
    rating: {
        fontSize: TYPOGRAPHY.xs,
        fontWeight: TYPOGRAPHY.semibold,
        color: COLORS.textPrimary,
        marginLeft: SPACING.xs,
    },
    reviews: {
        fontSize: TYPOGRAPHY.xs,
        color: COLORS.textSecondary,
        marginLeft: SPACING.xs,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.xs,
    },
    price: {
        fontSize: TYPOGRAPHY.base,
        fontWeight: TYPOGRAPHY.bold,
        color: COLORS.primary,
        marginRight: SPACING.sm,
    },
    originalPrice: {
        fontSize: TYPOGRAPHY.sm,
        color: COLORS.textSecondary,
        textDecorationLine: 'line-through',
    },
    addButton: {
        position: 'absolute',
        bottom: SPACING.md,
        right: SPACING.md,
        backgroundColor: COLORS.primary,
        width: 36,
        height: 36,
        borderRadius: BORDER_RADIUS.full,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.md,
    },
});

export default ProductCard;
