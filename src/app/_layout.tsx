import { Stack } from 'expo-router';
import { KeyboardProvider } from 'react-native-keyboard-controller';

export default function RootLayout() {
  return (
    <KeyboardProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="chat/[id]" options={{ headerShown: true, title: 'Chat' }} />
        <Stack.Screen name="chat/room/[roomId]" options={{ headerShown: true, title: 'Chat Room' }} />
      </Stack>
    </KeyboardProvider>
  );
}