import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    View
} from 'react-native';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { COLORS, LAYOUT, SPACING } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';
import { ProfileStackParamList } from '../../types';
import {
    validateEmail,
    validateName,
    validatePhone,
} from '../../utils/validation';

type EditProfileScreenNavigationProp = NativeStackNavigationProp<ProfileStackParamList, 'EditProfile'>;

interface Props {
    navigation: EditProfileScreenNavigationProp;
}

const EditProfileScreen: React.FC<Props> = ({ navigation }) => {
    const { user, updateUser, isLoading } = useAuth();
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
    });
    const [errors, setErrors] = useState<{
        name?: string;
        email?: string;
        phone?: string;
    }>({});

    const handleSave = async () => {
        // Validate inputs
        const nameValidation = validateName(formData.name);
        const emailValidation = validateEmail(formData.email);
        const phoneValidation = validatePhone(formData.phone);

        if (
            !nameValidation.isValid ||
            !emailValidation.isValid ||
            !phoneValidation.isValid
        ) {
            setErrors({
                name: nameValidation.error,
                email: emailValidation.error,
                phone: phoneValidation.error,
            });
            return;
        }

        setErrors({});

        try {
            await updateUser(formData);
            Alert.alert('Success', 'Profile updated successfully', [
                { text: 'OK', onPress: () => navigation.goBack() },
            ]);
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Failed to update profile');
        }
    };

    const updateField = (field: keyof typeof formData, value: string) => {
        setFormData({ ...formData, [field]: value });
        if (errors[field]) {
            setErrors({ ...errors, [field]: undefined });
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
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

                <Button
                    title="Save Changes"
                    onPress={handleSave}
                    loading={isLoading}
                    disabled={isLoading}
                    fullWidth
                    style={styles.saveButton}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scrollContent: {
        padding: LAYOUT.screenPadding,
    },
    saveButton: {
        marginTop: SPACING.base,
    },
});

export default EditProfileScreen;
