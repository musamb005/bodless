import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MessageBubbleProps {
  text: string;
  senderName?: string;
  isMe: boolean;
  time: string;
}

export default function MessageBubble({ text, senderName, isMe, time }: MessageBubbleProps) {
  return (
    <View style={[styles.bubbleWrapper, isMe ? styles.rightWrapper : styles.leftWrapper]}>
      <View style={[styles.bubble, isMe ? styles.myBubble : styles.otherBubble]}>
        {!isMe && senderName ? <Text style={styles.senderName}>{senderName}</Text> : null}
        <Text style={[styles.messageText, isMe ? styles.myText : styles.otherText]}>{text}</Text>
        <Text style={[styles.timeText, isMe ? styles.myTimeText : styles.otherTimeText]}>{time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
});