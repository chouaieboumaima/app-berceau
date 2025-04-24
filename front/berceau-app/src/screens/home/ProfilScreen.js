import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import useAuthStore from '../../store/UseAuthStore';
import { getUserByEmail, updateUser } from './../../services/UserService';

const ProfileScreen = () => {
  const { user } = useAuthStore();
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
        const fetchUserData = async () => {
            try {
                const response = await getUserByEmail(user.email);
                const { prenom, nom } = response.data.data;
                setPrenom(prenom);
                setNom(nom);
                setEmail(user.email);
                setFullName(`${prenom} ${nom}`);
            } catch (error) {
                Alert.alert('Erreur', "Impossible de récupérer les données.");
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }
}, [user]);
const handleUpdateProfile = async () => {
  try {
      const updatedData = { prenom, nom };
      await updateUser(user.id, updatedData);
      setFullName(`${prenom} ${nom}`);
      setIsEditing(false);
      Alert.alert('Succès', 'Profil mis à jour avec succès !');
  } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue lors de la mise à jour.');
  }
};
if (!user) return <Text style={styles.errorText}>Utilisateur non authentifié</Text>;
if (loading) return <ActivityIndicator size="large" color="#6200EE" style={styles.loader} />;

return (
    <ScrollView contentContainerStyle={styles.container}>
        {/* Image de Profil */}
        <View style={styles.header}>
            <Image source={require('./../../../assets/info.png')} style={styles.avatar} />

        </View>

        {/* Formulaire de profil */}
        <View style={styles.form}>
            <Text style={styles.sectionTitle}>Informations personnelles</Text>
            {[{ label: "Prénom", value: prenom, setter: setPrenom },
            { label: "Nom", value: nom, setter: setNom },
            { label: "Nom complet", value: fullName, editable: false },
            { label: "Email", value: email, editable: false }].map((item, index) => (
                <View style={styles.inputGroup} key={index}>
                    <Text style={styles.inputLabel}>{item.label}</Text>
                    <TextInput
                        style={styles.input}
                        value={item.value}
                        editable={item.editable !== false && isEditing}
                        onChangeText={item.setter}
                    />
                </View>
            ))}
        </View>
         {/* Bouton Modifier / Sauvegarder */}
         <TouchableOpacity
                style={styles.editButton}
                onPress={() => (isEditing ? handleUpdateProfile() : setIsEditing(true))}>
                <Ionicons name={isEditing ? "save" : "create"} size={20} color="#fff" />
                <Text style={styles.editButtonText}>{isEditing ? 'Sauvegarder' : 'Modifier'}</Text>
            </TouchableOpacity>
        </ScrollView>
)




}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFE4E1',
    paddingHorizontal: 20,
    paddingTop: 80, 
    paddingBottom: 60,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#FFD1DC',
  },
  form: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 10,
    shadowColor: '#FFC0CB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF69B4',
    marginBottom: 15,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 14,
    color: '#444',
    marginBottom: 4,
  },
  input: {
    height: 44,
    backgroundColor: '#FFF8FA',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFDDEE',
    paddingHorizontal: 12,
    fontSize: 16,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF69B4',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    elevation: 4,
    marginBottom: 30,
  },
  editButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    color: 'red',
    paddingTop: 40,
  },
});


export default ProfileScreen;
