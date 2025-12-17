import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/common/Button';
import { COLORS, LAYOUT, SPACING, TYPOGRAPHY } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';
import { AuthStackParamList } from '../../types';
import {
    validateEmail,
    validateName,
    validatePassword,
    validatePhone,
} from '../../utils/validation';

type RegisterScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

interface Props {
    navigation: RegisterScreenNavigationProp;
}

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
    const { register, isLoading } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
    });
    const [errors, setErrors] = useState<{
        name?: string;
        email?: string;
        phone?: string;
        password?: string;
    }>({});

    const handleRegister = async () => {
        // Validate all inputs
        const nameValidation = validateName(formData.name);
        const emailValidation = validateEmail(formData.email);
        const phoneValidation = validatePhone(formData.phone);
        const passwordValidation = validatePassword(formData.password);

        if (
            !nameValidation.isValid ||
            !emailValidation.isValid ||
            !phoneValidation.isValid ||
            !passwordValidation.isValid
        ) {
            setErrors({
                name: nameValidation.error,
                email: emailValidation.error,
                phone: phoneValidation.error,
                password: passwordValidation.error,
            });
            return;
        }

        setErrors({});

        try {
            await register(formData);
            // Navigation will be handled by RootNavigator based on auth state
        } catch (error: any) {
            Alert.alert('Registration Failed', error.message || 'Please try again');
        }
    };

    const updateField = (field: keyof typeof formData, value: string) => {
        setFormData({ ...formData, [field]: value });
        if (errors[field]) {
            setErrors({ ...errors, [field]: undefined });
        }
    };

    return (
        <ImageBackground
            source={require('../../../assets/loginbg.jpg')}
            style={styles.container}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.keyboardView}
                >
                    <ScrollView
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        {/* Header */}
                        <View style={styles.headerContainer}>
                            <Text style={styles.title}>Create Account</Text>
                            <Text style={styles.subtitle}>Sign up to get started</Text>
                        </View>

                        {/* Form */}
                        <View style={styles.formContainer}>
                            {/* Full Name Input */}
                            <View style={styles.inputWrapper}>
                                <View style={styles.inputRow}>
                                    <Ionicons name="person-outline" size={20} color={COLORS.white} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Full Name"
                                        placeholderTextColor="rgba(255, 255, 255, 0.6)"
                                        value={formData.name}
                                        onChangeText={(text) => updateField('name', text)}
                                        editable={!isLoading}
                                    />
                                </View>
                                <View style={styles.underline} />
                                {errors.name && (
                                    <Text style={styles.errorText}>{errors.name}</Text>
                                )}
                            </View>

                            {/* Email Input */}
                            <View style={styles.inputWrapper}>
                                <View style={styles.inputRow}>
                                    <Ionicons name="mail-outline" size={20} color={COLORS.white} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Email Address"
                                        placeholderTextColor="rgba(255, 255, 255, 0.6)"
                                        value={formData.email}
                                        onChangeText={(text) => updateField('email', text)}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        editable={!isLoading}
                                    />
                                </View>
                                <View style={styles.underline} />
                                {errors.email && (
                                    <Text style={styles.errorText}>{errors.email}</Text>
                                )}
                            </View>

                            {/* Phone Input */}
                            <View style={styles.inputWrapper}>
                                <View style={styles.inputRow}>
                                    <Ionicons name="call-outline" size={20} color={COLORS.white} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Phone Number"
                                        placeholderTextColor="rgba(255, 255, 255, 0.6)"
                                        value={formData.phone}
                                        onChangeText={(text) => updateField('phone', text)}
                                        keyboardType="phone-pad"
                                        maxLength={10}
                                        editable={!isLoading}
                                    />
                                </View>
                                <View style={styles.underline} />
                                {errors.phone && (
                                    <Text style={styles.errorText}>{errors.phone}</Text>
                                )}
                            </View>

                            {/* Password Input */}
                            <View style={styles.inputWrapper}>
                                <View style={styles.inputRow}>
                                    <Ionicons name="lock-closed-outline" size={20} color={COLORS.white} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Create a Password"
                                        placeholderTextColor="rgba(255, 255, 255, 0.6)"
                                        value={formData.password}
                                        onChangeText={(text) => updateField('password', text)}
                                        secureTextEntry
                                        editable={!isLoading}
                                    />
                                </View>
                                <View style={styles.underline} />
                                {errors.password && (
                                    <Text style={styles.errorText}>{errors.password}</Text>
                                )}
                            </View>

                            <Button
                                title="Sign Up"
                                onPress={handleRegister}
                                loading={isLoading}
                                disabled={isLoading}
                                fullWidth
                                style={styles.registerButton}
                            />

                            {/* Sign In Link */}
                            <View style={styles.signinContainer}>
                                <Text style={styles.signinText}>Already have an account? </Text>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Login')}
                                    disabled={isLoading}
                                >
                                    <Text style={styles.signinLink}>Sign In</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
        //backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent overlay
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: LAYOUT.screenPadding,
        paddingVertical: SPACING['3xl'],
        justifyContent: 'center',
    },
    headerContainer: {
        marginBottom: SPACING['2xl'],
    },
    title: {
        fontSize: TYPOGRAPHY['3xl'],
        fontWeight: TYPOGRAPHY.bold,
        color: COLORS.white,
        marginBottom: SPACING.sm,
    },
    subtitle: {
        fontSize: TYPOGRAPHY.base,
        color: COLORS.white,
    },
    formContainer: {
        marginBottom: SPACING.xl,
    },
    inputWrapper: {
        marginBottom: SPACING.lg,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SPACING.sm,
    },
    input: {
        flex: 1,
        fontSize: TYPOGRAPHY.base,
        color: COLORS.white,
        marginLeft: SPACING.sm,
        paddingVertical: 0,
    },
    underline: {
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        marginTop: SPACING.xs,
    },
    errorText: {
        fontSize: TYPOGRAPHY.sm,
        color: '#FF6B6B',
        marginTop: SPACING.xs,
    },
    registerButton: {
        marginTop: SPACING.xl,
    },
    signinContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: SPACING.xl,
    },
    signinText: {
        fontSize: TYPOGRAPHY.base,
        color: COLORS.white,
    },
    signinLink: {
        fontSize: TYPOGRAPHY.base,
        fontWeight: TYPOGRAPHY.bold,
        color: '#FFE500',
    },
});

export default RegisterScreen;