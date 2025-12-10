import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import ProductCard from '../../components/product/ProductCard';
import { BORDER_RADIUS, COLORS, LAYOUT, SPACING, TYPOGRAPHY } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { dummyCategories, dummyProducts } from '../../data/dummyData';
import { Category, HomeStackParamList, Product } from '../../types';
import Header from './Header'; // Import the new Header component

type HomeScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'Home'>;

interface Props {
    navigation: HomeScreenNavigationProp;
}

const { width } = Dimensions.get('window');

// Mock Offers Data
const OFFERS = [
    { id: '1', image: 'https://img.freepik.com/free-vector/flat-horizontal-sale-banner-template-with-photo_23-2148995331.jpg', title: 'Summer Sale' },
    { id: '2', image: 'https://img.freepik.com/free-vector/flat-horizontal-sale-banner-template-with-photo_23-2148995328.jpg', title: 'New Arrivals' },
    { id: '3', image: 'https://img.freepik.com/free-vector/flat-horizontal-sale-banner-template-with-photo_23-2148995331.jpg', title: 'Special Offer' },
];

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    const { user } = useAuth();
    const { addToCart } = useCart();
    const [refreshing, setRefreshing] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
    const [bestSellers, setBestSellers] = useState<Product[]>([]);
    const [currentOfferIndex, setCurrentOfferIndex] = useState(0);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setCategories(dummyCategories);
        setFeaturedProducts(dummyProducts.filter(p => p.isFeatured));
        setBestSellers(dummyProducts.filter(p => p.isBestSeller));
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        loadData();
        setRefreshing(false);
    };

    const handleProductPress = (productId: string) => {
        navigation.navigate('ProductDetail', { productId });
    };

    const handleCategoryPress = (categoryId: string, categoryName: string) => {
        navigation.navigate('ProductList', { categoryId, categoryName });
    };

    const handleAddToCart = async (product: Product) => {
        try {
            await addToCart(product, 1);
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    const renderOfferItem = ({ item }: { item: typeof OFFERS[0] }) => (
        <View style={styles.offerItem}>
            <Image source={{ uri: item.image }} style={styles.offerImage} resizeMode="cover" />
        </View>
    );

    return (

        <View style={styles.container}>
            {/* Header Section (Fixed) */}
            <Header
                navigation={navigation}
                categories={categories}
                onCategoryPress={handleCategoryPress}
            />

            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                contentContainerStyle={styles.scrollContent}
            >
                {/* Offer Carousel */}
                <View style={styles.carouselContainer}>
                    <FlatList
                        data={OFFERS}
                        renderItem={renderOfferItem}
                        keyExtractor={(item) => item.id}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onMomentumScrollEnd={(event) => {
                            const index = Math.round(event.nativeEvent.contentOffset.x / (width - LAYOUT.screenPadding * 2));
                            setCurrentOfferIndex(index);
                        }}
                    />
                    {/* Pagination Dots */}
                    <View style={styles.paginationDots}>
                        {OFFERS.map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.dot,
                                    currentOfferIndex === index && styles.activeDot,
                                ]}
                            />
                        ))}
                    </View>
                </View>

                {/* Featured Products */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Featured Products</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('ProductList', { categoryId: 'all', categoryName: 'All Products' })}>
                            <Text style={styles.seeAll}>See All</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.productsGrid}>
                        {featuredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onPress={() => handleProductPress(product.id)}
                                onAddToCart={() => handleAddToCart(product)}
                            />
                        ))}
                    </View>
                </View>

                {/* Best Sellers */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Best Sellers</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('ProductList', { categoryId: 'all', categoryName: 'Best Sellers' })}>
                            <Text style={styles.seeAll}>See All</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.productsGrid}>
                        {bestSellers.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onPress={() => handleProductPress(product.id)}
                                onAddToCart={() => handleAddToCart(product)}
                            />
                        ))}
                    </View>
                </View>
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
        paddingTop: SPACING.lg,
        paddingBottom: SPACING['3xl'],
    },
    carouselContainer: {
        marginBottom: SPACING.xl,
    },
    offerItem: {
        width: width - (LAYOUT.screenPadding * 2), // Full width with padding
        height: 200,
        marginHorizontal: LAYOUT.screenPadding,
        borderRadius: BORDER_RADIUS.xl,
        overflow: 'hidden',

    },
    offerImage: {
        width: '100%',
        height: '100%',

    },
    paginationDots: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: SPACING.sm,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.gray300,
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: COLORS.primary,
        width: 20, // Elongated active dot
    },
    section: {
        marginBottom: SPACING.xl,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: LAYOUT.screenPadding,
        marginBottom: SPACING.md,
    },
    sectionTitle: {
        fontSize: TYPOGRAPHY.lg,
        fontWeight: TYPOGRAPHY.bold,
        color: COLORS.textPrimary,
    },
    seeAll: {
        fontSize: TYPOGRAPHY.sm,
        fontWeight: TYPOGRAPHY.bold,
        color: COLORS.primary,
    },
    productsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: LAYOUT.screenPadding,
        justifyContent: 'space-between',
    },
});

export default HomeScreen;