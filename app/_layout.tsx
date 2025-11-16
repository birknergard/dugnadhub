import { AuthSessionProvider } from "providers/authSessionProvider";
import { Slot, Stack } from "expo-router";
import Toast from 'react-native-toast-message'

import "global.css";

export default function RootLayout() {
  return (
    <>
      <AuthSessionProvider>
        <Slot />
      </AuthSessionProvider>
      <Toast />
    </>
  );
}
