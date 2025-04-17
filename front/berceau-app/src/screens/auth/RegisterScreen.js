import React, { useState } from 'react';//pour gérer les valeurs du formulaire (nom, email, mot de passe…).
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
import { useNavigation } from '@react-navigation/native';//permet de naviguer entre les écrans (ex: aller vers "Login").
import Icon from 'react-native-vector-icons/Feather'; // Utilisation d'une icône d'œil

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [isAccountCreated, setIsAccountCreated] = useState(false);// pour afficher un message de succès une fois inscrit.
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // État pour la visibilité du mot de passe
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false); // État pour la confirmation du mot de passe
//definition fct handleRegister():
// Vérifie si les deux mots de passe sont identiques.
//Si oui, affiche un message dans la console et change isAccountCreated 
// à true.Sinon, affiche une alerte.
  const handleRegister = () => {
    if (password === confirmPassword) {
      console.log('Création du compte avec', name, email, password);
      setIsAccountCreated(true); // Compte créé avec succès
    } else {
      alert('Les mots de passe ne correspondent pas.');
    }
  };
//definition Fonction handleLoginRedirect():Quand on clique sur "Se connecter", cette fonction redirige vers l’écran Login.
  const handleLoginRedirect = () => {
    navigation.navigate('Login');
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

        {!isAccountCreated ? (
          <>
            <Text style={styles.title}>Créer un compte</Text>
            <Text style={styles.subtitle}>Inscris-toi pour commencer à surveiller ton bébé</Text>
             
            <TextInput
              style={styles.input}
              placeholder="Nom complet"
              autoCapitalize="words"
              onChangeText={setName}
              value={name}
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
                secureTextEntry={!isPasswordVisible} // Si isPasswordVisible est false, le mot de passe est masqué
                onChangeText={setPassword}
                value={password}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setIsPasswordVisible(!isPasswordVisible)} // Bascule la visibilité
              >
                <Icon name={isPasswordVisible ? 'eye-off' : 'eye'} size={24} color="#FF69B4" />
              </TouchableOpacity>
            </View>

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Confirmer le mot de passe"
                secureTextEntry={!isConfirmPasswordVisible} // Masquer ou afficher selon l'état
                onChangeText={setConfirmPassword}
                value={confirmPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)} // Bascule la visibilité
              >
                <Icon name={isConfirmPasswordVisible ? 'eye-off' : 'eye'} size={24} color="#FF69B4" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Créer un compte</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.registerLink}>
                Déjà un compte ? Se connecter
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.successMessage}>Compte créé avec succès ! 🎉</Text>
            <TouchableOpacity style={styles.button} onPress={handleLoginRedirect}>
              <Text style={styles.buttonText}>Se connecter</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,//Prends tout l'espace disponible dans le conteneur parent.
    backgroundColor: '#FFF0F5',
  },
  scrollContainer: {
    alignItems: 'center',//Centre les éléments horizontalement (sur l’axe transversal).
    justifyContent: 'center',// Centre les éléments verticalement (sur l’axe principal).
    paddingVertical: 50,// Ajoute 50 pixels de marge en haut et en bas.
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,//Ajoute une marge extérieure de 20 pixels en dessous de l’élément.
    resizeMode: 'contain',// l’image garde ses proportions d’origine (rapport hauteur/largeur) et est entièrement visible dans le cadre défini.
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FF69B4',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 30,
  },
  input: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,//epaisseur de la bordure 1px
    borderColor: '#FFB6C1',
  },
  passwordContainer: {
    position: 'relative',
    width: '80%',
  },
  passwordInput: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#FFB6C1',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 15,
  },
  button: {
    backgroundColor: '#FF69B4',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 10,
    shadowColor: '#000',// couleur de l'ombre projetée
    shadowOpacity: 0.1,//l'opacité de l'ombre. Elle contrôle la transparence de l'ombre projetée.
    shadowOffset: { width: 0, height: 2 },//l'emplacement de l'ombre par rapport à l'élément.
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  registerLink: {
    marginTop: 20,
    color: '#FF69B4',
    textDecorationLine: 'underline',
  },
  successMessage: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 20,
  },
});
