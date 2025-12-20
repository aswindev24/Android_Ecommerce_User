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
import { validateEmail, validatePassword } from '../../utils/validation';

type LoginScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

interface Props {
    navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const { login, isLoading } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

    const handleLogin = async () => {
        // Validate inputs
        const emailValidation = validateEmail(email);
        const passwordValidation = validatePassword(password);

        if (!emailValidation.isValid || !passwordValidation.isValid) {
            setErrors({
                email: emailValidation.error,
                password: passwordValidation.error,
            });
            return;
        }

        setErrors({});

        try {
            await login({ email, password });
            // Navigation will be handled by RootNavigator based on auth state
        } catch (error: any) {
            Alert.alert('Login Failed', error.message || 'Please check your credentials and try again');
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
                            <Text style={styles.title}>Welcome Back</Text>
                            <Text style={styles.subtitle}>Sign in to continue shopping</Text>
                        </View>

                        {/* Form */}
                        <View style={styles.formContainer}>
                            {/* Email Input */}
                            <View style={styles.inputWrapper}>
                                <View style={styles.inputRow}>
                                    <Ionicons name="mail-outline" size={20} color={COLORS.white} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Email Address"
                                        placeholderTextColor="rgba(255, 255, 255, 0.6)"
                                        value={email}
                                        onChangeText={(text) => {
                                            setEmail(text);
                                            if (errors.email) setErrors({ ...errors, email: undefined });
                                        }}
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

                            {/* Password Input */}
                            <View style={styles.inputWrapper}>
                                <View style={styles.inputRow}>
                                    <Ionicons name="lock-closed-outline" size={20} color={COLORS.white} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Password"
                                        placeholderTextColor="rgba(255, 255, 255, 0.6)"
                                        value={password}
                                        onChangeText={(text) => {
                                            setPassword(text);
                                            if (errors.password) setErrors({ ...errors, password: undefined });
                                        }}
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
                                title="Sign In"
                                onPress={handleLogin}
                                loading={isLoading}
                                disabled={isLoading}
                                fullWidth
                                style={styles.loginButton}
                            />

                            {/* Sign Up Link */}
                            <View style={styles.signupContainer}>
                                <Text style={styles.signupText}>Don't have an account? </Text>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Register')}
                                    disabled={isLoading}
                                >
                                    <Text style={styles.signupLink}>Sign Up</Text>
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
        //backgroundColor: 'rgba(119, 105, 105, 0.3)', // Semi-transparent overlay
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
        marginBottom: SPACING['3xl'],

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
        backgroundColor: 'rgba(247, 247, 247, 0.99)',
        marginTop: SPACING.xs,
    },
    errorText: {
        fontSize: TYPOGRAPHY.sm,
        color: '#FF6B6B',
        marginTop: SPACING.xs,
    },
    loginButton: {
        marginTop: SPACING.xl,
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: SPACING.xl,
    },
    signupText: {
        fontSize: TYPOGRAPHY.base,
        color: COLORS.white,
    },
    signupLink: {
        fontSize: TYPOGRAPHY.base,
        fontWeight: TYPOGRAPHY.bold,
        color: '#FFE500',
    },
});

export default LoginScreen;