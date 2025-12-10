import { Ionicons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Button from '../../components/common/Button';
import { APP_CONFIG } from '../../constants/config';
import { BORDER_RADIUS, COLORS, LAYOUT, SHADOWS, SPACING, TYPOGRAPHY } from '../../constants/theme';
import { useCart } from '../../context/CartContext';
import { dummyProducts } from '../../data/dummyData';
import { HomeStackParamList, Product } from '../../types';

type ProductDetailScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'ProductDetail'>;
type ProductDetailScreenRouteProp = RouteProp<HomeStackParamList, 'ProductDetail'>;

interface Props {
    navigation: ProductDetailScreenNavigationProp;
    route: ProductDetailScreenRouteProp;
}

const { width } = Dimensions.get('window');

const ProductDetailScreen: React.FC<Props> = ({ route }) => {
    const { productId } = route.params;
    const { addToCart } = useCart();
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);

    useEffect(() => {
        // Find product by ID (in real app, fetch from API)
        const foundProduct = dummyProducts.find((p) => p.id === productId);
        setProduct(foundProduct || null);
    }, [productId]);

    if (!product) {
        return (
            <View style={styles.container}>
                <Text>Product not found</Text>
            </View>
        );
    }

    const images = product.images || [product.image];

    const handleAddToCart = async () => {
        try {
            await addToCart(product, quantity);
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    const incrementQuantity = () => {
        if (quantity < product.stock) {
            setQuantity(quantity + 1);
        } else {
            Alert.alert('Stock Limit', `Only ${product.stock} items available`);
        }
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Product Images */}
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: images[selectedImage] }}
                        style={styles.mainImage}
                        resizeMode="cover"
                    />
                    {product.discount && product.discount > 0 && (
                        <View style={styles.discountBadge}>
                            <Text style={styles.discountText}>{product.discount}% OFF</Text>
                        </View>
                    )}
                </View>

                {/* Image Thumbnails */}
                {images.length > 1 && (
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.thumbnailContainer}
                        contentContainerStyle={styles.thumbnailContent}
                    >
                        {images.map((img, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => setSelectedImage(index)}
                                style={[
                                    styles.thumbnail,
                                    selectedImage === index && styles.thumbnailActive,
                                ]}
                            >
                                <Image source={{ uri: img }} style={styles.thumbnailImage} />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                )}

                {/* Product Info */}
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>{product.title}</Text>

                    {/* Rating */}
                    <View style={styles.ratingContainer}>
                        <Ionicons name="star" size={18} color={COLORS.warning} />
                        <Text style={styles.rating}>{product.rating.toFixed(1)}</Text>
                        {product.reviews && (
                            <Text style={styles.reviews}>({product.reviews} reviews)</Text>
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

                    {/* Stock */}
                    <Text style={styles.stock}>
                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </Text>

                    {/* Description */}
                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.description}>{product.description}</Text>

                    {/* Quantity Selector */}
                    <Text style={styles.sectionTitle}>Quantity</Text>
                    <View style={styles.quantityContainer}>
                        <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={decrementQuantity}
                        >
                            <Ionicons name="remove" size={20} color={COLORS.textPrimary} />
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{quantity}</Text>
                        <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={incrementQuantity}
                        >
                            <Ionicons name="add" size={20} color={COLORS.textPrimary} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            {/* Add to Cart Button */}
            <View style={styles.footer}>
                <Button
                    title="Add to Cart"
                    onPress={handleAddToCart}
                    fullWidth
                    disabled={product.stock === 0}
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
    imageContainer: {
        width: width,
        height: width,
        backgroundColor: COLORS.gray100,
    },
    mainImage: {
        width: '100%',
        height: '100%',
    },
    discountBadge: {
        position: 'absolute',
        top: SPACING.base,
        left: SPACING.base,
        backgroundColor: COLORS.error,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderRadius: BORDER_RADIUS.base,
    },
    discountText: {
        color: COLORS.white,
        fontSize: TYPOGRAPHY.sm,
        fontWeight: TYPOGRAPHY.bold,
    },
    thumbnailContainer: {
        marginTop: SPACING.base,
    },
    thumbnailContent: {
        paddingHorizontal: LAYOUT.screenPadding,
    },
    thumbnail: {
        width: 60,
        height: 60,
        marginRight: SPACING.sm,
        borderRadius: BORDER_RADIUS.sm,
        borderWidth: 2,
        borderColor: 'transparent',
        overflow: 'hidden',
    },
    thumbnailActive: {
        borderColor: COLORS.primary,
    },
    thumbnailImage: {
        width: '100%',
        height: '100%',
    },
    infoContainer: {
        padding: LAYOUT.screenPadding,
    },
    title: {
        fontSize: TYPOGRAPHY['2xl'],
        fontWeight: TYPOGRAPHY.bold,
        color: COLORS.textPrimary,
        marginBottom: SPACING.sm,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.base,
    },
    rating: {
        fontSize: TYPOGRAPHY.base,
        fontWeight: TYPOGRAPHY.semibold,
        color: COLORS.textPrimary,
        marginLeft: SPACING.xs,
    },
    reviews: {
        fontSize: TYPOGRAPHY.sm,
        color: COLORS.textSecondary,
        marginLeft: SPACING.xs,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.sm,
    },
    price: {
        fontSize: TYPOGRAPHY['2xl'],
        fontWeight: TYPOGRAPHY.bold,
        color: COLORS.primary,
        marginRight: SPACING.md,
    },
    originalPrice: {
        fontSize: TYPOGRAPHY.lg,
        color: COLORS.textSecondary,
        textDecorationLine: 'line-through',
    },
    stock: {
        fontSize: TYPOGRAPHY.sm,
        color: COLORS.success,
        marginBottom: SPACING.xl,
    },
    sectionTitle: {
        fontSize: TYPOGRAPHY.lg,
        fontWeight: TYPOGRAPHY.bold,
        color: COLORS.textPrimary,
        marginBottom: SPACING.sm,
    },
    description: {
        fontSize: TYPOGRAPHY.base,
        color: COLORS.textSecondary,
        lineHeight: 24,
        marginBottom: SPACING.xl,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.xl,
    },
    quantityButton: {
        width: 40,
        height: 40,
        borderRadius: BORDER_RADIUS.base,
        backgroundColor: COLORS.backgroundLight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityText: {
        fontSize: TYPOGRAPHY.xl,
        fontWeight: TYPOGRAPHY.semibold,
        color: COLORS.textPrimary,
        marginHorizontal: SPACING.xl,
        minWidth: 40,
        textAlign: 'center',
    },
    footer: {
        padding: LAYOUT.screenPadding,
        backgroundColor: COLORS.white,
        borderTopWidth: 1,
        borderTopColor: COLORS.borderLight,
        ...SHADOWS.md,
    },
});

export default ProductDetailScreen;
