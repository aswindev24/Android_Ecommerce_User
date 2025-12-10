import React from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import RootNavigator from './navigation/RootNavigator';

const App: React.FC = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <AuthProvider>
                <CartProvider>
                    <StatusBar
                        barStyle="light-content"
                        backgroundColor="#2874F0"
                    />
                    <RootNavigator />
                </CartProvider>
            </AuthProvider>
        </GestureHandlerRootView>
    );
};

export default App;
