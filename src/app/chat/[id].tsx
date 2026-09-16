import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import { Ionicons } from '@expo/vector-icons';

interface Message {
  id: string;
  sender: 'me' | 'other';
  text: string;
  time: string;
}

const INITIAL_MESSAGES: Message[] = [
  { id: '1', sender: 'other', text: 'Hey welcome to Bodless! How are you doing?', time: '10:30 AM' },
  { id: '2', sender: 'me', text: 'Doing great! Just building out this retro chat interface.', time: '10:32 AM' },
  { id: '3', sender: 'other', text: 'Awesome! The FlashList and keyboard controller make it super smooth.', time: '10:33 AM' },
];

export default function ChatScreen() {
  const { id } = useLocalSearchParams();
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
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
      {/* Message List using FlashList */}
      <FlashList
        data={messages}
        estimatedItemSize={60}
        contentContainerStyle={styles.messageList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isMe = item.sender === 'me';
          return (
            <View style={[styles.bubbleWrapper, isMe ? styles.rightWrapper : styles.leftWrapper]}>
              <View style={[styles.bubble, isMe ? styles.myBubble : styles.otherBubble]}>
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

      {/* Bottom Chat Input Bar */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
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
    maxWidth: '75%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
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