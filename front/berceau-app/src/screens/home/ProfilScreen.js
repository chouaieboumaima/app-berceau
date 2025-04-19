import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView
} from 'react-native';

const ProfileScreen = () => {
  const [name, setName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [email, setEmail] = useState('john.doe@example.com'); // ✅ Nouveau champ

  const handleUpdate = () => {
    Alert.alert('🎉 Mise à jour réussie', 'Votre profil a été mis à jour avec succès !');
  };

  const handleLogout = () => {
    Alert.alert('👋 Déconnexion', 'Vous avez été déconnecté.');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Image
          source={require('../../../assets/family.png')}
          style={styles.avatar}
        />
        <Text style={styles.title}>👨‍👩‍👧‍👦 Profil du parent</Text>

        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Nom"
          placeholderTextColor="#aaa"
        />

        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
          placeholder="Prénom"
          placeholderTextColor="#aaa"
        />

        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>✅ Mettre à jour</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.buttonText}>🚪 Se déconnecter</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFE4E1',
  },
  card: {
    backgroundColor: '#FFF',
    width: '100%',
    borderRadius: 30,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#FFC0CB',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 10,
  },
  avatar: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#FFD1DC',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FF69B4',
    marginBottom: 25,
    fontFamily: 'System',
  },
  input: {
    width: '100%',
    height: 48,
    backgroundColor: '#FFF8FA',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#FFDDEE',
    paddingHorizontal: 16,
    marginBottom: 15,
    fontSize: 17,
  },
  button: {
    backgroundColor: '#FF69B4',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginTop: 10,
    shadowColor: '#F08080',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  logoutButton: {
    backgroundColor: '#87CEFA',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginTop: 15,
    shadowColor: '#4682B4',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProfileScreen;
