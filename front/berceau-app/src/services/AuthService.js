import { API_URL } from '@env';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';



console.log("API_URL:", API_URL);

const api = axios.create({
    baseURL: `${API_URL}/auths`,
    headers: { 'Content-Type': 'application/json' }
});

export const signIn = async (email, password) => {
    try {
        const response = await api.post('/signIn', { email, password });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const signUp = async (nom, prenom, email, password) => {
  try {
      const data = { nom, prenom, email, password };
      console.log("Sending signUp data:", data);
      const response = await api.post('/signUp', data);
      return response.data;
  } catch (error) {
      console.error("SignUp error response:", error.response?.data); // 👈 important
      throw error;
  }
};
export const forgot = async (email) => {
  try {
      console.log("📤 Appel API: /forgot avec email:", email);
      const response = await api.post('/forgot', { email });
      console.log("✅ Réponse du backend:", response.data);
      return response.data;
  } catch (error) {
      console.error("❌ Erreur Axios /forgot:", error);
      if (error.response) {
          console.error("📄 Erreur backend:", error.response.data);
          console.error("📡 Statut HTTP:", error.response.status);
      }
      throw error;
  }
};


export const verifyCode = async (email, code) => {
  try {
      const response = await api.post('/verifyCode', { email, code });
      return response.data;
  } catch (error) {
      console.error("Erreur lors de la vérification du code:", error); // 👈 Ajoutez un log détaillé ici
      throw error;
  }
};


export const updatePassword = async (email, newPassword, code) => {
  try {
      const response = await api.patch('/', { email, newPassword, code });
      return response.data;
  } catch (error) {
      throw error;
  }
};
export const checkAuthStatus = async () => {
  try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) return false;

      // Vérifie si le token est toujours valide avec une requête à ton backend
      const response = await api.get("/checkToken", {
          headers: { Authorization: `Bearer ${token}` }
      });

      return response.data.valid ? { user: response.data.user, token } : false;
  } catch (error) {
      return false;
  }
};
export default api;