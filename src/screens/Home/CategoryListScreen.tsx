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
import { BORDER_RADIUS, COLORS, LAYOUT, SHADOWS, SPACING, TYPOGRAPHY } from '../../constants/theme';
import { dummyCategories } from '../../data/dummyData';
import { Category, HomeStackParamList } from '../../types';

type CategoryListScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'CategoryList'>;

interface Props {
    navigation: CategoryListScreenNavigationProp;
}

const CategoryListScreen: React.FC<Props> = ({ navigation }) => {
    const handleCategoryPress = (categoryId: string, categoryName: string) => {
        navigation.navigate('ProductList', { categoryId, categoryName });
    };

    const renderCategory = ({ item }: { item: Category }) => (
        <TouchableOpacity
            style={styles.categoryCard}
            onPress={() => handleCategoryPress(item.id, item.name)}
            activeOpacity={0.7}
        >
            <Image source={{ uri: item.image }} style={styles.categoryImage} />
            <View style={styles.categoryInfo}>
                <Text style={styles.categoryName}>{item.name}</Text>
                {item.productCount && (
                    <Text style={styles.productCount}>{item.productCount} products</Text>
                )}
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={dummyCategories}
                renderItem={renderCategory}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={styles.list}
                columnWrapperStyle={styles.row}
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
    categoryCard: {
        width: '48%',
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.md,
        marginBottom: SPACING.base,
        overflow: 'hidden',
        ...SHADOWS.base,
    },
    categoryImage: {
        width: '100%',
        height: 120,
        backgroundColor: COLORS.gray100,
    },
    categoryInfo: {
        padding: SPACING.md,
    },
    categoryName: {
        fontSize: TYPOGRAPHY.base,
        fontWeight: TYPOGRAPHY.semibold,
        color: COLORS.textPrimary,
        marginBottom: SPACING.xs,
    },
    productCount: {
        fontSize: TYPOGRAPHY.sm,
        color: COLORS.textSecondary,
    },
});

export default CategoryListScreen;
