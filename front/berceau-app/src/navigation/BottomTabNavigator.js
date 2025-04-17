import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { NavigationContainer } from '@react-navigation/native';

// Importez vos écrans
import HomeScreen from '../screens/home/HomeScreen';  // Assurez-vous que le chemin est correct
import ProfileScreen from '../screens/home/ProfilScreen'; // Vous devrez créer un écran pour le profil
import BebeScreen from '../screens/home/BebeScreen'; // Vous devrez créer un écran pour bébé
import ParametresScreen from '../screens/home/ParametresScreen'; // Vous devrez créer un écran pour paramètres

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: '#FF69B4' }, // Couleur de fond de la barre
          tabBarActiveTintColor: 'white', // Couleur des icônes actives
          tabBarInactiveTintColor: 'gray', // Couleur des icônes inactives
        }}
      >
        <Tab.Screen
          name="Accueil"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profil"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Bébé"
          component={BebeScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="baby" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Paramètres"
          component={ParametresScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="cogs" size={24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomTabNavigator;
