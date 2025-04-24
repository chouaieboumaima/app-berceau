import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useAuthStore from '../../store/UseAuthStore';
import Icon from 'react-native-vector-icons/Feather';

const SettingsScreen = () => {
    const { logout } = useAuthStore();
    const navigation = useNavigation();

    const [isDarkMode, setIsDarkMode] = useState(false);
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    const handleLogout = () => logout();

    const theme = isDarkMode ? darkTheme : lightTheme;

    return (
        <ScrollView contentContainerStyle={[styles.container, theme.container]}>
            <Text style={[styles.header, theme.header]}>Paramètres</Text>

            {/* Carte Profil */}
            <View style={[styles.card, theme.card]}>
                <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Profil')}>
                    <Icon name="user" size={22} color={theme.icon.color} />
                    <Text style={[styles.optionText, theme.text]}>Mon Profil</Text>
                </TouchableOpacity>
            </View>

            {/* Carte Bébés */}
            <View style={[styles.card, theme.card]}>
                <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Bébé')}>
                    <Icon name="users" size={22} color={theme.icon.color} />
                    <Text style={[styles.optionText, theme.text]}>Mes Bébés</Text>
                </TouchableOpacity>
            </View>

            {/* Carte Préférences */}
            <View style={[styles.card, theme.card]}>
                <View style={styles.option}>
                    <Icon name="moon" size={22} color={theme.icon.color} />
                    <Text style={[styles.optionText, theme.text]}>Mode Sombre</Text>
                    <Switch
                        value={isDarkMode}
                        onValueChange={() => setIsDarkMode(!isDarkMode)}
                        style={styles.switch}
                    />
                </View>

                <View style={styles.option}>
                    <Icon name="bell" size={22} color={theme.icon.color} />
                    <Text style={[styles.optionText, theme.text]}>Notifications</Text>
                    <Switch
                        value={notificationsEnabled}
                        onValueChange={() => setNotificationsEnabled(!notificationsEnabled)}
                        style={styles.switch}
                    />
                </View>
            </View>

            {/* Déconnexion */}
            <TouchableOpacity style={[styles.logoutButton, theme.logoutButton]} onPress={handleLogout}>
                <Icon name="log-out" size={22} color="#fff" />
                <Text style={styles.logoutButtonText}>Déconnexion</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        padding: 24,
        paddingTop: 80
    },
    header: {
        fontSize: 30,
        fontWeight: '700',
        marginBottom: 30,
        textAlign: 'center',
        fontFamily: 'Comic Sans MS',
    },
    card: {
        width: '100%',
        maxWidth: 360,
        borderRadius: 20,
        paddingVertical: 16,
        paddingHorizontal: 20,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 10,
        elevation: 4,
        marginBottom: 20,
        borderLeftWidth: 8,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
        borderBottomWidth: 1,
    },
    optionText: {
        fontSize: 18,
        marginLeft: 15,
        flex: 1,
        fontFamily: 'Comic Sans MS',
    },
    switch: {
        transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],
        marginLeft: 10,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 30,
        justifyContent: 'center',
        width: '100%',
        elevation: 5,
        marginTop: 30,
    },
    logoutButtonText: {
        fontSize: 18,
        color: '#FFF',
        fontWeight: '600',
        marginLeft: 10,
        fontFamily: 'Comic Sans MS',
    },
});

// Thème clair
const lightTheme = {
    container: {
        backgroundColor: '#FFF5F7',
    },
    header: {
        color: '#333',
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderLeftColor: '#FF69B4',
    },
    icon: {
        color: '#555',
    },
    text: {
        color: '#333',
    },
    logoutButton: {
        backgroundColor: '#FF69B4',
    },
};

// Thème sombre
const darkTheme = {
    container: {
        backgroundColor: '#1E1E1E',
    },
    header: {
        color: '#FFF',
    },
    card: {
        backgroundColor: '#2C2C2C',
        borderLeftColor: '#FF69B4',
    },
    icon: {
        color: '#FFF',
    },
    text: {
        color: '#FFF',
    },
    logoutButton: {
        backgroundColor: '#FF69B4',
    },
};

export default SettingsScreen;
