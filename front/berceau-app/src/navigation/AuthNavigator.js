// src/navigation/AuthNavigator.js

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ConsulterBerceauScreen from '../screens/berceau/ConsulterBerceauScreen';

// Importation des écrans
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import AjouterBerceauScreen from '../screens/berceau/AjouterBerceauScreen';
import OublierScreen from '../screens/auth/OublierScreen'
import VerifierScreen from '../screens/auth/VerifierScreen'
import NewPasswordScreen from '../screens/auth/NewPasswordScreen'
const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Oublier" component={OublierScreen}/>
      <Stack.Screen name="Verifier" component={VerifierScreen}/>
      <Stack.Screen name="NewPassword" component={NewPasswordScreen}/>
      
      
    </Stack.Navigator>
  );
};

export default AuthNavigator;
