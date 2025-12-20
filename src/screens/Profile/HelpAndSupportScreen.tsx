import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Linking,
    TextInput,
    LayoutAnimation,
    Platform,
    UIManager,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
    };

    return (
        <View style={styles.faqItemContainer}>
            <TouchableOpacity
                style={styles.faqHeader}
                onPress={toggleExpand}
                activeOpacity={0.7}
            >
                <Text style={styles.faqQuestion}>{question}</Text>
                <Ionicons
                    name={expanded ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color={COLORS.textSecondary}
                />
            </TouchableOpacity>
            {expanded && (
                <View style={styles.faqAnswerContainer}>
                    <Text style={styles.faqAnswer}>{answer}</Text>
                </View>
            )}
        </View>
    );
};

const ContactOption = ({
    icon,
    title,
    subtitle,
    onPress
}: {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    subtitle: string;
    onPress: () => void;
}) => (
    <TouchableOpacity style={styles.contactOption} onPress={onPress}>
        <View style={styles.contactIconContainer}>
            <Ionicons name={icon} size={24} color={COLORS.primary} />
        </View>
        <View style={styles.contactTextContainer}>
            <Text style={styles.contactTitle}>{title}</Text>
            <Text style={styles.contactSubtitle}>{subtitle}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={COLORS.gray400} />
    </TouchableOpacity>
);

const HelpAndSupportScreen: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const faqs = [
        {
            question: 'How do I track my order?',
            answer: 'You can track your order by going to the "Order History" section in your profile. Select the order you want to track to see its current status.'
        },
        {
            question: 'What is the return policy?',
            answer: 'We accept returns within 30 days of purchase. The item must be unused and in its original packaging. Please visit our Returns center for more details.'
        },
        {
            question: 'How can I change my shipping address?',
            answer: 'You can manage your saved addresses in the "Saved Addresses" section of your profile. You can add new addresses or edit existing ones.'
        },
        {
            question: 'Do you offer international shipping?',
            answer: 'Currently, we only ship within the country. We are working on expanding our services to international locations soon.'
        },
        {
            question: 'How do I use a promo code?',
            answer: 'You can enter your promo code at the checkout page before making a payment. look for the "Apply Promo Code" field.'
        }
    ];

    const handleEmailSupport = () => {
        Linking.openURL('mailto:support@ecommerceapp.com');
    };

    const handleCallSupport = () => {
        Linking.openURL('tel:+1234567890');
    };

    const filteredFaqs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header Search Section */}
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>How can we help you?</Text>
                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color={COLORS.textSecondary} style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search for help..."
                        placeholderTextColor={COLORS.textLight}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>

            <View style={styles.contentContainer}>
                {/* Contact Options */}
                <Text style={styles.sectionTitle}>Contact Us</Text>
                <View style={styles.contactContainer}>
                    <ContactOption
                        icon="mail-outline"
                        title="Email Support"
                        subtitle="Get response within 24h"
                        onPress={handleEmailSupport}
                    />
                    <View style={styles.separator} />
                    <ContactOption
                        icon="call-outline"
                        title="Call Customer Care"
                        subtitle="Available 9 AM - 6 PM"
                        onPress={handleCallSupport}
                    />
                </View>

                {/* FAQs */}
                <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
                <View style={styles.faqContainer}>
                    {filteredFaqs.map((faq, index) => (
                        <View key={index}>
                            <FAQItem question={faq.question} answer={faq.answer} />
                            {index < filteredFaqs.length - 1 && <View style={styles.separator} />}
                        </View>
                    ))}
                    {filteredFaqs.length === 0 && (
                        <Text style={styles.noResultsText}>No results found for "{searchQuery}"</Text>
                    )}
                </View>

                {/* Additional Resources */}
                <Text style={styles.sectionTitle}>More Resources</Text>
                <View style={styles.resourcesContainer}>
                    <TouchableOpacity style={styles.resourceItem}>
                        <Text style={styles.resourceText}>Privacy Policy</Text>
                        <Ionicons name="open-outline" size={18} color={COLORS.primary} />
                    </TouchableOpacity>
                    <View style={styles.separator} />
                    <TouchableOpacity style={styles.resourceItem}>
                        <Text style={styles.resourceText}>Terms of Service</Text>
                        <Ionicons name="open-outline" size={18} color={COLORS.primary} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.footerSpacing} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundLight,
    },
    headerContainer: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: SPACING.base,
        paddingBottom: SPACING['3xl'],
        paddingTop: SPACING.base,
        borderBottomLeftRadius: BORDER_RADIUS['2xl'],
        borderBottomRightRadius: BORDER_RADIUS['2xl'],
    },
    headerTitle: {
        fontSize: TYPOGRAPHY['2xl'],
        fontWeight: 'bold',
        color: COLORS.white,
        marginBottom: SPACING.lg,
        textAlign: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.full,
        paddingHorizontal: SPACING.base,
        height: 50,
        ...SHADOWS.sm,
    },
    searchIcon: {
        marginRight: SPACING.xs,
    },
    searchInput: {
        flex: 1,
        fontSize: TYPOGRAPHY.base,
        color: COLORS.textPrimary,
        height: '100%',
    },
    contentContainer: {
        padding: SPACING.base,
        marginTop: SPACING.xs,
    },
    sectionTitle: {
        fontSize: TYPOGRAPHY.lg,
        fontWeight: '600',
        color: COLORS.textPrimary,
        marginBottom: SPACING.md,
        marginTop: SPACING.lg,
        marginLeft: SPACING.xs,
    },
    contactContainer: {
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.xl,
        ...SHADOWS.sm,
        overflow: 'hidden',
    },
    contactOption: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.base,
    },
    contactIconContainer: {
        width: 48,
        height: 48,
        borderRadius: BORDER_RADIUS.full,
        backgroundColor: `${COLORS.primary}15`,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SPACING.base,
    },
    contactTextContainer: {
        flex: 1,
    },
    contactTitle: {
        fontSize: TYPOGRAPHY.base,
        fontWeight: '600',
        color: COLORS.textPrimary,
        marginBottom: 2,
    },
    contactSubtitle: {
        fontSize: TYPOGRAPHY.xs,
        color: COLORS.textSecondary,
    },
    separator: {
        height: 1,
        backgroundColor: COLORS.borderLight,
        marginLeft: SPACING.base + 48 + SPACING.base, // Align with text
    },
    faqContainer: {
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.xl,
        ...SHADOWS.sm,
        overflow: 'hidden',
        paddingVertical: SPACING.xs,
    },
    faqItemContainer: {
        overflow: 'hidden',
    },
    faqHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: SPACING.base,
    },
    faqQuestion: {
        fontSize: TYPOGRAPHY.base,
        color: COLORS.textPrimary,
        fontWeight: '500',
        flex: 1,
        marginRight: SPACING.sm,
    },
    faqAnswerContainer: {
        paddingHorizontal: SPACING.base,
        paddingBottom: SPACING.base,
        backgroundColor: COLORS.gray100,
    },
    faqAnswer: {
        fontSize: TYPOGRAPHY.sm,
        color: COLORS.textSecondary,
        lineHeight: 20,
    },
    noResultsText: {
        textAlign: 'center',
        color: COLORS.textSecondary,
        padding: SPACING.lg,
    },
    resourcesContainer: {
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.xl,
        ...SHADOWS.sm,
        overflow: 'hidden',
    },
    resourceItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: SPACING.base,
    },
    resourceText: {
        fontSize: TYPOGRAPHY.base,
        color: COLORS.textPrimary,
    },
    footerSpacing: {
        height: SPACING['3xl'],
    },
});

export default HelpAndSupportScreen;
