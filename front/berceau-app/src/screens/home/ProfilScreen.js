import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const ProfileScreen = () => {
  // État pour stocker le nom et le prénom de l'utilisateur
  const [name, setName] = useState('John');
  const [lastName, setLastName] = useState('Doe');

  const handleUpdate = () => {
    Alert.alert('Mise à jour réussie!', 'Votre profil a été mis à jour.');
  };

  const handleLogout = () => {
    Alert.alert('Déconnexion', 'Vous avez été déconnecté.');
    // Logique de déconnexion ici (ex: réinitialiser l'état, supprimer le token d'authentification)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Votre Profil</Text>
      
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Nom"
      />
      
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
        placeholder="Prénom"
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Mettre à jour</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Se déconnecter</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FF69B4', // Une couleur douce et enfantine
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#FF69B4',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
  },
  logoutButton: {
    backgroundColor: '#ff6347', // Une couleur différente pour la déconnexion
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
