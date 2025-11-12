import { AuthSessionProvider } from "providers/authSessionProvider";
import { Slot } from "expo-router";

import "global.css";

export default function RootLayout() {
  return (
    <AuthSessionProvider>
      <Slot />
    </AuthSessionProvider>
  );
}
