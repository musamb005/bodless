import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import { Ionicons } from '@expo/vector-icons';

interface RoomMessage {
  id: string;
  senderName: string;
  sender: 'me' | 'other';
  text: string;
  time: string;
}

const INITIAL_ROOM_MESSAGES: RoomMessage[] = [
  { id: '1', senderName: 'Naija Boy', sender: 'other', text: 'Welcome everyone to the Bodless room! Drop your messages here.', time: '10:15 AM' },
  { id: '2', senderName: 'Aisha_99', sender: 'other', text: 'Glad to be here! The interface is super clean.', time: '10:18 AM' },
  { id: '3', senderName: 'BodlessUser', sender: 'me', text: 'Thanks! Building this with Expo SDK 54 and FlashList.', time: '10:20 AM' },
];

export default function ChatRoomScreen() {
  const { roomId } = useLocalSearchParams();
  const [messages, setMessages] = useState<RoomMessage[]>(INITIAL_ROOM_MESSAGES);
  const [inputText, setInputText] = useState('');

  // Format the room title nicely (e.g., "general" -> "General Lounge")
  const roomTitle = typeof roomId === 'string' ? roomId.toUpperCase() : 'Chat Room';

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessage: RoomMessage = {
      id: Date.now().toString(),
      senderName: 'BodlessUser',
      sender: 'me',
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      {/* Dynamically update the header title based on the room */}
      <Stack.Screen options={{ title: roomTitle }} />

      {/* Room Message Feed */}
      <FlashList
        data={messages}
        estimatedItemSize={70}
        contentContainerStyle={styles.messageList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isMe = item.sender === 'me';
          return (
            <View style={[styles.bubbleWrapper, isMe ? styles.rightWrapper : styles.leftWrapper]}>
              <View style={[styles.bubble, isMe ? styles.myBubble : styles.otherBubble]}>
                {!isMe && <Text style={styles.senderName}>{item.senderName}</Text>}
                <Text style={[styles.messageText, isMe ? styles.myText : styles.otherText]}>
                  {item.text}
                </Text>
                <Text style={[styles.timeText, isMe ? styles.myTimeText : styles.otherTimeText]}>
                  {item.time}
                </Text>
              </View>
            </View>
          );
        }}
      />

      {/* Room Chat Input Bar */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={`Message #${roomId}...`}
          placeholderTextColor="#888"
          value={inputText}
          onChangeText={setInputText}
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Ionicons name="send" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  messageList: {
    padding: 16,
  },
  bubbleWrapper: {
    marginVertical: 4,
    flexDirection: 'row',
  },
  leftWrapper: {
    justifyContent: 'flex-start',
  },
  rightWrapper: {
    justifyContent: 'flex-end',
  },
  bubble: {
    maxWidth: '80%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
  },
  myBubble: {
    backgroundColor: '#0084ff',
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#e1e2e6',
  },
  senderName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0084ff',
    marginBottom: 2,
  },
  messageText: {
    fontSize: 15,
  },
  myText: {
    color: '#ffffff',
  },
  otherText: {
    color: '#000000',
  },
  timeText: {
    fontSize: 10,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  myTimeText: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  otherTimeText: {
    color: '#888888',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e1e2e6',
  },
  input: {
    flex: 1,
    backgroundColor: '#f5f6f8',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    fontSize: 15,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: '#e1e2e6',
  },
  sendButton: {
    backgroundColor: '#0084ff',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});