import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { COLORS, TYPOGRAPHY } from '../constants/theme';
import CategoryListScreen from '../screens/Home/CategoryListScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import ProductDetailScreen from '../screens/Product/ProductDetailScreen';
import ProductListScreen from '../screens/Product/ProductListScreen';
import { HomeStackParamList } from '../types';

import Electronics from '../screens/CategoryProducts/Electronics';
import Fashion from '../screens/CategoryProducts/Fashion';
import HomeAppliances from '../screens/CategoryProducts/HomeAppliances';
import Beauty from '../screens/CategoryProducts/Beauty';
import Sports from '../screens/CategoryProducts/Sports';

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack: React.FC = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: COLORS.white,
                },
                headerTintColor: COLORS.textPrimary,
                headerTitleStyle: {
                    fontWeight: TYPOGRAPHY.bold as any,
                },
                headerShadowVisible: false,
            }}
        >
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CategoryList"
                component={CategoryListScreen}
                options={{ title: 'All Categories' }}
            />
            <Stack.Screen
                name="ProductList"
                component={ProductListScreen}
                options={({ route }) => ({ title: route.params.categoryName })}
            />
            <Stack.Screen
                name="Electronics"
                component={Electronics}
                options={{ title: 'Electronics' }}
            />
            <Stack.Screen
                name="Fashion"
                component={Fashion}
                options={{ title: 'Fashion' }}
            />
            <Stack.Screen
                name="HomeAppliances"
                component={HomeAppliances}
                options={{ title: 'Home Appliances' }}
            />
            <Stack.Screen
                name="Beauty"
                component={Beauty}
                options={{ title: 'Beauty' }}
            />
            <Stack.Screen
                name="Sports"
                component={Sports}
                options={{ title: 'Sports' }}
            />
            <Stack.Screen
                name="ProductDetail"
                component={ProductDetailScreen}
                options={{ title: 'Product Details' }}
            />
        </Stack.Navigator>
    );
};

export default HomeStack;
