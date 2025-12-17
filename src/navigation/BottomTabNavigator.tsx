import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../constants/theme';
import { useCart } from '../context/CartContext';
import { BottomTabParamList } from '../types';
import CartStack from './CartStack';
import HomeStack from './HomeStack';
import ProfileStack from './ProfileStack';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator: React.FC = () => {
    const { itemCount } = useCart();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    console.log(`Checking Tab Icon: ${route.name}, Focused: ${focused}, Color: ${color}`);
                    let iconName: keyof typeof Ionicons.glyphMap;

                    if (route.name === 'HomeTab') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'CartTab') {
                        iconName = focused ? 'cart' : 'cart-outline';
                    } else if (route.name === 'ProfileTab') {
                        iconName = focused ? 'person' : 'person-outline';
                    } else {
                        iconName = 'help-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#2874F0',
                tabBarInactiveTintColor: '#292927fd',
                tabBarStyle: {
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                    borderTopWidth: 1,
                    borderTopColor: COLORS.borderLight,
                    backgroundColor: COLORS.white,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: TYPOGRAPHY.medium as any,
                },
            })}
        >
            <Tab.Screen
                name="HomeTab"
                component={HomeStack}
                options={{
                    tabBarLabel: 'Home',
                }}
            />
            <Tab.Screen
                name="CartTab"
                component={CartStack}
                options={{
                    tabBarLabel: 'Cart',
                    tabBarBadge: itemCount > 0 ? itemCount : undefined,
                    tabBarBadgeStyle: styles.badge,
                }}
            />
            <Tab.Screen
                name="ProfileTab"
                component={ProfileStack}
                options={{
                    tabBarLabel: 'Profile',
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    badge: {
        backgroundColor: '#ffd500fd',
        color: COLORS.primary,
        fontSize: 10,
        fontWeight: TYPOGRAPHY.bold as any,
    },
});

export default BottomTabNavigator;