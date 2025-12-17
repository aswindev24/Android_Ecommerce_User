import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    Modal,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, LAYOUT, SPACING } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';
import { Category, HomeStackParamList } from '../../types';

const { width } = Dimensions.get('window');

type HomeScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'Home'>;

interface HeaderProps {
    navigation: HomeScreenNavigationProp;
    categories: Category[];
    onCategoryPress: (categoryId: string, categoryName: string) => void;
}

const Header: React.FC<HeaderProps> = ({ navigation, categories, onCategoryPress }) => {
    const { user } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const insets = useSafeAreaInsets();
    const [showAddressModal, setShowAddressModal] = useState(false);

    // Sample addresses - in a real app, these would come from your backend or user context
    const [addresses] = useState([
        { id: '1', name: 'Home', address: 'Kuttiattoor, Calicut, Kerala, 673508' },
        { id: '2', name: 'Office', address: 'Cyber Park, Calicut, Kerala, 673014' },
        { id: '3', name: 'Parents House', address: 'Vadakara, Kozhikode, Kerala, 673101' },
    ]);

    const [selectedAddress, setSelectedAddress] = useState(addresses[0]);

    const renderCategory = ({ item }: { item: Category }) => (
        <TouchableOpacity
            style={styles.categoryCard}
            onPress={() => onCategoryPress(item.id, item.name)}
            activeOpacity={0.7}
        >
            <View style={styles.categoryIconContainer}>
                {item.icon ? (
                    <Ionicons name={item.icon as any} size={24} color="#ffffffff" />
                ) : (
                    <Image source={{ uri: item.image }} style={styles.categoryIcon} />
                )}
            </View>
            <Text style={styles.categoryName} numberOfLines={1}>{item.name}</Text>
        </TouchableOpacity>
    );

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigation.navigate('ProductList', {
                categoryId: 'search',
                categoryName: 'Search Results',
                searchQuery: searchQuery.trim()
            });
        }
    };

    const handleSelectAddress = (address: typeof addresses[0]) => {
        setSelectedAddress(address);
        setShowAddressModal(false);
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            {/* Service Pills and Location */}
            <View style={styles.pillsContainer}>
                <TouchableOpacity style={styles.flipkartPill}>
                    <Ionicons name="flash" size={16} color="#2874F0" />
                    <Text style={styles.flipkartText}>Lestora</Text>
                </TouchableOpacity>

                {/* Location Bar */}
                <TouchableOpacity
                    style={styles.locationBar}
                    onPress={() => setShowAddressModal(true)}
                    activeOpacity={0.7}
                >
                    <Ionicons name="home" size={14} color="#2874F0" />
                    <Text style={styles.locationText} numberOfLines={1}>
                        {selectedAddress.address}
                    </Text>
                    <Ionicons name="chevron-down" size={14} color="#2874F0" />
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={styles.searchSection}>
                <View style={styles.searchBar}>
                    <Ionicons
                        name="search"
                        size={20}
                        color="#717478"
                        style={styles.searchIcon}
                    />
                    <TextInput
                        placeholder="mobiles"
                        placeholderTextColor="#717478"
                        style={styles.searchInput}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        onSubmitEditing={handleSearch}
                        returnKeyType="search"
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity
                            onPress={() => setSearchQuery('')}
                            style={styles.clearButton}
                        >
                            <Ionicons name="close" size={18} color="#717478" />
                        </TouchableOpacity>
                    )}

                </View>


            </View>

            {/* Categories */}
            <View style={styles.categoriesContainer}>
                <FlatList
                    data={categories}
                    renderItem={renderCategory}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoriesList}
                />
            </View>

            {/* Address Selector Modal */}
            <Modal
                visible={showAddressModal}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowAddressModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        {/* Modal Header */}
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Select Delivery Address</Text>
                            <TouchableOpacity
                                onPress={() => setShowAddressModal(false)}
                                style={styles.closeButton}
                            >
                                <Ionicons name="close" size={24} color={COLORS.textPrimary} />
                            </TouchableOpacity>
                        </View>

                        {/* Address List */}
                        <View style={styles.addressList}>
                            {addresses.map((address) => (
                                <TouchableOpacity
                                    key={address.id}
                                    style={styles.addressItem}
                                    onPress={() => handleSelectAddress(address)}
                                    activeOpacity={0.7}
                                >
                                    <View style={styles.addressInfo}>
                                        <View style={styles.addressIcon}>
                                            <Ionicons
                                                name={address.name === 'Home' ? 'home' : address.name === 'Office' ? 'briefcase' : 'location'}
                                                size={20}
                                                color={COLORS.primary}
                                            />
                                        </View>
                                        <View style={styles.addressDetails}>
                                            <Text style={styles.addressName}>{address.name}</Text>
                                            <Text style={styles.addressText}>{address.address}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.radioButton}>
                                        {selectedAddress.id === address.id && (
                                            <View style={styles.radioButtonSelected} />
                                        )}
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Add New Address Button */}
                        <TouchableOpacity style={styles.addAddressButton}>
                            <Ionicons name="add-circle" size={20} color={COLORS.primary} />
                            <Text style={styles.addAddressText}>Add New Address</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2874F0',
        zIndex: 100,
    },
    pillsContainer: {
        flexDirection: 'row',
        paddingHorizontal: LAYOUT.screenPadding,
        paddingTop: 0,
        paddingBottom: SPACING.sm,
        alignItems: 'center',
        gap: SPACING.sm,
    },

    flipkartPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFE500',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        gap: 4
    },
    flipkartText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#2874F0',
    },
    servicePill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        gap: 4,
    },
    payIcon: {
        width: 16,
        height: 16,
        borderRadius: 4,
        backgroundColor: '#2874F0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    payText: {
        fontSize: 10,
        fontWeight: '700',
        color: COLORS.white,
    },
    serviceText: {
        fontSize: 13,
        fontWeight: '500',
        color: '#2874F0',
    },
    locationBar: {
        backgroundColor: '#FFE500',
        flex: 1,
        width: '100%',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        gap: SPACING.sm,
        marginLeft: SPACING.md,
    },
    locationText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2874F0',
        flex: 1,
    },
    searchSection: {
        flexDirection: 'row',
        paddingHorizontal: LAYOUT.screenPadding,
        paddingVertical: SPACING.sm,
        gap: SPACING.sm,
        alignItems: 'center',
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: 8,
        paddingHorizontal: 12,
        height: 44,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: '#000',
        paddingVertical: 0,
    },
    clearButton: {
        padding: 4,
        marginRight: 4,
    },
    cameraButton: {
        padding: 4,
        marginLeft: 4,
    },
    qrButton: {
        width: 44,
        height: 44,
        borderRadius: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoriesContainer: {
        paddingVertical: SPACING.md,
        backgroundColor: '#2874F0',
    },
    categoriesList: {
        paddingHorizontal: LAYOUT.screenPadding,
    },
    categoryCard: {
        alignItems: 'center',
        marginRight: SPACING.lg,
        width: 60,

    },
    categoryIconContainer: {
        width: 48,
        height: 48,
        backgroundColor: '#1f61caff',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 4,
        padding: 8,

    },
    categoryIcon: {
        color: '#ffffffff',
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    categoryName: {
        fontSize: 11,
        fontWeight: '500',
        color: COLORS.white,
        textAlign: 'center',
    },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: SPACING['2xl'],
        maxHeight: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: LAYOUT.screenPadding,
        paddingVertical: SPACING.lg,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.textPrimary,
    },
    closeButton: {
        padding: SPACING.xs,
    },
    addressList: {
        paddingHorizontal: LAYOUT.screenPadding,
        paddingTop: SPACING.md,
    },
    addressItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: SPACING.md,
        paddingHorizontal: SPACING.md,
        backgroundColor: COLORS.backgroundLight,
        borderRadius: 12,
        marginBottom: SPACING.md,
    },
    addressInfo: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        flex: 1,
        marginRight: SPACING.md,
    },
    addressIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SPACING.md,
    },
    addressDetails: {
        flex: 1,
    },
    addressName: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.textPrimary,
        marginBottom: 4,
    },
    addressText: {
        fontSize: 14,
        color: COLORS.textSecondary,
        lineHeight: 20,
    },
    radioButton: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioButtonSelected: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: COLORS.primary,
    },
    addAddressButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: SPACING.md,
        paddingHorizontal: LAYOUT.screenPadding,
        marginHorizontal: LAYOUT.screenPadding,
        marginTop: SPACING.md,
        backgroundColor: COLORS.backgroundLight,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderStyle: 'dashed',
    },
    addAddressText: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.primary,
        marginLeft: SPACING.sm,
    },
});

export default Header;