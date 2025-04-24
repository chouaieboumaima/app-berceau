import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';//permet de créer une navigation par onglets en bas de l’écran.
import { MaterialCommunityIcons } from 'react-native-vector-icons';// bibliothèque d’icônes compatible avec React Native.
import { NavigationContainer } from '@react-navigation/native';//composant racine qui gère l’état de navigation de l’application.

// Importez vos écrans
import HomeScreen from '../screens/home/HomeScreen';  
import ProfileScreen from '../screens/home/ProfilScreen'; 
import BebeScreen from '../screens/home/BebeScreen'; 
import ParametresScreen from '../screens/home/ParametresScreen'; 

const Tab = createBottomTabNavigator();//On crée une instance du navigateur à onglets

const BottomTabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: '#FF69B4' }, // Couleur de fond de la barre
          tabBarActiveTintColor: 'white', // blanc pour l’icône sélectionnée.
          tabBarInactiveTintColor: 'gray', //  gris pour les icônes non sélectionnées.
        }}
      >
        <Tab.Screen
          name="Home"
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
