import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const router = useRouter();
  const [mood, setMood] = useState('Coding a chat app on Bodless 🚀');

  const handleSaveMood = () => {
    Alert.alert('Success', 'Mood status updated!');
  };

  const handleLogout = () => {
    router.replace('/(auth)/login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <View style={styles.avatarLarge}>
          <Ionicons name="person" size={48} color="#fff" />
        </View>
        <Text style={styles.nickname}>BodlessUser</Text>
        <Text style={styles.location}>Lagos, Nigeria</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Update Your Mood / Status</Text>
        <TextInput
          style={styles.input}
          value={mood}
          onChangeText={setMood}
          placeholder="What's on your mind?"
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveMood}>
          <Text style={styles.saveButtonText}>Save Mood</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#ff3b30" style={{ marginRight: 8 }} />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 20 },
  headerSection: { alignItems: 'center', marginBottom: 24, marginTop: 10 },
  avatarLarge: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#0084ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  nickname: { fontSize: 22, fontWeight: 'bold', color: '#000' },
  location: { fontSize: 14, color: '#666', marginTop: 2 },
  section: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: '#eee' },
  label: { fontSize: 14, fontWeight: 'bold', color: '#444', marginBottom: 8 },
  input: {
    backgroundColor: '#f5f6f8',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#e1e2e6',
    marginBottom: 12,
  },
  saveButton: { backgroundColor: '#0084ff', paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  saveButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ff3b30',
  },
  logoutText: { color: '#ff3b30', fontSize: 16, fontWeight: 'bold' },
});