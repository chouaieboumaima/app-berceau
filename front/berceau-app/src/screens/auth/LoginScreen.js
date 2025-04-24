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
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import useAuthStore from '../../store/UseAuthStore';
import { signIn, forgot } from '../../services/AuthService';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState(null);

  const login = useAuthStore(state => state.login);

  const handleLogin = async () => {
    try {
      console.log("ghjh ")

      const response = await signIn(email, password);
      console.log("ghjh "+response)
      await login({ user: response.user, token: response.token });

      // navigation.navigate('Home');
    } catch (err) {
      console.error(err);
      setError('Email ou mot de passe invalide');
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Veuillez entrer votre adresse e-mail pour réinitialiser votre mot de passe.');
      return;
    }

    try {
      await forgot(email);
      Alert.alert('Succès', 'Un lien de réinitialisation a été envoyé à votre adresse e-mail.');
      setError(null);
      // Si vous souhaitez naviguer vers un écran de réinitialisation après l'envoi, utilisez la navigation ici
      navigation.navigate('Oublier');
    } catch (err) {
      console.error(err);
      setError("Impossible d'envoyer l'e-mail de réinitialisation.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={require('../../../assets/add-user.png')}
          style={styles.image}
        />
        <Text style={styles.title}>Bienvenue, maman 💖</Text>
        <Text style={styles.subtitle}>Connecte-toi pour surveiller ton bébé</Text>

        {error && <Text style={styles.error}>{error}</Text>}

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
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Icon
              name={isPasswordVisible ? 'eye-off' : 'eye'}
              size={24}
              color="#FF69B4"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPassword}>Mot de passe oublié ?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerLink}>
            Pas encore de compte ? Crée un compte
          </Text>
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
    marginBottom: 5, borderWidth: 1, borderColor: '#FFB6C1'
  },
  eyeIcon: { position: 'absolute', right: 10, top: 15 },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginRight: '10%',
    color: '#FF69B4',
    marginBottom: 10,
    textDecorationLine: 'underline'
  },
  button: {
    backgroundColor: '#FF69B4', paddingVertical: 14, paddingHorizontal: 40,
    borderRadius: 10, marginTop: 10, shadowColor: '#000',
    shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 },
  },
  buttonText: { color: '#fff', fontSize: 16 },
  registerLink: { marginTop: 20, color: '#FF69B4', textDecorationLine: 'underline' },
  error: { color: 'red', marginBottom: 10 }
});