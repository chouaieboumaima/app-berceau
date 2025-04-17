import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons'; // ou react-native-vector-icons

const ConsulterLumiereScreen = () => {
  const [luminosity, setLuminosity] = useState(75);
  const [isOn, setIsOn] = useState(true);

  const toggleLight = () => setIsOn(prev => !prev);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* En‑tête avec icône */}
      <View style={styles.header}>
        <Icon name="lightbulb-on" size={32} color="#FFD700" />
        <Text style={styles.title}>Lumière du Berceau</Text>
      </View>

      <View style={styles.card}>
        {/* État */}
        <View style={styles.row}>
          <Icon
            name={isOn ? "power-plug" : "power-plug-off"}
            size={24}
            color={isOn ? "#32CD32" : "#FF6347"}
          />
          <Text style={[styles.label, { marginLeft: 8 }]}>
            État : <Text style={styles.value}>{isOn ? 'Allumée' : 'Éteinte'}</Text>
          </Text>
        </View>

        {/* Intensité */}
        <View style={styles.row}>
          <Icon name="white-balance-sunny" size={24} color="#FFD700" />
          <Text style={[styles.label, { marginLeft: 8 }]}>
            Intensité : <Text style={styles.value}>{luminosity}%</Text>
          </Text>
        </View>

        {/* Slider */}
        <View style={styles.sliderContainer}>
          <Text style={styles.sliderLabel}>
            {isOn ? "Glissez pour ajuster" : "Allumez la lumière pour régler"}
          </Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            step={1}
            value={luminosity}
            onValueChange={val => isOn && setLuminosity(val)}
            thumbTintColor="#FFD700"
            minimumTrackTintColor="#FFD700"
            maximumTrackTintColor="#E0E0E0"
            disabled={!isOn}
          />
        </View>

        {/* Boutons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, isOn && styles.buttonActive]}
            onPress={toggleLight}
            activeOpacity={0.8}
          >
            <Icon name="toggle-switch-off-outline" size={20} color="#fff" />
            <Text style={styles.buttonText}>Éteindre</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, !isOn && styles.buttonActive]}
            onPress={toggleLight}
            activeOpacity={0.8}
          >
            <Icon name="toggle-switch-outline" size={20} color="#fff" />
            <Text style={styles.buttonText}>Allumer</Text>
          </TouchableOpacity>
        </View>

        {/* Dernier changement */}
        <Text style={styles.footerText}>
          <Icon name="history" size={16} color="#888" />{' '}
          Dernier changement : Aujourd’hui à 12 h 30
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F0FFF4',
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: '#32CD32',
    marginLeft: 10,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  label: {
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
  },
  value: {
    fontSize: 18,
    color: '#555',
    fontWeight: '700',
  },
  sliderContainer: {
    marginVertical: 20,
  },
  sliderLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#CCC',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 30,
    width: '48%',
    justifyContent: 'center',
  },
  buttonActive: {
    backgroundColor: '#32CD32',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 6,
  },
  footerText: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ConsulterLumiereScreen;
