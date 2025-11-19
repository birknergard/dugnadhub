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
import UserInfo from "models/user";
import UserService from "services/userService";

// Setting up tanstackquery, for better use of http calls
const queryClient = new QueryClient();

type AuthContextType = {
  signIn: (username: string, password: string) => void;
  signOut: VoidFunction;
  userNameSession?: string | null;
  userInfo?: UserInfo | null;
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
  const [info, setInfo] = useState<UserInfo | null>();
  const [userAuth, setUserAuth] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserName(user.displayName);
        setUserAuth(user);

        // Attempt to fetch extra user data
        try {
          if (user.email) {
            const userInfo = await UserService.getUser(user.email!);
            setInfo(userInfo);
            console.info('Fetched user info');
          }
        } catch (e: any) {
          console.error('Could not fetch extra user info.')
        }

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
          await authService.signIn(userName, password);
        },
        signOut: async () => {
          await authService.signOut();
        },
        userNameSession: userName,
        user: userAuth,
        userInfo: info,
        isLoading: isLoading,
      }}
    >
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </AuthContext.Provider>
  );
}

