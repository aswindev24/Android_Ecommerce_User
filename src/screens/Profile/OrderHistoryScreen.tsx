import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { APP_CONFIG } from '../../constants/config';
import { BORDER_RADIUS, COLORS, LAYOUT, SHADOWS, SPACING, TYPOGRAPHY } from '../../constants/theme';
import { dummyOrders } from '../../data/dummyData';
import { Order, ProfileStackParamList } from '../../types';

type OrderHistoryScreenNavigationProp = NativeStackNavigationProp<ProfileStackParamList, 'OrderHistory'>;

interface Props {
    navigation: OrderHistoryScreenNavigationProp;
}

const OrderHistoryScreen: React.FC<Props> = () => {
    const getStatusColor = (status: Order['status']) => {
        switch (status) {
            case 'delivered':
                return COLORS.success;
            case 'shipped':
                return COLORS.info;
            case 'processing':
                return COLORS.warning;
            case 'cancelled':
                return COLORS.error;
            default:
                return COLORS.textSecondary;
        }
    };

    const getStatusIcon = (status: Order['status']) => {
        switch (status) {
            case 'delivered':
                return 'checkmark-circle';
            case 'shipped':
                return 'airplane';
            case 'processing':
                return 'time';
            case 'cancelled':
                return 'close-circle';
            default:
                return 'ellipse';
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const renderOrder = ({ item }: { item: Order }) => (
        <TouchableOpacity style={styles.orderCard} activeOpacity={0.7}>
            <View style={styles.orderHeader}>
                <View>
                    <Text style={styles.orderNumber}>{item.orderNumber}</Text>
                    <Text style={styles.orderDate}>{formatDate(item.createdAt)}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
                    <Ionicons
                        name={getStatusIcon(item.status)}
                        size={16}
                        color={getStatusColor(item.status)}
                    />
                    <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </Text>
                </View>
            </View>

            <View style={styles.orderItems}>
                <Text style={styles.itemsLabel}>
                    {item.items.length} {item.items.length === 1 ? 'item' : 'items'}
                </Text>
                <Text style={styles.orderTotal}>
                    {APP_CONFIG.CURRENCY}{item.total}
                </Text>
            </View>

            {item.deliveredAt && (
                <Text style={styles.deliveredText}>
                    Delivered on {formatDate(item.deliveredAt)}
                </Text>
            )}
        </TouchableOpacity>
    );

    if (dummyOrders.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Ionicons name="receipt-outline" size={80} color={COLORS.gray400} />
                <Text style={styles.emptyTitle}>No orders yet</Text>
                <Text style={styles.emptyText}>Your order history will appear here</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={dummyOrders}
                renderItem={renderOrder}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
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
    orderCard: {
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.md,
        padding: SPACING.base,
        marginBottom: SPACING.md,
        ...SHADOWS.base,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: SPACING.md,
    },
    orderNumber: {
        fontSize: TYPOGRAPHY.base,
        fontWeight: TYPOGRAPHY.semibold,
        color: COLORS.textPrimary,
        marginBottom: SPACING.xs,
    },
    orderDate: {
        fontSize: TYPOGRAPHY.sm,
        color: COLORS.textSecondary,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.xs,
        borderRadius: BORDER_RADIUS.full,
    },
    statusText: {
        fontSize: TYPOGRAPHY.xs,
        fontWeight: TYPOGRAPHY.semibold,
        marginLeft: SPACING.xs,
    },
    orderItems: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.sm,
    },
    itemsLabel: {
        fontSize: TYPOGRAPHY.sm,
        color: COLORS.textSecondary,
    },
    orderTotal: {
        fontSize: TYPOGRAPHY.lg,
        fontWeight: TYPOGRAPHY.bold,
        color: COLORS.primary,
    },
    deliveredText: {
        fontSize: TYPOGRAPHY.sm,
        color: COLORS.success,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: LAYOUT.screenPadding,
    },
    emptyTitle: {
        fontSize: TYPOGRAPHY['2xl'],
        fontWeight: TYPOGRAPHY.bold,
        color: COLORS.textPrimary,
        marginTop: SPACING.xl,
        marginBottom: SPACING.sm,
    },
    emptyText: {
        fontSize: TYPOGRAPHY.base,
        color: COLORS.textSecondary,
        textAlign: 'center',
    },
});

export default OrderHistoryScreen;
