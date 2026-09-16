import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const DUMMY_ROOMS = [
  { id: 'general', name: 'General Lounge', members: '4,210 users active', description: 'Talk about anything and everything!' },
  { id: 'music', name: 'Music & Production', members: '1,540 users active', description: 'FL Studio, beats, and VST plugins chat.' },
  { id: 'tech', name: 'Tech & Coding', members: '980 users active', description: 'React Native, Expo, and full-stack discussion.' },
  { id: 'naija', name: 'Naija Chatter', members: '3,120 users active', description: 'Good vibes from Nigeria and beyond.' },
];

export default function RoomsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <FlatList
        data={DUMMY_ROOMS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.roomCard}
            onPress={() => router.push(`/chat/room/${item.id}`)}
          >
            <View style={styles.roomIconContainer}>
              <Ionicons name="people" size={24} color="#0084ff" />
            </View>
            <View style={styles.roomInfo}>
              <Text style={styles.roomName}>{item.name}</Text>
              <Text style={styles.roomDesc}>{item.description}</Text>
              <Text style={styles.roomMembers}>{item.members}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  roomCard: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  roomIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#e6f2ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  roomInfo: { flex: 1 },
  roomName: { fontSize: 16, fontWeight: 'bold', color: '#000', marginBottom: 2 },
  roomDesc: { fontSize: 13, color: '#666', marginBottom: 4 },
  roomMembers: { fontSize: 11, color: '#0084ff', fontWeight: '600' },
});