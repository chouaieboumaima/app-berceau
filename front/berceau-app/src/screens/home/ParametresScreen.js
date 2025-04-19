import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

const SettingsScreen = () => {
    const navigation = useNavigation();

    // États pour les préférences
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [babyName, setBabyName] = useState('Bébé');
    const [profileName, setProfileName] = useState('Nom d\'utilisateur');

    const handleLogout = () => {
        // Ici, tu peux ajouter la logique pour déconnecter l'utilisateur si nécessaire, comme effacer le token ou rediriger
        console.log("Utilisateur déconnecté");
        navigation.navigate('Login'); // Remplacer 'Login' par le nom de ton écran de connexion
    };

    return (
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#FFEBF0' }]}>
            <Text style={[styles.header, { color: isDarkMode ? '#FF6347' : '#FF6347' }]}>Paramètres</Text>
            
            {/* Carte Profil */}
            <View style={[styles.card, { backgroundColor: isDarkMode ? '#444' : '#fff' }]}>
                <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Profile')}>
                    <Icon name="user" size={24} color="#FF6347" />
                    <Text style={[styles.optionText, { color: isDarkMode ? '#fff' : '#333' }]}>{profileName}</Text>
                </TouchableOpacity>
            </View>

            {/* Carte Bébé */}
            <View style={[styles.card, { backgroundColor: isDarkMode ? '#444' : '#fff' }]}>
                <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Bebes')}>
                    <Icon name="users" size={24} color="#FF6347" />
                    <Text style={[styles.optionText, { color: isDarkMode ? '#fff' : '#333' }]}>Mon Bébé: {babyName}</Text>
                </TouchableOpacity>
            </View>

            {/* Carte Préférences */}
            <View style={[styles.card, { backgroundColor: isDarkMode ? '#444' : '#fff' }]}>
                <View style={styles.option}>
                    <Icon name="moon" size={24} color="#FF6347" />
                    <Text style={[styles.optionText, { color: isDarkMode ? '#fff' : '#333' }]}>Mode Sombre</Text>
                    <Switch 
                        value={isDarkMode} 
                        onValueChange={() => setIsDarkMode(!isDarkMode)}
                        style={styles.switch}
                    />
                </View>

                <View style={styles.option}>
                    <Icon name="bell" size={24} color="#FF6347" />
                    <Text style={[styles.optionText, { color: isDarkMode ? '#fff' : '#333' }]}>Notifications</Text>
                    <Switch 
                        value={notificationsEnabled} 
                        onValueChange={() => setNotificationsEnabled(!notificationsEnabled)}
                        style={styles.switch}
                    />
                </View>
            </View>

            {/* Bouton Déconnexion */}
            <TouchableOpacity style={[styles.logoutButton, { backgroundColor: isDarkMode ? '#FF6347' : '#FF6347' }]} onPress={handleLogout}>
                <Icon name="log-out" size={24} color="#fff" />
                <Text style={styles.logoutButtonText}>Déconnexion</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    header: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    card: {
        width: '100%',
        maxWidth: 350, // Limite de largeur pour une mise en page plus professionnelle
        borderRadius: 15,
        paddingVertical: 15,
        paddingHorizontal: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 5,
        marginBottom: 15,
        borderWidth: 2,
        borderColor: '#FF6347', // Bordure colorée pour un look enfantin
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#FF6347', // Bordure du bas colorée pour chaque option
    },
    optionText: {
        fontSize: 20,
        marginLeft: 15,
        flex: 1,
        fontFamily: 'Comic Sans MS', // Police enfantine
    },
    switch: {
        transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 12,
        justifyContent: 'center',
        width: '100%',
        elevation: 5,
        marginTop: 30,
    },
    logoutButtonText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 12,
        fontFamily: 'Comic Sans MS', // Police enfantine
    },
});

export default SettingsScreen;
