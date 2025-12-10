import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { APP_CONFIG } from '../../constants/config';
import { BORDER_RADIUS, COLORS, LAYOUT, SPACING, TYPOGRAPHY } from '../../constants/theme';
import { useCart } from '../../context/CartContext';
import { CartStackParamList } from '../../types';
import {
    validatePhone,
    validatePincode,
    validateRequired,
} from '../../utils/validation';

type CheckoutScreenNavigationProp = NativeStackNavigationProp<CartStackParamList, 'Checkout'>;

interface Props {
    navigation: CheckoutScreenNavigationProp;
}

const CheckoutScreen: React.FC<Props> = ({ navigation }) => {
    const { total, clearCart } = useCart();
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        landmark: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);

    const updateField = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
        if (errors[field]) {
            setErrors({ ...errors, [field]: '' });
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        const nameValidation = validateRequired(formData.fullName, 'Full name');
        if (!nameValidation.isValid) newErrors.fullName = nameValidation.error!;

        const phoneValidation = validatePhone(formData.phone);
        if (!phoneValidation.isValid) newErrors.phone = phoneValidation.error!;

        const addressValidation = validateRequired(formData.address, 'Address');
        if (!addressValidation.isValid) newErrors.address = addressValidation.error!;

        const cityValidation = validateRequired(formData.city, 'City');
        if (!cityValidation.isValid) newErrors.city = cityValidation.error!;

        const stateValidation = validateRequired(formData.state, 'State');
        if (!stateValidation.isValid) newErrors.state = stateValidation.error!;

        const pincodeValidation = validatePincode(formData.pincode);
        if (!pincodeValidation.isValid) newErrors.pincode = pincodeValidation.error!;

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePlaceOrder = async () => {
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        try {
            // Simulate order placement
            await new Promise((resolve) => setTimeout(resolve, 1500));

            Alert.alert(
                'Order Placed Successfully!',
                'Your order has been placed. You will receive a confirmation email shortly.',
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            clearCart();
                            navigation.navigate('Cart');
                        },
                    },
                ]
            );
        } catch (error) {
            Alert.alert('Error', 'Failed to place order. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Delivery Address */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Delivery Address</Text>

                    <Input
                        label="Full Name"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChangeText={(text) => updateField('fullName', text)}
                        error={errors.fullName}
                        editable={!isLoading}
                    />

                    <Input
                        label="Phone Number"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChangeText={(text) => updateField('phone', text)}
                        keyboardType="phone-pad"
                        error={errors.phone}
                        editable={!isLoading}
                        maxLength={10}
                    />

                    <Input
                        label="Address"
                        placeholder="House no., Building name"
                        value={formData.address}
                        onChangeText={(text) => updateField('address', text)}
                        error={errors.address}
                        editable={!isLoading}
                        multiline
                    />

                    <Input
                        label="Landmark (Optional)"
                        placeholder="Nearby landmark"
                        value={formData.landmark}
                        onChangeText={(text) => updateField('landmark', text)}
                        editable={!isLoading}
                    />

                    <View style={styles.row}>
                        <Input
                            label="City"
                            placeholder="City"
                            value={formData.city}
                            onChangeText={(text) => updateField('city', text)}
                            error={errors.city}
                            editable={!isLoading}
                            containerStyle={styles.halfInput}
                        />

                        <Input
                            label="State"
                            placeholder="State"
                            value={formData.state}
                            onChangeText={(text) => updateField('state', text)}
                            error={errors.state}
                            editable={!isLoading}
                            containerStyle={styles.halfInput}
                        />
                    </View>

                    <Input
                        label="Pincode"
                        placeholder="Enter pincode"
                        value={formData.pincode}
                        onChangeText={(text) => updateField('pincode', text)}
                        keyboardType="number-pad"
                        error={errors.pincode}
                        editable={!isLoading}
                        maxLength={6}
                    />
                </View>

                {/* Payment Method */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Payment Method</Text>
                    <View style={styles.paymentOption}>
                        <Text style={styles.paymentText}>Cash on Delivery</Text>
                    </View>
                </View>

                {/* Order Summary */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Order Summary</Text>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Subtotal</Text>
                        <Text style={styles.summaryValue}>
                            {APP_CONFIG.CURRENCY}{total}
                        </Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Delivery Charges</Text>
                        <Text style={styles.summaryValue}>FREE</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.summaryRow}>
                        <Text style={styles.totalLabel}>Total Amount</Text>
                        <Text style={styles.totalValue}>
                            {APP_CONFIG.CURRENCY}{total}
                        </Text>
                    </View>
                </View>
            </ScrollView>

            {/* Place Order Button */}
            <View style={styles.footer}>
                <Button
                    title="Place Order"
                    onPress={handlePlaceOrder}
                    loading={isLoading}
                    disabled={isLoading}
                    fullWidth
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
    scrollContent: {
        padding: LAYOUT.screenPadding,
    },
    section: {
        marginBottom: SPACING.xl,
    },
    sectionTitle: {
        fontSize: TYPOGRAPHY.lg,
        fontWeight: TYPOGRAPHY.bold,
        color: COLORS.textPrimary,
        marginBottom: SPACING.base,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    halfInput: {
        width: '48%',
    },
    paymentOption: {
        backgroundColor: COLORS.white,
        padding: SPACING.base,
        borderRadius: BORDER_RADIUS.base,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    paymentText: {
        fontSize: TYPOGRAPHY.base,
        color: COLORS.textPrimary,
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
    footer: {
        backgroundColor: COLORS.white,
        padding: LAYOUT.screenPadding,
        borderTopWidth: 1,
        borderTopColor: COLORS.borderLight,
    },
});

export default CheckoutScreen;
