import React, { useRef, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';

const CameraScreen = () => {
  const containerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const captureImage = async () => {
    const permission = await MediaLibrary.requestPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission refusée', 'Vous devez autoriser l’accès aux fichiers pour enregistrer une capture.');
      return;
    }

    try {
      const uri = await captureRef(containerRef, {
        format: 'png',
        quality: 0.8,
      });
      await MediaLibrary.saveToLibraryAsync(uri);
      Alert.alert('📸 Capture enregistrée', 'Image enregistrée dans votre galerie.');
    } catch (error) {
      Alert.alert('❌ Erreur', 'Impossible de capturer l’image.');
    }
  };

  return (
    <View style={styles.container} ref={containerRef}>
      <Text style={styles.title}>🎥 Bienvenue sur l’interface Caméra</Text>

      <View style={styles.videoBox}>
        {!isPaused ? (
          <WebView
            source={{ uri: 'http://20.30.0.229:8081/?action=stream' }}
            style={{ flex: 1 }}
            javaScriptEnabled={true}
          />
        ) : (
          <View style={styles.pausedView}>
            <Text style={styles.pausedText}>⏸️ Vidéo en pause</Text>
          </View>
        )}
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={togglePause}>
          <Text style={styles.buttonText}>{isPaused ? '▶️ Reprendre' : '⏸️ Pause'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={captureImage}>
          <Text style={styles.buttonText}>📸 Capturer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff4f8',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff6f91',
    textAlign: 'center',
    marginBottom: 10,
  },
  videoBox: {
    flex: 1,
    backgroundColor: '#ffe6ec',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: '#ffb6c1',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  pausedView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pausedText: {
    fontSize: 18,
    color: '#ff6f91',
    fontStyle: 'italic',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  button: {
    backgroundColor: '#ffb6c1',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default CameraScreen;
