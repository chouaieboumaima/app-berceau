import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Icônes mignonnes et adaptées

const ConsulterVentilateurScreen = () => {
  const [etat, setEtat] = useState('Éteint');
  const [modeAuto, setModeAuto] = useState(true);

  const handleAllumer = () => setEtat('Allumé');
  const handleEteindre = () => setEtat('Éteint');
  const toggleMode = () => setModeAuto(!modeAuto);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Ventilateur Bébé 🌬️</Text>

      <View style={styles.card}>
        <Text style={styles.label}>État :</Text>
        <Text style={styles.value}>{etat}</Text>

        <Text style={styles.label}>Vitesse :</Text>
        <Text style={styles.value}>3 / 5</Text>

        <Text style={styles.label}>Mode :</Text>
        <Text style={styles.value}>{modeAuto ? 'Automatique' : 'Manuel'}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.btnOn} onPress={handleAllumer}>
          <Icon name="power" size={20} color="#333" style={styles.icon} />
          <Text style={styles.btnText}>Allumer</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnOff} onPress={handleEteindre}>
          <Icon name="power-off" size={20} color="#333" style={styles.icon} />
          <Text style={styles.btnText}>Éteindre</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnToggle} onPress={toggleMode}>
          <Icon name="sync" size={20} color="#333" style={styles.icon} />
          <Text style={styles.btnText}>
            Mode {modeAuto ? 'Manuel' : 'Automatique'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFF0F5',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6A5ACD',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#B0C4DE',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 30,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    color: '#8A2BE2',
  },
  value: {
    fontSize: 18,
    color: '#555',
    marginBottom: 5,
  },
  buttonContainer: {
    alignItems: 'center',
    gap: 15,
  },
  btnOn: {
    backgroundColor: '#98FB98',
    padding: 14,
    borderRadius: 12,
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnOff: {
    backgroundColor: '#FFB6C1',
    padding: 14,
    borderRadius: 12,
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnToggle: {
    backgroundColor: '#ADD8E6',
    padding: 14,
    borderRadius: 12,
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
  icon: {
    marginRight: 5,
  },
});

export default ConsulterVentilateurScreen;
