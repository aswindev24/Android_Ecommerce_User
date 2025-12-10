import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
    FlatList,
    StyleSheet,
    View
} from 'react-native';
import ProductCard from '../../components/product/ProductCard';
import { COLORS, LAYOUT } from '../../constants/theme';
import { useCart } from '../../context/CartContext';
import { dummyProducts } from '../../data/dummyData';
import { HomeStackParamList, Product } from '../../types';

type ProductListScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'ProductList'>;
type ProductListScreenRouteProp = RouteProp<HomeStackParamList, 'ProductList'>;

interface Props {
    navigation: ProductListScreenNavigationProp;
    route: ProductListScreenRouteProp;
}

const ProductListScreen: React.FC<Props> = ({ navigation, route }) => {
    const { categoryName, searchQuery, categoryId } = route.params;
    const { addToCart } = useCart();
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        let filteredProducts: Product[] = [];

        if (categoryId === 'search' && searchQuery) {
            // Filter by search query
            const query = searchQuery.toLowerCase();
            filteredProducts = dummyProducts.filter(
                (p) =>
                    p.title.toLowerCase().includes(query) ||
                    p.description.toLowerCase().includes(query) ||
                    p.category.toLowerCase().includes(query)
            );
        } else {
            // Filter by category
            filteredProducts = dummyProducts.filter(
                (p) => p.category === categoryName
            );
        }

        setProducts(filteredProducts);
    }, [categoryName, searchQuery, categoryId]);

    const handleProductPress = (productId: string) => {
        navigation.navigate('ProductDetail', { productId });
    };

    const handleAddToCart = async (product: Product) => {
        try {
            await addToCart(product, 1);
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    const renderProduct = ({ item }: { item: Product }) => (
        <ProductCard
            product={item}
            onPress={() => handleProductPress(item.id)}
            onAddToCart={() => handleAddToCart(item)}
        />
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                renderItem={renderProduct}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={styles.list}
                columnWrapperStyle={styles.row}
                showsVerticalScrollIndicator={false}
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
        padding: LAYOUT.screenPadding,
    },
    row: {
        justifyContent: 'space-between',
    },
});

export default ProductListScreen;
