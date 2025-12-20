import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { APP_CONFIG } from '../../constants/config';
import { BORDER_RADIUS, COLORS, LAYOUT, SHADOWS, SPACING, TYPOGRAPHY } from '../../constants/theme';
import { useCart } from '../../context/CartContext';
import { CartStackParamList } from '../../types';
import { useLocation } from '../../context/LocationContext';

type CheckoutScreenNavigationProp = NativeStackNavigationProp<CartStackParamList, 'Checkout'>;

interface Props {
    navigation: CheckoutScreenNavigationProp;
}

const CheckoutScreen: React.FC<Props> = ({ navigation }) => {
    const { total, clearCart } = useCart();
    const { selectedAddress } = useLocation();
    const [selectedPayment, setSelectedPayment] = useState<'cod' | 'razorpay'>('cod');
    const [isLoading, setIsLoading] = useState(false);

    const handlePlaceOrder = async () => {
        if (!selectedAddress) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Please select a delivery address first',
                position: 'bottom'
            });
            return;
        }

        setIsLoading(true);
        try {
            // Simulate order placement
            await new Promise((resolve) => setTimeout(resolve, 1000));

            Toast.show({
                type: 'success',
                text1: 'Order Placed Successfully!',
                text2: `Payment via ${selectedPayment === 'cod' ? 'Cash on Delivery' : 'Razorpay'}`,
                position: 'bottom'
            });

            setTimeout(() => {
                clearCart();
                navigation.navigate('Cart');
            }, 1500);

        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to place order. Please try again.',
                position: 'bottom'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" backgroundColor={COLORS.primary} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Delivery Address */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Shipping Address</Text>
                    <View style={styles.addressCard}>
                        {selectedAddress ? (
                            <>
                                <View style={styles.addressHeaderRow}>
                                    <Text style={styles.addressName}>{selectedAddress.fullName}</Text>
                                    <View style={styles.addressTag}>
                                        <Text style={styles.addressTagText}>{selectedAddress.type.toUpperCase()}</Text>
                                    </View>
                                </View>
                                <Text style={styles.addressText}>{selectedAddress.address}</Text>
                                <Text style={styles.addressText}>
                                    {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pincode}
                                </Text>
                                <Text style={styles.phoneText}>{selectedAddress.phone}</Text>
                            </>
                        ) : (
                            <Text style={styles.addressText}>No address selected. Please go back to the cart to select one.</Text>
                        )}
                    </View>
                </View>

                {/* Payment Method */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Payment Method</Text>

                    <TouchableOpacity
                        style={[
                            styles.paymentOption,
                            selectedPayment === 'cod' && styles.paymentOptionSelected
                        ]}
                        onPress={() => setSelectedPayment('cod')}
                    >
                        <View style={styles.paymentRow}>
                            <View style={[styles.radio, selectedPayment === 'cod' && styles.radioSelected]} />
                            <Text style={styles.paymentText}>Cash on Delivery (COD)</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.paymentOption,
                            selectedPayment === 'razorpay' && styles.paymentOptionSelected
                        ]}
                        onPress={() => setSelectedPayment('razorpay')}
                    >
                        <View style={styles.paymentRow}>
                            <View style={[styles.radio, selectedPayment === 'razorpay' && styles.radioSelected]} />
                            <Text style={styles.paymentText}>Razorpay / UPI / NetBanking</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Order Summary */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Order Summary</Text>
                    <View style={styles.summaryContainer}>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Subtotal</Text>
                            <Text style={styles.summaryValue}>
                                {APP_CONFIG.CURRENCY}{total}
                            </Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Delivery Charges</Text>
                            <Text style={[styles.summaryValue, { color: COLORS.success }]}>FREE</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.summaryRow}>
                            <Text style={styles.totalLabel}>Total Amount</Text>
                            <Text style={styles.totalValue}>
                                {APP_CONFIG.CURRENCY}{total}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Place Order Button */}
                <Button
                    title="Place Order"
                    onPress={handlePlaceOrder}
                    loading={isLoading}
                    disabled={isLoading}
                    fullWidth
                    style={styles.placeOrderButton}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scrollContent: {
        padding: LAYOUT.screenPadding,
    },
    section: {
        marginBottom: SPACING.lg,
    },
    sectionTitle: {
        fontSize: TYPOGRAPHY.lg,
        fontWeight: TYPOGRAPHY.bold,
        color: COLORS.textPrimary,
        marginBottom: SPACING.md,
    },
    addressCard: {
        backgroundColor: COLORS.white,
        padding: SPACING.md,
        borderRadius: BORDER_RADIUS.md,
        ...SHADOWS.sm,
    },
    addressHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.sm,
    },
    addressName: {
        fontSize: TYPOGRAPHY.base,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
        marginRight: SPACING.sm,
    },
    addressTag: {
        backgroundColor: `${COLORS.primary}15`,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    addressTagText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    addressText: {
        fontSize: TYPOGRAPHY.sm,
        color: COLORS.textSecondary,
        marginBottom: 2,
        lineHeight: 20,
    },
    phoneText: {
        fontSize: TYPOGRAPHY.sm,
        color: COLORS.textPrimary,
        marginTop: SPACING.sm,
        fontWeight: '500',
    },
    paymentOption: {
        backgroundColor: COLORS.white,
        padding: SPACING.md,
        borderRadius: BORDER_RADIUS.md,
        marginBottom: SPACING.sm,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
        ...SHADOWS.sm,
    },
    paymentOptionSelected: {
        borderColor: COLORS.primary,

    },
    paymentRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radio: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: COLORS.gray400,
        marginRight: SPACING.md,
    },
    radioSelected: {
        borderColor: COLORS.primary,
        borderWidth: 6,
    },
    paymentText: {
        fontSize: TYPOGRAPHY.base,
        fontWeight: '500',
        color: COLORS.textPrimary,
    },
    summaryContainer: {
        backgroundColor: COLORS.white,
        padding: SPACING.md,
        borderRadius: BORDER_RADIUS.md,
        ...SHADOWS.sm,
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
        backgroundColor: COLORS.borderLight,
        marginVertical: SPACING.sm,
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
    placeOrderButton: {
        marginTop: SPACING.md,
        marginBottom: SPACING.xl,
    },
});

export default CheckoutScreen;
