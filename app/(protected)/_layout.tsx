import { Spinner } from 'components/general/spinner';
import { Stack, Redirect } from 'expo-router';
import { useAuthSession } from "providers/authSessionProvider";
import { Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function ProtectedLayout() {
  const { isLoading, user } = useAuthSession();

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Henter bruker</Text>
        <Spinner />
      </View>
    );
  }

  if (!user) {
    return (
      <>
        <Redirect href="/login" />
        {/** prevent further render until redirect completes */}
        {null}
      </>
    );
  }

  return (
    <Stack>
      <Stack.Screen name='(tabs)' options={{
        headerShown: false,
      }} />
      <Stack.Screen name='dugnadDetails/[id]' />
    </Stack>
  );
}
