import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
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

import { useLocation } from '../../context/LocationContext';

type CartScreenNavigationProp = NativeStackNavigationProp<CartStackParamList, 'Cart'>;

interface Props {
    navigation: CartScreenNavigationProp;
}

const CartScreen: React.FC<Props> = ({ navigation }) => {
    const { items, total, itemCount, removeFromCart, updateQuantity } = useCart();
    const { selectedAddress } = useLocation();

    const handleCheckout = () => {
        navigation.navigate('Checkout');
    };

    const handleChangeAddress = () => {
        // Navigate across stacks to Profile -> Address
        (navigation as any).navigate('ProfileTab', { screen: 'Address' });
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
                <StatusBar style="light" backgroundColor={COLORS.primary} />
                <Image
                    source={require('../../../assets/emptycart.png')}
                    style={styles.emptyImage}
                    resizeMode="contain"
                />
                <Text style={styles.emptyTitle}>Your cart is empty</Text>
                <Text style={styles.emptyText}>Add some products to get started</Text>
            </View>
        );
    }

    const renderFooter = () => (
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
    );

    return (
        <View style={styles.container}>
            <StatusBar style="light" backgroundColor={COLORS.primary} />

            <FlatList
                data={items}
                renderItem={renderCartItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => (
                    <View>
                        {/* Address Section */}
                        <View style={styles.addressContainer}>
                            <View style={styles.addressHeader}>
                                <View style={styles.addressLabelContainer}>
                                    <Ionicons name="location-sharp" size={18} color={COLORS.primary} />
                                    <Text style={styles.deliveryLabel}>Deliver to:</Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.changeButton}
                                    onPress={handleChangeAddress}
                                >
                                    <Text style={styles.changeText}>CHANGE</Text>
                                </TouchableOpacity>
                            </View>

                            {selectedAddress ? (
                                <View style={styles.addressContent}>
                                    <View style={styles.nameRow}>
                                        <Text style={styles.addressName}>{selectedAddress.fullName}</Text>
                                        <View style={styles.addressTag}>
                                            <Text style={styles.addressTagText}>{selectedAddress.type.toUpperCase()}</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.addressTextDetail}>{selectedAddress.address}</Text>
                                    <Text style={styles.addressTextDetail}>
                                        {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pincode}
                                    </Text>
                                    <Text style={styles.phoneText}>{selectedAddress.phone}</Text>
                                </View>
                            ) : (
                                <View style={styles.addressContent}>
                                    <Text style={styles.addressTextDetail}>Please select a delivery address</Text>
                                </View>
                            )}
                        </View>

                        {/* Products Section Header */}
                        <View style={styles.productsHeader}>
                            <Text style={styles.sectionTitle}>My Bag ({itemCount})</Text>
                        </View>
                    </View>
                )}
                ListFooterComponent={renderFooter}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    list: {
        padding: SPACING.md,
        paddingTop: 0,
    },
    addressContainer: {
        backgroundColor: COLORS.white,
        padding: SPACING.md,
        borderRadius: BORDER_RADIUS.md,
        marginTop: SPACING.md,
        marginBottom: SPACING.sm,
        ...SHADOWS.sm,
    },
    addressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.sm,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderLight,
        paddingBottom: SPACING.xs,
    },
    addressLabelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    deliveryLabel: {
        fontSize: TYPOGRAPHY.sm,
        color: COLORS.textSecondary,
        fontWeight: '600',
        marginLeft: SPACING.xs,
    },
    changeButton: {
        paddingVertical: 4,
        paddingHorizontal: 8,
    },
    changeText: {
        fontSize: TYPOGRAPHY.xs,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    addressContent: {
        paddingTop: SPACING.xs,
    },
    nameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    addressName: {
        fontSize: TYPOGRAPHY.base,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
        marginRight: SPACING.sm,
    },
    addressTag: {
        backgroundColor: `${COLORS.primary}15`,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    addressTagText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    addressTextDetail: {
        fontSize: TYPOGRAPHY.sm,
        color: COLORS.textSecondary,
        marginBottom: 2,
        lineHeight: 18,
    },
    phoneText: {
        fontSize: TYPOGRAPHY.sm,
        color: COLORS.textPrimary,
        marginTop: 4,
        fontWeight: '500',
    },
    productsHeader: {
        marginBottom: SPACING.sm,
        paddingHorizontal: SPACING.md,
        marginTop: SPACING.sm,
    },
    sectionTitle: {
        fontSize: TYPOGRAPHY.base,
        fontWeight: TYPOGRAPHY.bold,
        color: COLORS.textPrimary,
        marginLeft: SPACING.xs,
    },
    cartItem: {
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.md,
        padding: SPACING.md,
        marginTop: SPACING.sm,
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
        marginTop: SPACING.md,
        marginBottom: SPACING.sm,
    },
    emptyText: {
        fontSize: TYPOGRAPHY.base,
        color: COLORS.textSecondary,
        textAlign: 'center',
    },
    emptyImage: {
        width: 200,
        height: 200,
        marginBottom: SPACING.md,
    },
    footer: {
        backgroundColor: COLORS.white,
        padding: LAYOUT.screenPadding,
        marginTop: SPACING.lg,
        borderRadius: BORDER_RADIUS.md,
        ...SHADOWS.sm,
        marginBottom: SPACING.xl,
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
