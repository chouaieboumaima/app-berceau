import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AjouterBerceauScreen = () => {
  const [nomBerceau, setNomBerceau] = useState('');
  const [nomBebe, setNomBebe] = useState('');
  const [sexeBebe, setSexeBebe] = useState('');
  const [dateNaissance, setDateNaissance] = useState('');
  const [wifiNom, setWifiNom] = useState('');
  const [wifiMdp, setWifiMdp] = useState('');
  const navigation = useNavigation();

  const ajouterBerceau = () => {
    if (!nomBerceau || !nomBebe || !sexeBebe || !dateNaissance || !wifiNom || !wifiMdp) {
      Alert.alert('Champs manquants', 'Veuillez remplir tous les champs.');
      return;
    }

    console.log({
      nomBerceau,
      nomBebe,
      sexeBebe,
      dateNaissance,
      wifiNom,
      wifiMdp,
    });

    Alert.alert('🎉 Succès', 'Le berceau a été ajouté avec succès !');
    navigation.navigate('HomeScreen');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🍼 Ajouter un nouveau berceau</Text>

      <TextInput
        style={styles.input}
        placeholder="Nom du berceau"
        value={nomBerceau}
        onChangeText={setNomBerceau}
      />
      <TextInput
        style={styles.input}
        placeholder="Nom du bébé"
        value={nomBebe}
        onChangeText={setNomBebe}
      />

      <Text style={styles.label}>Sexe du bébé</Text>
      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={[
            styles.radioButton,
            sexeBebe === 'Fille' && styles.radioButtonSelectedFille,
          ]}
          onPress={() => setSexeBebe('Fille')}
        >
          <Text style={styles.radioText}>👧 Fille</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.radioButton,
            sexeBebe === 'Garçon' && styles.radioButtonSelectedGarcon,
          ]}
          onPress={() => setSexeBebe('Garçon')}
        >
          <Text style={styles.radioText}>👦 Garçon</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Date de naissance (JJ/MM/AAAA)"
        value={dateNaissance}
        onChangeText={setDateNaissance}
      />
      <TextInput
        style={styles.input}
        placeholder="Nom du WiFi"
        value={wifiNom}
        onChangeText={setWifiNom}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe WiFi"
        value={wifiMdp}
        onChangeText={setWifiMdp}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={ajouterBerceau}>
        <Text style={styles.buttonText}> Ajouter le berceau</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFF0F5',
    alignItems: 'center',
    padding: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FF69B4',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 14,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#FFD1DC',
    fontSize: 16,
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: '5%',
    marginBottom: 8,
    fontSize: 16,
    color: '#555',
    fontWeight: '500',
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginBottom: 20,
  },
  radioButton: {
    flex: 1,
    backgroundColor: '#FFE4E1',
    padding: 12,
    borderRadius: 12,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  radioButtonSelectedFille: {
    backgroundColor: '#FFC0CB',
  },
  radioButtonSelectedGarcon: {
    backgroundColor: '#ADD8E6',
  },
  radioText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  button: {
    width: '90%',
    backgroundColor: '#FF69B4',
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AjouterBerceauScreen;
