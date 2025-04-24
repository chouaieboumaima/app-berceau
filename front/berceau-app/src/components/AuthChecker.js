// AuthChecker.js - Vérifie l'état de l'authentification de l'utilisateur
import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useAuthStore from '../store/UseAuthStore';

const AuthChecker = () => {
    const navigation = useNavigation();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            navigation.replace('Home'); // Redirection vers Home
        } else {
            navigation.replace('Login'); // Redirection vers Login si non authentifié
        }
    }, [isAuthenticated, navigation]);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#4fafff" />
        </View>
    );
};

export default AuthChecker;
