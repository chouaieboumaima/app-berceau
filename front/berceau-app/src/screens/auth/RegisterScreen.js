import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { signUp } from '../../services/AuthService';

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      await signUp(nom, prenom, email, password);
      setMessage('Compte créé avec succès !');
      setTimeout(() => navigation.navigate('Login'), 2000);
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'inscription");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={require('../../../assets/add-user.png')} style={styles.image} />
        <Text style={styles.title}>Créer un compte</Text>
        <Text style={styles.subtitle}>Inscris-toi pour commencer à surveiller ton bébé</Text>

        {message !== '' && <Text style={styles.success}>{message}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Nom"
          autoCapitalize="words"
          onChangeText={setNom}
          value={nom}
        />
        <TextInput
          style={styles.input}
          placeholder="Prénom"
          autoCapitalize="words"
          onChangeText={setPrenom}
          value={prenom}
        />
        <TextInput
          style={styles.input}
          placeholder="Adresse e-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={setEmail}
          value={email}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Mot de passe"
            secureTextEntry={!isPasswordVisible}
            onChangeText={setPassword}
            value={password}
          />
          <TouchableOpacity style={styles.eyeIcon} onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <Icon name={isPasswordVisible ? 'eye-off' : 'eye'} size={24} color="#FF69B4" />
          </TouchableOpacity>
        </View>

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Confirmer le mot de passe"
            secureTextEntry={!isConfirmPasswordVisible}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
          />
          <TouchableOpacity style={styles.eyeIcon} onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}>
            <Icon name={isConfirmPasswordVisible ? 'eye-off' : 'eye'} size={24} color="#FF69B4" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>S'inscrire</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.registerLink}>Tu as déjà un compte ? Se connecter</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF0F5' },
  scrollContainer: { alignItems: 'center', justifyContent: 'center', paddingVertical: 50 },
  image: { width: 150, height: 150, marginBottom: 20, resizeMode: 'contain' },
  title: { fontSize: 26, fontWeight: 'bold', color: '#FF69B4', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#555', marginBottom: 30 },
  input: {
    width: '80%', backgroundColor: '#fff', padding: 14, borderRadius: 10,
    marginBottom: 15, borderWidth: 1, borderColor: '#FFB6C1'
  },
  passwordContainer: { position: 'relative', width: '80%' },
  passwordInput: {
    width: '100%', backgroundColor: '#fff', padding: 14, borderRadius: 10,
    marginBottom: 15, borderWidth: 1, borderColor: '#FFB6C1'
  },
  eyeIcon: { position: 'absolute', right: 10, top: 15 },
  button: {
    backgroundColor: '#FF69B4', paddingVertical: 14, paddingHorizontal: 40,
    borderRadius: 10, marginTop: 10, shadowColor: '#000',
    shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 },
  },
  buttonText: { color: '#fff', fontSize: 16 },
  registerLink: { marginTop: 20, color: '#FF69B4', textDecorationLine: 'underline' },
  success: { color: 'green', marginBottom: 10 }
});