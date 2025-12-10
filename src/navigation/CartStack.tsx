import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { COLORS, TYPOGRAPHY } from '../constants/theme';
import CartScreen from '../screens/Cart/CartScreen';
import CheckoutScreen from '../screens/Cart/CheckoutScreen';
import { CartStackParamList } from '../types';

const Stack = createNativeStackNavigator<CartStackParamList>();

const CartStack: React.FC = () => {
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
                name="Cart"
                component={CartScreen}
                options={{ title: 'My Cart' }}
            />
            <Stack.Screen
                name="Checkout"
                component={CheckoutScreen}
                options={{ title: 'Checkout' }}
            />
        </Stack.Navigator>
    );
};

export default CartStack;
