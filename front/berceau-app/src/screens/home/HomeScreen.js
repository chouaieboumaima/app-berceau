import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Modal, Portal, Button, Provider } from 'react-native-paper';
import berceauImage from '../../../assets/berceau.png';
import bebeImage from '../../../assets/bebe.png';

const BerceauItem = ({ item, onPress }) => {
    const [bebeName, setBebeName] = useState("Bébé inconnu");

    useEffect(() => {
        const fetchBebeName = async () => {
            if (item.bebeId) {
                setBebeName("Bébé simulé");
            }
        };
        fetchBebeName();
    }, [item.bebeId]);

    return (
        <TouchableOpacity style={styles.card} onPress={() => onPress(item)}>
            <View style={styles.row}>
                <Image source={berceauImage} style={styles.icon} />
                <Text style={styles.berceauName}>{item.name || "Nom inconnu"}</Text>
            </View>
            <View style={styles.row}>
                <Image source={bebeImage} style={styles.avatar} />
                <Text style={styles.bebeName}>{bebeName}</Text>
            </View>
        </TouchableOpacity>
    );
};

const HomeScreen = () => {
    const [berceaux, setBerceaux] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedBerceau, setSelectedBerceau] = useState(null);
    const navigation = useNavigation();
    const scaleAnim = useState(new Animated.Value(1))[0];

    useEffect(() => {
        const fetchBerceaux = async () => {
            const fetchedBerceaux = [
                { id: 1, name: "Berceau 1", bebeId: 1 },
                { id: 2, name: "Berceau 2", bebeId: 2 },
            ];
            setBerceaux(fetchedBerceaux);
        };
        fetchBerceaux();
    }, []);

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const versAjouter = () => {
        navigation.navigate("AjouterBerceau");  // Cette ligne ouvre l'écran AjouterBerceau
    };

    const handleBerceauPress = (item) => {
        setSelectedBerceau(item);
        setModalVisible(true);
    };

    const handleDelete = () => {
        if (!selectedBerceau) return;
        setBerceaux(prev => prev.filter(b => b.id !== selectedBerceau.id));
        setModalVisible(false);
    };

    const handleConsult = () => {
        setModalVisible(false);
        navigation.navigate("ConsulterBerceau", { id: selectedBerceau.id });
    };

    return (
        <Provider>
            <View style={styles.container}>
                <Text style={styles.title}>🛏️ Mes Berceaux</Text>

                {berceaux.length === 0 ? (
                    <Text style={styles.empty}>Aucun berceau trouvé</Text>
                ) : (
                    <FlatList
                        data={berceaux}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <BerceauItem item={item} onPress={handleBerceauPress} />}
                        style={styles.list}
                    />
                )}

                <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                    <TouchableOpacity
                        style={styles.addBtn}
                        onPressIn={handlePressIn}
                        onPressOut={handlePressOut}
                        onPress={versAjouter}  // Le bouton appelle versAjouter pour naviguer vers l'écran AjouterBerceau
                    >
                        <Text style={styles.addBtnText}>Ajouter un Berceau</Text>
                    </TouchableOpacity>
                </Animated.View>

                <Portal>
                    <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)} contentContainerStyle={styles.modal}>
                        <Text style={styles.modalTitle}>Options du Berceau</Text>
                        <Button mode="contained" onPress={handleConsult} style={styles.modalBtn}>
                            Consulter
                        </Button>
                        <Button mode="contained" onPress={handleDelete} style={styles.modalBtn}>
                            Supprimer
                        </Button>
                        <Button mode="outlined" onPress={() => setModalVisible(false)} style={styles.modalClose}>
                            Fermer
                        </Button>
                    </Modal>
                </Portal>
            </View>
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF0F5',
        padding: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 50,
        marginTop: 40, 
        color: '#FF69B4',
    },
    list: {
        flex: 1,
    },
    card: {
        backgroundColor: '#ffffff',
        padding: 18,
        borderRadius: 16,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    icon: {
        width: 50,
        height: 50,
        borderRadius: 10,
        marginRight: 12,
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        marginRight: 12,
    },
    berceauName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#222',
    },
    bebeName: {
        fontSize: 16,
        color: '#555',
    },
    addBtn: {
        backgroundColor: '#FF69B4',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 50,
        alignItems: 'center',
        marginTop: 20,
        shadowColor: "#4B0082",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
    },
    addBtnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    empty: {
        fontSize: 16,
        color: '#777',
        textAlign: 'center',
        marginTop: 30,
    },
    modal: {
        backgroundColor: '#fff',
        padding: 25,
        borderRadius: 20,
        alignSelf: 'center',
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    modalBtn: {
        width: '100%',
        marginBottom: 12,
    },
    modalClose: {
        width: '100%',
        marginTop: 10,
    },
});

export default HomeScreen;
