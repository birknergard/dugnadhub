import { auth } from "firebaseConfig";
import { useRouter } from "expo-router";
import { onAuthStateChanged, User } from "firebase/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import * as authService from "services/authService";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import useToast from "hooks/useToast";

// Setting up tanstackquery, for better use of http calls
const queryClient = new QueryClient();

type AuthContextType = {
  signIn: (username: string, password: string) => void;
  signOut: VoidFunction;
  userNameSession?: string | null;
  isLoading: boolean;
  user: User | null;
};

const AuthContext = createContext<AuthContextType>({
  signIn: (s: string, p: string) => null,
  signOut: () => null,
  userNameSession: null,
  isLoading: false,
  user: null,
});

export function useAuthSession() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error(
      "UseAuthSession must be used within a AuthContext Provider"
    );
  }

  return value;
}

export function AuthSessionProvider({ children }: { children: ReactNode }) {
  const [userName, setUserName] = useState<string | null>(null);
  const [userAuth, setUserAuth] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { toastError } = useToast();
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserName(user.displayName);
        setUserAuth(user);
      } else {
        setUserName(null);
        setUserAuth(null);
      }
      router.push("/");
      setIsLoading(false);
    });
  }, []);
  return (
    <AuthContext.Provider
      value={{
        signIn: async (userName: string, password: string) => {
          await authService.signIn(userName, password)
            .catch(e => toastError(`Kunne ikke logge inn. Feilmelding: ${e}`))
        },
        signOut: async () => {
          await authService.signOut();
        },
        userNameSession: userName,
        user: userAuth,
        isLoading: isLoading,
      }}
    >
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </AuthContext.Provider>
  );
}

