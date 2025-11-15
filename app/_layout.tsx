import { AuthSessionProvider } from "providers/authSessionProvider";
import { Slot, Stack } from "expo-router";

import "global.css";

export default function RootLayout() {
  return (
    <AuthSessionProvider>
      <Slot />
    </AuthSessionProvider>
  );
}
