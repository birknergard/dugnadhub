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
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
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
          await authService.signIn(userName, password);
        },
        signOut: async () => {
          await authService.signOut();
        },
        userNameSession: userName,
        user: userAuth,
        isLoading: isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

