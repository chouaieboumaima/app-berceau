import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator,
    Image
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { updatePassword } from "../../services/AuthService";
import { Ionicons } from "@expo/vector-icons"; // Icônes modernes

const ResetPasswordScreen = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigation = useNavigation();
    const route = useRoute();

    const { email, code } = route.params; // Récupère l'email et le code

    // Fonction de validation du mot de passe
    const validatePassword = (password) => password.length >= 8;

    // Fonction pour soumettre le nouveau mot de passe
    const handleUpdatePassword = async () => {
        if (!validatePassword(newPassword)) {
            setErrorMessage("Le mot de passe doit contenir au moins 8 caractères.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setErrorMessage("Les mots de passe ne correspondent pas.");
            return;
        }

        setErrorMessage("");
        setLoading(true);

        try {
            await updatePassword(email, newPassword, code);
            Alert.alert("Succès", "Mot de passe mis à jour avec succès !");
            navigation.navigate("Login"); // Redirige vers la connexion
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Erreur lors de la mise à jour du mot de passe.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Nouveau mot de passe</Text>
            <Image source={require('../../../assets/cle.png')} style={styles.image} />

            <Text style={styles.label}>Entrez un mot de passe sécurisé</Text>

            {/* Champ de saisie du mot de passe */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={newPassword}
                    onChangeText={setNewPassword}
                    placeholder="Nouveau mot de passe"
                    placeholderTextColor="gray"
                    secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="gray" />
                </TouchableOpacity>
            </View>

            {/* Champ de confirmation du mot de passe */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="Confirmez le mot de passe"
                    placeholderTextColor="gray"
                    secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="gray" />
                </TouchableOpacity>
            </View>

            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

            {/* Bouton de confirmation */}
            <TouchableOpacity style={styles.button} onPress={handleUpdatePassword} disabled={loading}>
                {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.buttonText}>Valider</Text>}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 30,
        marginTop: 30,
        backgroundColor: "#FFF0F5", // rose pâle apaisant
    },
    header: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#FF8C42", // orange doux
        marginBottom: 30,
        marginTop: 60,
        fontFamily: 'Poppins',
        textAlign: "center",
    },
    label: {
        fontSize: 16,
        color: "#7F8C8D",
        textAlign: "center",
        marginBottom: 20,
        fontFamily: 'Poppins',
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF",
        borderRadius: 15,
        paddingHorizontal: 15,
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: "#FFE0D2",
        marginBottom: 15,
        shadowColor: "#FFDAB9",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: "#444",
        fontFamily: 'Poppins',
    },
    button: {
        width: "100%",
        height: 50,
        backgroundColor: "#FFB347", // Orange pastel
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        shadowColor: "#FFA07A",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 3,
    },
    buttonText: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "600",
        fontFamily: 'Poppins',
    },
    errorText: {
        color: "#E57373",
        fontSize: 14,
        marginBottom: 10,
        textAlign: "center",
        fontFamily: 'Poppins',
    },
    image: {
        width: 120,
        height: 120,
        marginBottom: 20,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: '#FFDAB9',
        shadowColor: '#FF8C42',
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
    },
});



export default ResetPasswordScreen;
