import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  Alert,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const [recordings, setRecordings] = useState([]);
  const [search, setSearch] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingInstance, setRecordingInstance] = useState(null);
  const [audioPlayer, setAudioPlayer] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecording, setSelectedRecording] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const { status } = await Audio.requestPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Required', 'Microphone access is needed to record audio.');
          return;
        }
        const storedRecordings = await AsyncStorage.getItem('recordings');
        if (storedRecordings) setRecordings(JSON.parse(storedRecordings));
      } catch (error) {
        Alert.alert('Error', 'Could not initialize the app. Please try again.');
      }
    };

    initializeApp();
  }, []);

  const startRecording = async () => {
    try {
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync();
      setRecordingInstance(recording);
      setIsRecording(true);
    } catch (error) {
      Alert.alert('Error', 'Could not start recording. Please try again.');
    }
  };

  const stopRecording = async () => {
    try {
      if (recordingInstance) {
        await recordingInstance.stopAndUnloadAsync();
        const uri = recordingInstance.getURI();
        const newRecording = {
          id: Date.now().toString(),
          title: `Recording ${recordings.length + 1}`,
          uri,
        };
        const updatedRecordings = [...recordings, newRecording];
        setRecordings(updatedRecordings);
        await AsyncStorage.setItem('recordings', JSON.stringify(updatedRecordings));
        setRecordingInstance(null);
        setIsRecording(false);
      }
    } catch (error) {
      Alert.alert('Error', 'Could not stop recording. Please try again.');
    }
  };

  const handleRecord = async () => {
    isRecording ? await stopRecording() : await startRecording();
  };

  const handleDelete = async (id) => {
    try {
      const updatedRecordings = recordings.filter((item) => item.id !== id);
      setRecordings(updatedRecordings);
      await AsyncStorage.setItem('recordings', JSON.stringify(updatedRecordings));
      closeModal();
      Alert.alert('Success', 'Recording deleted successfully.');
    } catch (error) {
      Alert.alert('Error', 'Could not delete the recording. Please try again.');
    }
  };

  const openModal = (item) => {
    setSelectedRecording(item);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedRecording(null);
  };

  const playRecording = async (uri) => {
    try {
      if (audioPlayer) await audioPlayer.stopAsync();
      const { sound } = await Audio.Sound.createAsync({ uri });
      setAudioPlayer(sound);
      await sound.playAsync();
    } catch (error) {
      Alert.alert('Error', 'Could not play the recording. Please try again.');
    }
  };

  const handleLogout = () => navigation.navigate('Login');

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.iconButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => Alert.alert('Share feature coming soon')}>
          <Ionicons name="share-social-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.recordButton, { backgroundColor: isRecording ? 'blue' : 'red' }]}
        onPress={handleRecord}
      >
        <Text style={styles.recordText}>{isRecording ? 'Stop' : 'Record'}</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Search"
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={recordings.filter((rec) =>
          rec.title.toLowerCase().includes(search.toLowerCase())
        )}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.title}</Text>
            <View style={styles.recordActions}>
              <Ionicons
                name="play-circle-outline"
                size={24}
                color="green"
                onPress={() => playRecording(item.uri)}
              />
              <Ionicons
                name="trash-outline"
                size={24}
                color="red"
                onPress={() => openModal(item)}
              />
            </View>
          </View>
        )}
      />

      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text>Are you sure you want to delete this recording?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => handleDelete(selectedRecording.id)}
              >
                <Text style={styles.modalButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  iconButton: { padding: 10 },
  recordButton: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  recordText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  recordActions: { flexDirection: 'row', alignItems: 'center' },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  modalButtonText: { color: 'white', fontWeight: 'bold' },
});
