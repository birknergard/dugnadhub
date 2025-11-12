import { useState } from "react";
import { auth } from "firebaseConfig";
import { Pressable, Text, TextInput, View } from "react-native";
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from "expo-web-browser";
import * as AuthActions from 'services/authService'
import { makeRedirectUri } from "expo-auth-session";
import { signIn } from "services/authService";
import { reload } from "firebase/auth";
import { useAuthSession } from "providers/authSessionProvider";
WebBrowser.maybeCompleteAuthSession();

export default function Login() {

  const { signIn, signOut } = useAuthSession()

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const tryLogin = async () => {
    try {
      if (isRegister) {
        await AuthActions.signUp(email, password, username);
      } else {
        signIn(email, password);
      }
    } catch (error: any) {
      console.error('Login failed')
    }
  }

  const tryLogout = async () => {
    try {
      signOut();
    } catch (error: any) {
      console.error('Logout failed')
    }
  }

  return (
    <View className='flex flex-col'>
      <Text>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
      />
      <Text>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        textContentType="password"
      />
      <View>
        <Pressable
          onPress={async () => {
            await tryLogin()
          }}
        >
          <Text>Login</Text>
        </Pressable>
        <Pressable
          onPress={async () => {
            await tryLogout()
          }}
        >
          <Text>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
}
