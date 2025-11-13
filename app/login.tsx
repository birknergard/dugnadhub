import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { signUp } from 'services/authService';
import { useAuthSession } from "providers/authSessionProvider";
import { TextButton } from "components/general/buttons";
import { Label } from "components/general/styledTags";
WebBrowser.maybeCompleteAuthSession();

export default function Login() {

  const { signIn, signOut, user } = useAuthSession()

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verifiedPassword, setVerifiedPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const tryLogin = async () => {
    try {
      if (isRegister) {
        if (password === verifiedPassword) {
          await signUp(email, password, username);
        }
      } else {
        signIn(email, password);
      }
    } catch (error: any) {
      console.error('Login failed')
    }
  }

  return (
    <View className={s.mainContainer}>
      <View className={s.loginContainer}>
        <Text className={s.title}>DugnadHub</Text>
        {!isRegister ? (<>
          <Label>Login</Label>
          <View className={s.fieldContainer}>
            <Text className={s.label}>Email</Text>
            <TextInput className={s.input}
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View className={s.fieldContainer}>
            <Text className={s.label}>Password</Text>
            <TextInput className={s.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              textContentType="password"
            />
          </View>
          <View className={s.buttonContainer}>
            <TextButton
              text='Login'
              iconName=''
              iconPosition=''
              onTap={async () => {
                await tryLogin()
              }}
            />
            <TextButton
              text='Register'
              iconName=''
              iconPosition=''
              onTap={() => setIsRegister(true)}
            />
          </View>
        </>) : (<>
          <Text>Register new user</Text>
          <View className={s.fieldContainer}>
            <Text className={s.label}>Create username</Text>
            <TextInput className={s.input}
              value={username}
              onChangeText={setUsername}
            />
          </View>
          <View className={s.fieldContainer}>
            <Text className={s.label}>Email</Text>
            <TextInput className={s.input}
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View className={s.fieldContainer}>
            <Text className={s.label}>Create password</Text>
            <TextInput className={s.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              textContentType="password"
            />
          </View>

          <View className={s.fieldContainer}>
            <Text className={s.label}>Verify password</Text>
            <TextInput className={s.input}
              value={verifiedPassword}
              onChangeText={setVerifiedPassword}
              secureTextEntry
              textContentType="password"
            />
          </View>
          <View className={s.buttonContainer}>
            <TextButton
              text='Cancel'
              iconName=''
              iconPosition=''
              onTap={async () => {
                await tryLogin();
              }}
            />
            <TextButton
              text='Register'
              iconName=''
              iconPosition=''
              onTap={() => setIsRegister(false)}
            />
          </View>
        </>)}
      </View>
    </View>
  );
}

const s = {
  mainContainer: 'flex flex-1 flex-col items-center justify-center bg-dugnad-white',
  title: 'text-3xl',
  loginContainer: 'w-80 flex flex-col items-center justify-between bg-dugnad-red rounded-3xl p-8 gap-4',
  fieldContainer: 'flex flex-col self-stretch',
  label: 'text-xl',
  buttonContainer: 'flex flex-row items-center justify-center gap-2',
  button: 'bg-dugnad-yellow p-4',
  buttonText: 'text-xl',
  input: 'bg-white text-lg rounded-lg p-2',
}
