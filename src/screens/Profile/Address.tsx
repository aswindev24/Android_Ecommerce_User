import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator,
    Switch,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { BORDER_RADIUS, COLORS, LAYOUT, SHADOWS, SPACING, TYPOGRAPHY } from '../../constants/theme';
import { ProfileStackParamList, SavedAddress } from '../../types';
import * as addressService from '../../services/address.service';
import { useLocation } from '../../context/LocationContext';

type AddressScreenNavigationProp = NativeStackNavigationProp<ProfileStackParamList, 'Address'>;

interface Props {
    navigation: AddressScreenNavigationProp;
}

const AddressScreen: React.FC<Props> = ({ navigation }) => {
    const { addresses, refreshAddresses, loading: contextLoading } = useLocation();
    const [submitting, setSubmitting] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Partial<SavedAddress>>({
        type: 'Home',
        isDefault: false,
    });

    const handleSaveAddress = async () => {
        if (!formData.fullName || !formData.phone || !formData.address || !formData.city || !formData.state || !formData.pincode) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Please fill in all required fields',
            });
            return;
        }

        try {
            setSubmitting(true);
            if (isEditing && editingId) {
                await addressService.updateAddress(editingId, formData);
                Toast.show({
                    type: 'success',
                    text1: 'Address Updated',
                    text2: 'Your address has been updated successfully',
                });
            } else {
                await addressService.createAddress(formData);
                Toast.show({
                    type: 'success',
                    text1: 'Address Saved',
                    text2: 'Your new address has been added successfully',
                });
            }
            setShowForm(false);
            setFormData({ type: 'Home', isDefault: false });
            setIsEditing(false);
            setEditingId(null);
            refreshAddresses();
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.message || 'Failed to save address',
            });
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteAddress = async (id: string) => {
        try {
            await addressService.deleteAddress(id);
            Toast.show({
                type: 'success',
                text1: 'Address Deleted',
                text2: 'The address has been removed',
            });
            refreshAddresses();
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.message || 'Failed to delete address',
            });
        }
    };

    const handleSetDefaultAddress = async (id: string) => {
        try {
            setSubmitting(true);
            await addressService.updateAddress(id, { isDefault: true });
            Toast.show({
                type: 'success',
                text1: 'Default Address Updated',
                text2: 'This address is now your default delivery location',
            });
            refreshAddresses();
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.message || 'Failed to set default address',
            });
        } finally {
            setSubmitting(false);
        }
    };

    const handleEditAddress = (item: SavedAddress) => {
        setFormData({
            fullName: item.fullName,
            phone: item.phone,
            address: item.address,
            city: item.city,
            state: item.state,
            pincode: item.pincode,
            landmark: item.landmark,
            type: item.type,
            isDefault: item.isDefault,
        });
        setEditingId(item.id);
        setIsEditing(true);
        setShowForm(true);
    };

    const renderAddressItem = ({ item }: { item: SavedAddress }) => (
        <View style={styles.addressCard}>
            <View style={styles.addressHeader}>
                <View style={styles.typeTag}>
                    <Ionicons
                        name={item.type === 'Home' ? 'home' : item.type === 'Work' ? 'briefcase' : 'location'}
                        size={14}
                        color={COLORS.primary}
                    />
                    <Text style={styles.typeText}>{item.type}</Text>
                </View>
                {item.isDefault && (
                    <View style={styles.defaultTag}>
                        <Text style={styles.defaultText}>DEFAULT</Text>
                    </View>
                )}
            </View>

            <Text style={styles.name}>{item.fullName}</Text>
            <Text style={styles.address}>{item.address}</Text>
            <Text style={styles.address}>
                {item.city}, {item.state} - {item.pincode}
            </Text>
            {item.landmark && <Text style={styles.address}>Landmark: {item.landmark}</Text>}
            <Text style={styles.phone}>Phone: {item.phone}</Text>

            <View style={styles.actions}>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleEditAddress(item)}
                >
                    <Ionicons name="create-outline" size={18} color={COLORS.primary} />
                    <Text style={[styles.actionText, { color: COLORS.primary }]}>Edit</Text>
                </TouchableOpacity>
                {!item.isDefault && (
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => handleSetDefaultAddress(item.id)}
                        disabled={submitting}
                    >
                        <Ionicons name="checkmark-circle-outline" size={18} color={COLORS.success} />
                        <Text style={[styles.actionText, { color: COLORS.success }]}>Set Default</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleDeleteAddress(item.id)}
                >
                    <Ionicons name="trash-outline" size={18} color={COLORS.error} />
                    <Text style={[styles.actionText, { color: COLORS.error }]}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    if (contextLoading && !submitting) {
        return (
            <View style={[styles.container, styles.centered]}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    if (showForm) {
        return (
            <View style={styles.container}>
                <StatusBar style="light" backgroundColor={COLORS.primary} />
                <ScrollView contentContainerStyle={styles.formContainer}>
                    <Text style={styles.formTitle}>{isEditing ? 'Edit Address' : 'Add New Address'}</Text>

                    <View style={styles.typeSelector}>
                        {(['Home', 'Work', 'Other'] as const).map((type) => (
                            <TouchableOpacity
                                key={type}
                                style={[
                                    styles.typeOption,
                                    formData.type === type && styles.typeOptionSelected
                                ]}
                                onPress={() => setFormData({ ...formData, type })}
                            >
                                <Text
                                    style={[
                                        styles.typeOptionText,
                                        formData.type === type && styles.typeOptionTextSelected
                                    ]}
                                >
                                    {type}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Input
                        label="Full Name"
                        value={formData.fullName}
                        onChangeText={(text) => setFormData({ ...formData, fullName: text })}
                        placeholder="Enter full name"
                    />
                    <Input
                        label="Phone Number"
                        value={formData.phone}
                        onChangeText={(text) => setFormData({ ...formData, phone: text })}
                        placeholder="Enter phone number"
                        keyboardType="phone-pad"
                        maxLength={10}
                    />
                    <Input
                        label="Address"
                        value={formData.address}
                        onChangeText={(text) => setFormData({ ...formData, address: text })}
                        placeholder="House no., Building, Street"
                        multiline
                    />
                    <View style={styles.row}>
                        <Input
                            label="City"
                            value={formData.city}
                            onChangeText={(text) => setFormData({ ...formData, city: text })}
                            placeholder="City"
                            containerStyle={styles.halfInput}
                        />
                        <Input
                            label="State"
                            value={formData.state}
                            onChangeText={(text) => setFormData({ ...formData, state: text })}
                            placeholder="State"
                            containerStyle={styles.halfInput}
                        />
                    </View>
                    <View style={styles.row}>
                        <Input
                            label="Pincode"
                            value={formData.pincode}
                            onChangeText={(text) => setFormData({ ...formData, pincode: text })}
                            placeholder="Pincode"
                            keyboardType="number-pad"
                            maxLength={6}
                            containerStyle={styles.halfInput}
                        />
                        <Input
                            label="Landmark (Optional)"
                            value={formData.landmark}
                            onChangeText={(text) => setFormData({ ...formData, landmark: text })}
                            placeholder="Landmark"
                            containerStyle={styles.halfInput}
                        />
                    </View>

                    <View style={styles.defaultSection}>
                        <Text style={styles.defaultLabel}>Set as Default Address</Text>
                        <Switch
                            value={formData.isDefault}
                            onValueChange={(value) => setFormData({ ...formData, isDefault: value })}
                            trackColor={{ false: COLORS.gray300, true: `${COLORS.primary}40` }}
                            thumbColor={formData.isDefault ? COLORS.primary : COLORS.gray400}
                        />
                    </View>

                    <View style={styles.formActions}>
                        <Button
                            title="Cancel"
                            onPress={() => {
                                setShowForm(false);
                                setIsEditing(false);
                                setEditingId(null);
                                setFormData({ type: 'Home', isDefault: false });
                            }}
                            style={styles.cancelButton}
                            textStyle={{ color: COLORS.white }}
                        />
                        <Button
                            title={isEditing ? "Update Address" : "Save Address"}
                            onPress={handleSaveAddress}
                            loading={submitting}
                            disabled={submitting}
                            style={styles.saveButton}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar style="light" backgroundColor={COLORS.primary} />
            <FlatList
                data={addresses}
                renderItem={renderAddressItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={() => (
                    <View style={styles.emptyContainer}>
                        <Ionicons name="location-outline" size={80} color={COLORS.gray300} />
                        <Text style={styles.emptyText}>No addresses saved yet</Text>
                    </View>
                )}
                ListFooterComponent={() => (
                    <Button
                        title="+ Add New Address"
                        onPress={() => {
                            setIsEditing(false);
                            setEditingId(null);
                            setFormData({ type: 'Home' });
                            setShowForm(true);
                        }}
                        style={styles.addButton}
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundLight,
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContent: {
        padding: SPACING.md,
        flexGrow: 1,
    },
    addressCard: {
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.md,
        padding: SPACING.md,
        marginBottom: SPACING.md,
        ...SHADOWS.sm,
    },
    addressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SPACING.sm,
    },
    typeTag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: `${COLORS.primary}15`,
        paddingHorizontal: SPACING.sm,
        paddingVertical: 4,
        borderRadius: BORDER_RADIUS.sm,
    },
    typeText: {
        fontSize: TYPOGRAPHY.xs,
        color: COLORS.primary,
        fontWeight: '600',
        marginLeft: 4,
    },
    defaultTag: {
        backgroundColor: COLORS.gray200,
        paddingHorizontal: SPACING.sm,
        paddingVertical: 4,
        borderRadius: BORDER_RADIUS.sm,
    },
    defaultText: {
        fontSize: TYPOGRAPHY.xs,
        color: COLORS.gray600,
        fontWeight: '600',
    },
    name: {
        fontSize: TYPOGRAPHY.base,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
        marginBottom: 4,
    },
    address: {
        fontSize: TYPOGRAPHY.sm,
        color: COLORS.textSecondary,
        marginBottom: 2,
    },
    phone: {
        fontSize: TYPOGRAPHY.sm,
        color: COLORS.textPrimary,
        marginTop: SPACING.xs,
        fontWeight: '500',
    },
    actions: {
        flexDirection: 'row',
        marginTop: SPACING.md,
        borderTopWidth: 1,
        borderTopColor: COLORS.borderLight,
        paddingTop: SPACING.sm,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: SPACING.lg,
    },
    actionText: {
        fontSize: TYPOGRAPHY.sm,
        fontWeight: '500',
        marginLeft: 4,
    },
    addButton: {
        marginVertical: SPACING.md,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: SPACING.xl * 2,
    },
    emptyText: {
        fontSize: TYPOGRAPHY.base,
        color: COLORS.gray500,
        marginTop: SPACING.md,
    },
    formContainer: {
        padding: SPACING.lg,
    },
    formTitle: {
        fontSize: TYPOGRAPHY.xl,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
        marginBottom: SPACING.lg,
    },
    typeSelector: {
        flexDirection: 'row',
        marginBottom: SPACING.lg,
    },
    typeOption: {
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.sm,
        borderRadius: BORDER_RADIUS.full,
        borderWidth: 1,
        borderColor: COLORS.border,
        marginRight: SPACING.sm,
    },
    typeOptionSelected: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    typeOptionText: {
        color: COLORS.textSecondary,
        fontWeight: '500',
    },
    typeOptionTextSelected: {
        color: COLORS.white,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    halfInput: {
        width: '48%',
    },
    formActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: SPACING.lg,
    },
    cancelButton: {
        backgroundColor: COLORS.error,
        flex: 1,
        marginRight: SPACING.sm,
        borderColor: COLORS.error,
    },
    saveButton: {
        flex: 1,
        marginLeft: SPACING.sm,
    },
    defaultSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: SPACING.md,
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.md,
        paddingHorizontal: SPACING.md,
        marginBottom: SPACING.lg,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
    },
    defaultLabel: {
        fontSize: TYPOGRAPHY.base,
        color: COLORS.textPrimary,
        fontWeight: '500',
    },
});

export default AddressScreen;
