import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Button from '../../components/common/Button';
import { APP_CONFIG } from '../../constants/config';
import { BORDER_RADIUS, COLORS, LAYOUT, SHADOWS, SPACING, TYPOGRAPHY } from '../../constants/theme';
import { useCart } from '../../context/CartContext';
import { CartItem, CartStackParamList } from '../../types';

type CartScreenNavigationProp = NativeStackNavigationProp<CartStackParamList, 'Cart'>;

interface Props {
    navigation: CartScreenNavigationProp;
}

const CartScreen: React.FC<Props> = ({ navigation }) => {
    const { items, total, itemCount, removeFromCart, updateQuantity } = useCart();

    const handleCheckout = () => {
        navigation.navigate('Checkout');
    };

    const renderCartItem = ({ item }: { item: CartItem }) => (
        <View style={styles.cartItem}>
            <Image source={{ uri: item.product.image }} style={styles.itemImage} />

            <View style={styles.itemInfo}>
                <Text style={styles.itemName} numberOfLines={2}>
                    {item.product.title}
                </Text>
                <Text style={styles.itemPrice}>
                    {APP_CONFIG.CURRENCY}{item.product.price}
                </Text>

                {/* Quantity Controls */}
                <View style={styles.quantityContainer}>
                    <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                        <Ionicons name="remove" size={16} color={COLORS.textPrimary} />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                        <Ionicons name="add" size={16} color={COLORS.textPrimary} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Subtotal and Remove */}
            <View style={styles.itemActions}>
                <Text style={styles.subtotal}>
                    {APP_CONFIG.CURRENCY}{item.subtotal}
                </Text>
                <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeFromCart(item.id)}
                >
                    <Ionicons name="trash-outline" size={20} color={COLORS.error} />
                </TouchableOpacity>
            </View>
        </View>
    );

    if (items.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Ionicons name="cart-outline" size={80} color={COLORS.gray400} />
                <Text style={styles.emptyTitle}>Your cart is empty</Text>
                <Text style={styles.emptyText}>Add some products to get started</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={items}
                renderItem={renderCartItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
            />

            {/* Cart Summary */}
            <View style={styles.footer}>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Items ({itemCount})</Text>
                    <Text style={styles.summaryValue}>
                        {APP_CONFIG.CURRENCY}{total}
                    </Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Delivery</Text>
                    <Text style={styles.summaryValue}>FREE</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.summaryRow}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalValue}>
                        {APP_CONFIG.CURRENCY}{total}
                    </Text>
                </View>
                <Button
                    title="Proceed to Checkout"
                    onPress={handleCheckout}
                    fullWidth
                    style={styles.checkoutButton}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    list: {
        padding: LAYOUT.screenPadding,
    },
    cartItem: {
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.md,
        padding: SPACING.md,
        marginBottom: SPACING.md,
        ...SHADOWS.base,
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: BORDER_RADIUS.sm,
        backgroundColor: COLORS.gray100,
    },
    itemInfo: {
        flex: 1,
        marginLeft: SPACING.md,
        justifyContent: 'space-between',
    },
    itemName: {
        fontSize: TYPOGRAPHY.base,
        fontWeight: TYPOGRAPHY.semibold,
        color: COLORS.textPrimary,
    },
    itemPrice: {
        fontSize: TYPOGRAPHY.sm,
        color: COLORS.textSecondary,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        width: 28,
        height: 28,
        borderRadius: BORDER_RADIUS.sm,
        backgroundColor: COLORS.backgroundLight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityText: {
        fontSize: TYPOGRAPHY.base,
        fontWeight: TYPOGRAPHY.semibold,
        color: COLORS.textPrimary,
        marginHorizontal: SPACING.md,
        minWidth: 24,
        textAlign: 'center',
    },
    itemActions: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    subtotal: {
        fontSize: TYPOGRAPHY.lg,
        fontWeight: TYPOGRAPHY.bold,
        color: COLORS.primary,
    },
    removeButton: {
        padding: SPACING.sm,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: LAYOUT.screenPadding,
    },
    emptyTitle: {
        fontSize: TYPOGRAPHY['2xl'],
        fontWeight: TYPOGRAPHY.bold,
        color: COLORS.textPrimary,
        marginTop: SPACING.xl,
        marginBottom: SPACING.sm,
    },
    emptyText: {
        fontSize: TYPOGRAPHY.base,
        color: COLORS.textSecondary,
        textAlign: 'center',
    },
    footer: {
        backgroundColor: COLORS.white,
        padding: LAYOUT.screenPadding,
        borderTopWidth: 1,
        borderTopColor: COLORS.borderLight,
        ...SHADOWS.lg,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SPACING.sm,
    },
    summaryLabel: {
        fontSize: TYPOGRAPHY.base,
        color: COLORS.textSecondary,
    },
    summaryValue: {
        fontSize: TYPOGRAPHY.base,
        fontWeight: TYPOGRAPHY.semibold,
        color: COLORS.textPrimary,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginVertical: SPACING.md,
    },
    totalLabel: {
        fontSize: TYPOGRAPHY.lg,
        fontWeight: TYPOGRAPHY.bold,
        color: COLORS.textPrimary,
    },
    totalValue: {
        fontSize: TYPOGRAPHY.lg,
        fontWeight: TYPOGRAPHY.bold,
        color: COLORS.primary,
    },
    checkoutButton: {
        marginTop: SPACING.base,
    },
});

export default CartScreen;
