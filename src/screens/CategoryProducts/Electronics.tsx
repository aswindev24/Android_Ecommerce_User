import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BORDER_RADIUS, COLORS, LAYOUT, SPACING, TYPOGRAPHY } from '../../constants/theme';
import { useCart } from '../../context/CartContext';
import { dummyProducts } from '../../data/dummyData';
import { HomeStackParamList, Product } from '../../types';

type ElectronicsScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'Electronics'>;

interface Props {
    navigation: ElectronicsScreenNavigationProp;
}

const Electronics: React.FC<Props> = ({ navigation }) => {
    const { addToCart } = useCart();
    const [products, setProducts] = useState<Product[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const insets = useSafeAreaInsets();
    const CATEGORY_NAME = 'Electronics';

    useEffect(() => {
        // Hide default header
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);

    useEffect(() => {
        const filteredProducts = dummyProducts.filter(
            (p) =>
                p.category === CATEGORY_NAME &&
                p.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setProducts(filteredProducts);
    }, [searchQuery]);

    const handleProductPress = (productId: string) => {
        navigation.navigate('ProductDetail', { productId });
    };

    const renderProduct = ({ item }: { item: Product }) => (
        <TouchableOpacity
            style={styles.productCard}
            onPress={() => handleProductPress(item.id)}
            activeOpacity={0.9}
        >
            {/* Left: Image */}
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: item.image }}
                    style={styles.productImage}
                    resizeMode="contain"
                />
                {/* Wishlist Heart Icon */}
                {/* <TouchableOpacity style={styles.wishlistIcon}>
                    <Ionicons name="heart-outline" size={20} color={COLORS.gray400} />
                </TouchableOpacity> */}
            </View>

            {/* Right: Details */}
            <View style={styles.detailsContainer}>
                <Text style={styles.productName} numberOfLines={2}>
                    {item.title}
                </Text>

                {/* Rating Row */}
                <View style={styles.ratingRow}>
                    <View style={styles.ratingBadge}>
                        <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
                        <Ionicons name="star" size={10} color={COLORS.white} />
                    </View>
                    <Text style={styles.reviewCount}>({item.reviews?.toLocaleString() || '120'})</Text>
                </View>

                {/* Price Row */}
                <View style={styles.priceRow}>
                    <Ionicons name="arrow-down" size={12} color="#388E3C" />
                    <Text style={styles.discountText}>
                        {item.originalPrice ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100) : 10}%
                    </Text>
                    <Text style={styles.originalPrice}>
                        ₹{item.originalPrice?.toLocaleString() || (item.price * 1.2).toLocaleString()}
                    </Text>
                    <Text style={styles.currentPrice}>₹{item.price.toLocaleString()}</Text>
                </View>

                {/* Bank Offer */}
                <Text style={styles.bankOffer}>
                    <Text style={styles.wowText}>WOW! </Text>
                    ₹{(item.price * 0.9).toFixed(0)} with Bank offer
                </Text>

                {/* Free Delivery */}
                <Text style={styles.deliveryText}>Free delivery</Text>

                {/* Few Left Badge */}
                <Text style={styles.fewLeftText}>Only few left</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar style="light" backgroundColor={COLORS.primary} />
            {/* Custom Header */}
            <View style={[styles.header, { paddingTop: insets.top + SPACING.xs }]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={COLORS.white} />
                </TouchableOpacity>
                <View style={styles.searchBar}>
                    <Ionicons name="search" size={20} color={COLORS.gray600} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search Electronics..."
                        placeholderTextColor={COLORS.textSecondary}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
                <TouchableOpacity style={styles.cartButton}>
                    <Ionicons name="cart-outline" size={24} color={COLORS.white} />
                </TouchableOpacity>
            </View>

            <FlatList
                data={products}
                renderItem={renderProduct}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.sm,
        paddingBottom: SPACING.sm,
        backgroundColor: COLORS.primary,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        borderBottomWidth: 0,
    },
    backButton: {
        padding: SPACING.xs,
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.sm,
        paddingHorizontal: SPACING.sm,
        paddingVertical: 8,
        marginHorizontal: SPACING.sm,
        borderWidth: 0,
    },
    searchInput: {
        flex: 1,
        marginLeft: SPACING.sm,
        color: COLORS.textPrimary,
        fontSize: TYPOGRAPHY.base,
        padding: 0,
    },
    cartButton: {
        padding: SPACING.xs,
    },
    list: {
        paddingBottom: SPACING.xl,
    },
    productCard: {
        flexDirection: 'row',
        padding: SPACING.md,
        backgroundColor: COLORS.white,
        minHeight: 160,
    },
    imageContainer: {
        width: 100,
        height: 120,
        marginRight: SPACING.md,
        position: 'relative',
    },
    productImage: {
        width: '100%',
        height: '100%',
    },
    wishlistIcon: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: 4,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },
    detailsContainer: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    productName: {
        fontSize: TYPOGRAPHY.base,
        color: COLORS.textPrimary,
        marginBottom: SPACING.xs,
        lineHeight: 22,
        fontWeight: '500',
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.xs,
    },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#388E3C',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        marginRight: SPACING.xs,
    },
    ratingText: {
        color: COLORS.white,
        fontSize: TYPOGRAPHY.xs,
        fontWeight: 'bold',
        marginRight: 2,
    },
    reviewCount: {
        color: COLORS.gray500,
        fontSize: TYPOGRAPHY.sm,
    },
    assuredBadge: {
        marginLeft: SPACING.xs,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.xs,
    },
    discountText: {
        color: '#388E3C',
        fontSize: TYPOGRAPHY.base,
        fontWeight: 'bold',
        marginRight: SPACING.xs,
    },
    originalPrice: {
        fontSize: TYPOGRAPHY.sm,
        color: COLORS.gray500,
        textDecorationLine: 'line-through',
        marginRight: SPACING.xs,
    },
    currentPrice: {
        fontSize: TYPOGRAPHY.lg,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
    },
    bankOffer: {
        fontSize: TYPOGRAPHY.xs,
        color: '#2874F0',
        marginBottom: 2,
        lineHeight: 16,
    },
    wowText: {
        fontWeight: 'bold',
        fontStyle: 'italic',
    },
    deliveryText: {
        fontSize: TYPOGRAPHY.xs,
        color: COLORS.textPrimary,
        marginBottom: 2,
    },
    fewLeftText: {
        fontSize: TYPOGRAPHY.xs,
        color: '#FF6161',
        fontWeight: '500',
    },
    separator: {
        height: 1,
        backgroundColor: COLORS.borderLight,
        marginHorizontal: SPACING.md,
    },
});


export default Electronics;