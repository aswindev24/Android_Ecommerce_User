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
    TouchableOpacity,
    View,
} from 'react-native';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
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
        <SafeAreaView style={styles.container}>
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
                        <Input
                            label="Full Name"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChangeText={(text) => updateField('name', text)}
                            icon="person-outline"
                            error={errors.name}
                            editable={!isLoading}
                        />

                        <Input
                            label="Email Address"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChangeText={(text) => updateField('email', text)}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            icon="mail-outline"
                            error={errors.email}
                            editable={!isLoading}
                        />

                        <Input
                            label="Phone Number"
                            placeholder="Enter your phone number"
                            value={formData.phone}
                            onChangeText={(text) => updateField('phone', text)}
                            keyboardType="phone-pad"
                            icon="call-outline"
                            error={errors.phone}
                            editable={!isLoading}
                            maxLength={10}
                        />

                        <Input
                            label="Password"
                            placeholder="Create a password"
                            value={formData.password}
                            onChangeText={(text) => updateField('password', text)}
                            secureTextEntry
                            icon="lock-closed-outline"
                            error={errors.password}
                            editable={!isLoading}
                        />

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
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: LAYOUT.screenPadding,
        paddingVertical: SPACING['2xl'],
    },
    headerContainer: {
        marginBottom: SPACING['2xl'],
    },
    title: {
        fontSize: TYPOGRAPHY['3xl'],
        fontWeight: TYPOGRAPHY.bold,
        color: COLORS.textPrimary,
        marginBottom: SPACING.sm,
    },
    subtitle: {
        fontSize: TYPOGRAPHY.base,
        color: COLORS.textSecondary,
    },
    formContainer: {
        marginBottom: SPACING.xl,
    },
    registerButton: {
        marginTop: SPACING.base,
    },
    signinContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: SPACING.xl,
    },
    signinText: {
        fontSize: TYPOGRAPHY.base,
        color: COLORS.textSecondary,
    },
    signinLink: {
        fontSize: TYPOGRAPHY.base,
        fontWeight: TYPOGRAPHY.bold,
        color: COLORS.primary,
    },
});

export default RegisterScreen;
