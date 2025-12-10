import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image, Platform, StatusBar, StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
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

    return (
        <View style={styles.container}>
            {/* Service Pills and Location */}
            <View style={styles.pillsContainer}>
                <TouchableOpacity style={styles.flipkartPill}>
                    <Ionicons name="flash" size={16} color="#2874F0" />
                    <Text style={styles.flipkartText}>Lestora</Text>
                </TouchableOpacity>

                {/* Location Bar */}
                <TouchableOpacity style={styles.locationBar}>
                    <Ionicons name="home" size={14} color="#2874F0" />
                    <Text style={styles.locationText} numberOfLines={1}>
                        {user?.address ? user.address : 'Kuttiattoor, Calicut, Kerala'}
                    </Text>
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
                    <TouchableOpacity style={styles.cameraButton}>
                        <Ionicons name="camera-outline" size={20} color="#717478" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.qrButton}>
                    <Ionicons name="qr-code" size={24} color={COLORS.white} />
                </TouchableOpacity>
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2874F0',

        zIndex: 100,

    },
    pillsContainer: {
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
        gap: 4,
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
});

export default Header;