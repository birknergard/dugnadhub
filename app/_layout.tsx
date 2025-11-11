import { Stack } from 'expo-router';
import '../global.css'
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name='(tabs)' options={{
          headerShown: false,
        }} />
        <Stack.Screen name='dugnadDetails/[id]' />
      </Stack>
    </SafeAreaProvider>
  );
}
