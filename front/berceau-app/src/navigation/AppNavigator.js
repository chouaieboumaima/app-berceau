import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";
import useAuthStore from "../store/UseAuthStore"; // Import du store Zustand

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    const { isAuthenticated, checkAuthStatus } = useAuthStore();

 
    console.log(isAuthenticated);


    return (
        <Stack.Navigator>
            {isAuthenticated ? (
                <Stack.Screen
                    name="Main"
                    component={MainNavigator}
                    options={{ headerShown: false }}
                />
            ) : (
                <Stack.Screen
                    name="AuthNavigator"
                    component={AuthNavigator}
                    options={{ headerShown: false }}
                />
            )}
        </Stack.Navigator>
    );
};

export default AppNavigator;
