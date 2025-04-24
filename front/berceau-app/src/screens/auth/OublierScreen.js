import React, { useState } from 'react';
import {
    View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, KeyboardAvoidingView, Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { forgot} from '../../services/AuthService';

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleResetPassword = async () => {
        if (!email.trim()) {
            setErrorMessage("Veuillez entrer votre adresse e-mail.");
            return;
        }

        if (!validateEmail(email)) {
            setErrorMessage("Veuillez entrer une adresse e-mail valide.");
            return;
        }

        setErrorMessage("");
        setLoading(true);

        try {
            await forgot(email); ;
            Alert.alert("Succès", "Un code de vérification a été envoyé !");
            navigation.navigate("Verifier", { email });
        } catch (error) {
            const message = error.response?.data?.message || "Une erreur est survenue.";
            setErrorMessage(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View style={styles.inner}>
                <Text style={styles.header}>Mot de passe oublié</Text>
                <Image source={require('../../../assets/security.png')} style={styles.image} />
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Veuillez saisir votre adresse e-mail"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
                <TouchableOpacity style={styles.button} onPress={handleResetPassword} disabled={loading}>
                    {loading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Continuer</Text>
                    )}
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FBE8D3',
        justifyContent: 'center',
        
    },
    inner: {
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FF6EB1',
        marginBottom: 20,
        fontFamily: 'Comic Sans MS',
        textAlign: 'center',
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginBottom: 20,
        borderRadius: 15,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        color: '#000',
        marginBottom: 15,
        borderColor: '#FF6EB1',
        borderWidth: 1,
        fontFamily: 'Arial',
    },
    button: {
        width: '100%',
        height: 55,
        backgroundColor: '#FF6EB1',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#FF6EB1',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
        marginTop: 10,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Comic Sans MS',
    },
    errorText: {
        color: '#D9534F',
        fontSize: 14,
        marginBottom: 10,
        textAlign: 'center',
        fontFamily: 'Arial',
    },
});

export default ForgotPasswordScreen;
