import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: null, // null pendant chargement initial

  login: async (userData) => {
    try {
      await AsyncStorage.setItem("userToken", userData.token);
      set({
        user: userData.user,
        token: userData.token,
        isAuthenticated: true,
      });
    } catch (error) {
      console.error("Erreur lors du login :", error);
      set({ isAuthenticated: false });
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem("userToken");
    set({ user: null, token: null, isAuthenticated: false });
  },

  checkAuthStatus: async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        set({ token, isAuthenticated: true });
      } else {
        set({ isAuthenticated: false });
      }
    } catch (error) {
      set({ isAuthenticated: false });
    }
  },

  setUser: (user) => set({ user }),
}));

export default useAuthStore;
