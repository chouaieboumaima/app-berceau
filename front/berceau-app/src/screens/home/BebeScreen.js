import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';

const { width } = Dimensions.get('window');

const initialActivityData = [
  {
    id: 1,
    label: '🍼 Lait',
    time: 'Dernier biberon : 09:30',
    image: require('../../../assets/lait.png'),
    bgColor: '#FFF0F5',
  },
  {
    id: 2,
    label: '😴 Dodo',
    time: 'Dernier sommeil : 12:00',
    image: require('../../../assets/dort.png'),
    bgColor: '#F0F8FF',
  },
  {
    id: 3,
    label: '🍽️ Repas',
    time: 'Dernier repas : 13:15',
    image: require('../../../assets/food.png'),
    bgColor: '#F5FFFA',
  },
  {
    id: 4,
    label: '🧷 Couche',
    time: 'Dernière couche : 10:45',
    image: require('../../../assets/couche.png'),
    bgColor: '#FFFACD',
  },
];

const BebeScreen = () => {
  const [activities, setActivities] = useState(initialActivityData);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [newTime, setNewTime] = useState('');

  const handleCardPress = (activity) => {
    setSelectedActivity(activity);
    setNewTime('');
    setModalVisible(true);
  };

  const handleSave = () => {
    if (!selectedActivity || !newTime) return;

    const updatedActivities = activities.map((act) => {
      if (act.id === selectedActivity.id) {
        return {
          ...act,
          time: `${act.time.split(':')[0]}: ${newTime}`,
        };
      }
      return act;
    });

    setActivities(updatedActivities);
    setModalVisible(false);
  };

  const rows = [];
  for (let i = 0; i < activities.length; i += 2) {
    rows.push(activities.slice(i, i + 2));
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>👶 Activités de bébé</Text>

        <View style={styles.gridWrapper}>
          {rows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((activity) => (
                <TouchableOpacity
                  key={activity.id}
                  activeOpacity={0.8}
                  style={styles.touchCard}
                  onPress={() => handleCardPress(activity)}
                >
                  <View style={[styles.card, { backgroundColor: activity.bgColor }]}>
                    <Image source={activity.image} style={styles.image} />
                    <Text style={styles.label}>{activity.label}</Text>
                    <Text style={styles.time}>{activity.time}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>

        {/* Modal de modification */}
        <Modal
          transparent
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Modifier {selectedActivity?.label}</Text>
              <TextInput
                style={styles.input}
                placeholder="Nouvelle heure (ex: 14:30)"
                value={newTime}
                onChangeText={setNewTime}
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.cancelText}>Annuler</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.saveButton]}
                  onPress={handleSave}
                >
                  <Text style={styles.saveText}>Enregistrer</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF5F7',
  },
  container: {
    alignItems: 'center',
    paddingVertical: 100,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF69B4',
    marginBottom: 25,
  },
  gridWrapper: {
    width: '90%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  touchCard: {
    width: '48%',
  },
  card: {
    height: 180,
    borderRadius: 18,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    borderWidth: 1,
    borderColor: '#FDD',
  },
  image: {
    width: 60,
    height: 60,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#D36C9F',
    textAlign: 'center',
    marginBottom: 4,
  },
  time: {
    fontSize: 13,
    color: '#555',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderColor: '#FFD1DC',
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: '#FFF8FA',
    fontSize: 15,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#FFE4E1',
  },
  saveButton: {
    backgroundColor: '#FF69B4',
  },
  cancelText: {
    color: '#333',
    fontWeight: '600',
  },
  saveText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default BebeScreen;
