import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient()
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
