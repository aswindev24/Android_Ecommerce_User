import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
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
            onPress: () => navigation.navigate('Address'),
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
            onPress: () => navigation.navigate('HelpAndSupport'),
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
            <StatusBar style="light" backgroundColor={COLORS.primary} />
            {/* Profile Header - Separate Section */}
            <View style={styles.headerSection}>
                <View style={styles.avatarContainer}>
                    {user?.avatar ? (
                        <Image source={{ uri: user.avatar }} style={styles.avatar} />
                    ) : (
                        <View style={styles.avatarPlaceholder}>
                            <Ionicons name="person" size={40} color={COLORS.gray500} />
                        </View>
                    )}
                </View>
                <Text style={styles.name}>{user?.name || 'User'}</Text>
                <Text style={styles.email}>{user?.email || 'user@example.com'}</Text>
                {user?.phone && <Text style={styles.phone}>{user.phone}</Text>}
            </View>

            {/* Curved Menu Container */}
            <View style={styles.curvedMenuWrapper}>
                <View style={styles.menuContainer}>
                    {menuItems.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.menuItem,
                                index === menuItems.length - 1 && styles.menuItemLast
                            ]}
                            onPress={item.onPress}
                            activeOpacity={0.7}
                        >
                            <View style={styles.menuItemLeft}>
                                <View style={[
                                    styles.iconContainer,
                                    item.isDestructive && styles.iconContainerDestructive
                                ]}>
                                    <Ionicons
                                        name={item.icon}
                                        size={22}
                                        color={item.isDestructive ? COLORS.error : COLORS.primary}
                                    />
                                </View>
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
    headerSection: {
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        paddingVertical: SPACING['3xl'],
        paddingBottom: SPACING['4xl'],
        marginBottom: -20, // Overlap with curved menu
    },
    avatarContainer: {
        marginBottom: SPACING.base,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: BORDER_RADIUS.full,
        borderWidth: 4,
        borderColor: COLORS.white,
    },
    avatarPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: BORDER_RADIUS.full,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: COLORS.white,
    },
    name: {
        fontSize: TYPOGRAPHY['2xl'],
        fontWeight: TYPOGRAPHY.bold,
        color: COLORS.white,
        marginBottom: SPACING.xs,
    },
    email: {
        fontSize: TYPOGRAPHY.base,
        color: COLORS.white,
        opacity: 0.9,
        marginBottom: SPACING.xs,
    },
    phone: {
        fontSize: TYPOGRAPHY.base,
        color: COLORS.white,
        opacity: 0.9,
    },
    curvedMenuWrapper: {
        paddingHorizontal: 0,
        marginBottom: 0,
    },
    menuContainer: {
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS['2xl'],
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: LAYOUT.screenPadding,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderLight,
    },
    menuItemLast: {
        borderBottomWidth: 0,
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: BORDER_RADIUS.lg,
        backgroundColor: `${COLORS.primary}15`,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainerDestructive: {
        backgroundColor: `${COLORS.error}15`,
    },
    menuItemText: {
        fontSize: TYPOGRAPHY.base,
        color: COLORS.textPrimary,
        marginLeft: SPACING.base,
        fontWeight: '500',
    },
    menuItemTextDestructive: {
        color: COLORS.error,
    },
    version: {
        fontSize: TYPOGRAPHY.sm,
        color: COLORS.textSecondary,
        textAlign: 'center',
        marginVertical: SPACING.xl,
        marginBottom: SPACING['2xl'],
    },
});

export default ProfileScreen;