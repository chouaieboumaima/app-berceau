import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false, // Initialement à false
  isLoading: true, // Ajout du chargement au début

  // Fonction de connexion
  login: async (userData) => {
    try {
      await AsyncStorage.setItem("userToken", userData.token);
      set({
        user: userData.user,
        token: userData.token,
        isAuthenticated: true,
        isLoading: false, // Fin du chargement après connexion
      });
    } catch (error) {
      console.error("Erreur lors du login :", error);
      set({ isAuthenticated: false, isLoading: false });
    }
  },

  // Fonction de déconnexion
  logout: async () => {
    await AsyncStorage.removeItem("userToken");
    set({ user: null, token: null, isAuthenticated: false, isLoading: false });
  },

  // Fonction de vérification de l'état d'authentification
  checkAuthStatus: async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        // Simuler la récupération des informations utilisateur (par exemple avec une API)
        const user = { name: 'Utilisateur Exemple', email: 'exemple@domaine.com' }; // Remplacer par une vraie API
        console.log('Token trouvé:', token); // Affiche le token
        set({
          token,
          user,
          isAuthenticated: true, // Authentification réussie
          isLoading: false, // Fin du chargement
        });
      } else {
        console.log('Aucun token trouvé');
        set({
          isAuthenticated: false, // Aucun token => non authentifié
          isLoading: false, // Fin du chargement
        });
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du token :', error);
      set({
        isAuthenticated: false,
        isLoading: false, // Fin du chargement en cas d'erreur
      });
    }
  },

  // Fonction pour définir manuellement l'utilisateur
  setUser: (user) => set({ user }),
}));

export default useAuthStore;