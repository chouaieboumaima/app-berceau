// MainNavigator.js

import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Screens
import HomeScreen from '../screens/home/HomeScreen';
import AjouterBerceauScreen from '../screens/berceau/AjouterBerceauScreen';
import ConsulterBerceauScreen from '../screens/berceau/ConsulterBerceauScreen';
import ConsulterCameraScreen from '../screens/berceau/ConsulterCameraScreen';
import ConsulterVentillateurScreen from '../screens/berceau/ConsulterVentillateurScreen';
import ConsulterLumiereScreen from '../screens/berceau/ConsulterLumiereScreen';
import ConsulterServoScreen from '../screens/berceau/ConsulterServoScreen';

// Écrans fictifs (à personnaliser plus tard)


// Pour profileScreen
import ProfilScreen from '../screens/home/ProfilScreen';
//Pour BebeScreen
import BebeScreen from '../screens/home/BebeScreen';
//pour parametreScreen
import ParametresScreen from '../screens/home/ParametresScreen';


// Création des navigateurs
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Stack Navigator pour la page d’accueil
const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      animation: 'slide_from_right',
    }}
  >
    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="AjouterBerceau" component={AjouterBerceauScreen} options={{ title: "Ajouter un berceau" }} />
    <Stack.Screen name="ConsulterBerceau" component={ConsulterBerceauScreen} options={{ title: "Consulter le berceau" }} />
    <Stack.Screen name="ConsulterCamera" component={ConsulterCameraScreen} options={{ title: "Caméra" }} />
    <Stack.Screen name="ConsulterVentillateur" component={ConsulterVentillateurScreen} options={{ title: "Ventilateur" }} />
    <Stack.Screen name="ConsulterLumiere" component={ConsulterLumiereScreen} options={{ title: "Lumière" }} />
    <Stack.Screen name="ConsulterServo" component={ConsulterServoScreen} options={{ title: "Servo-moteur" }} />
  </Stack.Navigator>
);

// Main Tab Navigator
const MainNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        switch (route.name) {
          case 'Home':
            iconName = 'home';
            break;
          case 'Profil':
            iconName = 'person';
            break;
          case 'Bébé':
            iconName = 'child-care';
            break;
          case 'Paramètres':
            iconName = 'settings';
            break;
        }
        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#FF69B4',
      tabBarInactiveTintColor: 'gray',
      headerShown: false,
    })}
  >
    <Tab.Screen name="Home" component={HomeStack} />
    <Tab.Screen name="Profil" component={ProfilScreen} />
    <Tab.Screen name="Bébé" component={BebeScreen} />
    <Tab.Screen name="Paramètres" component={ParametresScreen} />
  </Tab.Navigator>
);

export default MainNavigator;
