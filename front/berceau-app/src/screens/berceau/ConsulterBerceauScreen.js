import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const capteurs = [
  { id: 'temp', label: 'Température', image: require('../../../assets/temperature.png'), value: '23°C' },
  { id: 'humid', label: 'Humidité', image: require('../../../assets/humidite.png'), value: '45%' },
  { id: 'move', label: 'Mouvement', image: require('../../../assets/mouvement.png') },
  { id: 'light', label: 'Lumière', image: require('../../../assets/lumiere.png') },
  { id: 'fan', label: 'Ventilateur', image: require('../../../assets/climatiseur.png') },
  { id: 'camera', label: 'Caméra', image: require('../../../assets/camera.png') },
];

const ConsulterBerceauScreen = () => {
  const navigation = useNavigation();

  const handleConsulter = (id) => {
    switch (id) {
      case 'camera':
        navigation.navigate('ConsulterCamera');
        break;
      case 'fan':
        navigation.navigate('ConsulterVentillateur');
        break;
      case 'move':
        navigation.navigate('ConsulterServo');
        break;
      case 'light':
        navigation.navigate('ConsulterLumiere');
        break;
      default:
        Alert.alert('Info', 'Interface non disponible pour ce capteur.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Détails du Berceau</Text>
      <View style={styles.grid}>
        {capteurs.map((item) => (
          <View key={item.id} style={styles.card}>
            <Image source={item.image} style={styles.icon} />
            <Text style={styles.label}>{item.label}</Text>

            {/* Affichage direct des valeurs pour température et humidité */}
            {item.id === 'temp' || item.id === 'humid' ? (
              <Text style={styles.valueText}>{item.value}</Text>
            ) : (
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleConsulter(item.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.buttonText}>Consulter</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
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
    color: '#FF69B4',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  icon: {
    width: 70,
    height: 70,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    fontWeight: '500',
    color: '#333',
  },
  valueText: {
    fontSize: 18,
    color: '#FF69B4',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#FF69B4',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default ConsulterBerceauScreen;
