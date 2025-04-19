import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const { width } = Dimensions.get('window');

const activityData = [
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
  const rows = [];
  for (let i = 0; i < activityData.length; i += 2) {
    rows.push(activityData.slice(i, i + 2));
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>👶 Activités de bébé</Text>

        <View style={styles.gridWrapper}>
          {rows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((activity) => (
                <TouchableOpacity key={activity.id} activeOpacity={0.9} style={styles.touchCard}>
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
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FF69B4',
    textAlign: 'center',
    marginBottom: 30,
    textShadowColor: '#FDD',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  gridWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: width * 0.9,
  },
  touchCard: {
    width: (width * 0.9) / 2 - 10,
  },
  card: {
    height: 190,
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E0A3B0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#FCE4EC',
  },
  image: {
    width: 70,
    height: 70,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#D36C9F',
    marginBottom: 5,
    textAlign: 'center',
  },
  time: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default BebeScreen;
