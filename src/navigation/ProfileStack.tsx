import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { COLORS, TYPOGRAPHY } from '../constants/theme';
import EditProfileScreen from '../screens/Profile/EditProfileScreen';
import OrderHistoryScreen from '../screens/Profile/OrderHistoryScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import AddressScreen from '../screens/Profile/Address';
import HelpAndSupportScreen from '../screens/Profile/HelpAndSupportScreen';
import { ProfileStackParamList } from '../types';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileStack: React.FC = () => {
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
                name="Profile"
                component={ProfileScreen}
                options={{
                    title: 'My Profile',
                    headerStyle: {
                        backgroundColor: COLORS.primary,
                    },
                    headerTintColor: COLORS.white,
                    headerTitleAlign: 'center',
                }}
            />
            <Stack.Screen
                name="EditProfile"
                component={EditProfileScreen}
                options={{ title: 'Edit Profile' }}
            />
            <Stack.Screen
                name="Address"
                component={AddressScreen}
                options={{
                    title: 'Saved Addresses',
                    headerStyle: {
                        backgroundColor: COLORS.primary,
                    },
                    headerTintColor: COLORS.white,
                    headerTitleAlign: 'center',
                }}
            />
            <Stack.Screen
                name="OrderHistory"
                component={OrderHistoryScreen}
                options={{
                    title: 'Order History',
                    headerStyle: {
                        backgroundColor: COLORS.primary,
                    },
                    headerTintColor: COLORS.white,
                    headerTitleAlign: 'center',
                }}
            />
            <Stack.Screen
                name="HelpAndSupport"
                component={HelpAndSupportScreen}
                options={{
                    title: 'Help & Support',
                    headerStyle: {
                        backgroundColor: COLORS.primary,
                    },
                    headerTintColor: COLORS.white,
                    headerTitleAlign: 'center',
                }}
            />
        </Stack.Navigator>
    );
};

export default ProfileStack;
