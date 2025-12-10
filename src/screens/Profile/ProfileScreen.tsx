import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { BORDER_RADIUS, COLORS, LAYOUT, SPACING, TYPOGRAPHY } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';
import { ProfileStackParamList } from '../../types';

type ProfileScreenNavigationProp = NativeStackNavigationProp<ProfileStackParamList, 'Profile'>;

interface Props {
    navigation: ProfileScreenNavigationProp;
}

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await logout();
                        } catch (error) {
                            Alert.alert('Error', 'Failed to logout');
                        }
                    },
                },
            ]
        );
    };

    const menuItems = [
        {
            icon: 'person-outline' as const,
            title: 'Edit Profile',
            onPress: () => navigation.navigate('EditProfile'),
        },
        {
            icon: 'receipt-outline' as const,
            title: 'Order History',
            onPress: () => navigation.navigate('OrderHistory'),
        },
        {
            icon: 'location-outline' as const,
            title: 'Saved Addresses',
            onPress: () => Alert.alert('Coming Soon', 'This feature will be available soon'),
        },
        {
            icon: 'card-outline' as const,
            title: 'Payment Methods',
            onPress: () => Alert.alert('Coming Soon', 'This feature will be available soon'),
        },
        {
            icon: 'notifications-outline' as const,
            title: 'Notifications',
            onPress: () => Alert.alert('Coming Soon', 'This feature will be available soon'),
        },
        {
            icon: 'help-circle-outline' as const,
            title: 'Help & Support',
            onPress: () => Alert.alert('Coming Soon', 'This feature will be available soon'),
        },
        {
            icon: 'log-out-outline' as const,
            title: 'Logout',
            onPress: handleLogout,
            isDestructive: true,
        },
    ];

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Profile Header */}
            <View style={styles.header}>
                <View style={styles.avatarContainer}>
                    {user?.avatar ? (
                        <Image source={{ uri: user.avatar }} style={styles.avatar} />
                    ) : (
                        <View style={styles.avatarPlaceholder}>
                            <Ionicons name="person" size={40} color={COLORS.white} />
                        </View>
                    )}
                </View>
                <Text style={styles.name}>{user?.name || 'User'}</Text>
                <Text style={styles.email}>{user?.email || 'user@example.com'}</Text>
                {user?.phone && <Text style={styles.phone}>{user.phone}</Text>}
            </View>

            {/* Menu Items */}
            <View style={styles.menuContainer}>
                {menuItems.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.menuItem}
                        onPress={item.onPress}
                        activeOpacity={0.7}
                    >
                        <View style={styles.menuItemLeft}>
                            <Ionicons
                                name={item.icon}
                                size={24}
                                color={item.isDestructive ? COLORS.error : COLORS.textPrimary}
                            />
                            <Text
                                style={[
                                    styles.menuItemText,
                                    item.isDestructive && styles.menuItemTextDestructive,
                                ]}
                            >
                                {item.title}
                            </Text>
                        </View>
                        <Ionicons
                            name="chevron-forward"
                            size={20}
                            color={COLORS.textSecondary}
                        />
                    </TouchableOpacity>
                ))}
            </View>

            {/* App Version */}
            <Text style={styles.version}>Version 1.0.0</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        backgroundColor: COLORS.white,
        alignItems: 'center',
        paddingVertical: SPACING['2xl'],
        marginBottom: SPACING.base,
    },
    avatarContainer: {
        marginBottom: SPACING.base,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: BORDER_RADIUS.full,
    },
    avatarPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: BORDER_RADIUS.full,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        fontSize: TYPOGRAPHY['2xl'],
        fontWeight: TYPOGRAPHY.bold,
        color: COLORS.textPrimary,
        marginBottom: SPACING.xs,
    },
    email: {
        fontSize: TYPOGRAPHY.base,
        color: COLORS.textSecondary,
        marginBottom: SPACING.xs,
    },
    phone: {
        fontSize: TYPOGRAPHY.base,
        color: COLORS.textSecondary,
    },
    menuContainer: {
        backgroundColor: COLORS.white,
        marginBottom: SPACING.base,
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: LAYOUT.screenPadding,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderLight,
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuItemText: {
        fontSize: TYPOGRAPHY.base,
        color: COLORS.textPrimary,
        marginLeft: SPACING.base,
    },
    menuItemTextDestructive: {
        color: COLORS.error,
    },
    version: {
        fontSize: TYPOGRAPHY.sm,
        color: COLORS.textSecondary,
        textAlign: 'center',
        marginVertical: SPACING.xl,
    },
});

export default ProfileScreen;
