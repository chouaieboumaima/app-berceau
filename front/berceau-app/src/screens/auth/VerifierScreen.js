import React, { useState } from 'react';
import {
    View, Text, Image, TextInput, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator, Alert
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { verifyCode } from '../../services/AuthService';

const ConfirmEmail = () => {
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const route = useRoute();
    const { email } = route.params; // Récupérer l'email passé depuis l'écran précédent

    const handleVerifyCode = async () => {
        if (code.length !== 6) {
            Alert.alert("Erreur", "Le code doit contenir 6 chiffres.");
            return;
        }

        setLoading(true);

        try {
            const result = await verifyCode(email, code);  // Vérifier la réponse ici
            setLoading(false);
            Alert.alert("Succès", "Code vérifié avec succès !");
            navigation.navigate("NewPassword", { email, code });
        } catch (error) {
            setLoading(false);
            Alert.alert("Erreur", error.response?.data?.message || "Code incorrect.");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Vérification Email</Text>

            <Image source={require('../../../assets/security.png')} style={styles.image} />

            <Text style={styles.messageText}>
                Veuillez entrer le code envoyé à votre email.
            </Text>

            <TextInput
                style={styles.pinInput}
                keyboardType="number-pad"
                maxLength={6}
                placeholder="Entrez le code"
                placeholderTextColor="#B0C4DE"
                value={code}
                onChangeText={setCode}
            />

            <TouchableOpacity disabled={loading} style={styles.continueButton} onPress={handleVerifyCode}>
                {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.buttonText}>Vérifier</Text>}
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#FBE8D3',  // Couleur pastel plus claire
        alignItems: 'center',
        paddingHorizontal: 30,
        marginTop: 40,
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FF6F61',  // Une couleur rose douce et chaleureuse
        textAlign: 'center',
        marginBottom: 85,
        marginTop: 60,
        fontFamily: 'Poppins',  // Police moderne, arrondie et agréable
    },
    image: {
        width: 140,
        height: 140,
        marginBottom: 25,
        borderRadius: 70,  // Bords arrondis pour un effet encore plus enfantin
    },
    messageText: {
        fontSize: 16,
        color: '#6C757D', // Gris doux et apaisant
        textAlign: 'center',
        marginBottom: 40,
        fontFamily: 'Poppins',
    },
    pinInput: {
        width: '85%',
        height: 55,
        backgroundColor: '#FFF',
        borderRadius: 15,  // Bordures plus arrondies
        textAlign: 'center',
        fontSize: 22,
        fontWeight: '600',
        borderWidth: 1.5,
        borderColor: '#FF6F61',  // Rose doux pour une touche de couleur
        color: '#4F6D7A',  // Gris doux
        marginBottom: 30,
        fontFamily: 'Poppins',
        shadowColor: '#FF6F61',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 3,  // Ombre pour un effet de profondeur
    },
    continueButton: {
        width: '85%',
        height: 55,
        backgroundColor: '#FF6F61',  // Couleur chaleureuse et douce
        borderRadius: 30,  // Bords arrondis pour un aspect plus doux
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#FF6F61',
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
        marginBottom: 20,  // Ajout d'un espacement pour une meilleure lisibilité
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Poppins',
    },
});

export default ConfirmEmail;
