import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { signUp } from 'services/authService';
import { useAuthSession } from "providers/authSessionProvider";
import { TextButton } from "components/general/buttons";
import { colors, Label, PlainText } from "components/general/styledTags";
import { useRouter } from "expo-router";
import UserService from "services/userDataService";
WebBrowser.maybeCompleteAuthSession();

export default function Register() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifiedPassword, setVerifiedPassword] = useState('');
  const [username, setUsername] = useState('');

  const [registered, setRegistered] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Split the mail like below then chech each substring if they exist
  // <at[0]>@<dot[0]>.<dot[1]>
  const verifyEmail = (email: string): boolean => {
    const at = email.split('@') ?? ''
    if (!(at[1])) return false;

    const dot = at[1].split('.');
    if (!(dot[1])) return false;

    if (
      at[0].length <= 2 ||
      dot[0].length <= 2 ||
      dot[1].length <= 1
    ) return false;

    return true;
  }

  const register = async (): Promise<string> => {
    if (firstName.length < 2) {
      return 'Invalid first name. Must be at least 2 characters';
    }

    if (lastName.length < 3) {
      return 'Last name needs to be at least 3 characters.'
    }

    if (!verifyEmail(email)) {
      return 'Invalid email address.';
    }

    if (password.length < 5) {
      return 'Password needs to be at least 5 characters';
    }

    if (password !== verifiedPassword) {
      return 'Re-entered password must match password';
    }

    if (username.length < 3) {
      return 'Username needs to be at least 3 characters';
    }

    try {
      const user = await signUp(email, password, username)
      await UserService.postUser(
        user.uid,
        firstName,
        lastName,
        user.email!,
        username,
      )
      return '';
    } catch (e) {
      console.error('Failed to create user: ', e);
      return 'Failed to create user';
    }
  }

  // Resets error message on change of fields 
  useEffect(() => {
    setErrorMessage('');
  }, [firstName, lastName, email, password, verifiedPassword, username])

  return (
    <View className={s.mainContainer}>
      <Text className={s.title}>DugnadHub</Text>
      <Text className={s.label}>Register new user</Text>

      <View className={s.fieldContainer}>
        <Text className={s.label}>First name</Text>
        <TextInput className={s.input}
          textContentType="givenName"
          value={firstName}
          onChangeText={setFirstName}
        />
      </View>

      <View className={s.fieldContainer}>
        <Text className={s.label}>Last name</Text>
        <TextInput className={s.input}
          textContentType="familyName"
          value={lastName}
          onChangeText={setLastName}
        />
      </View>

      <View className={s.fieldContainer}>
        <Text className={s.label}>Email</Text>
        <TextInput className={s.input}
          textContentType="emailAddress"
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
        <Text className={s.label}>Re-enter password</Text>
        <TextInput className={s.input}
          value={verifiedPassword}
          onChangeText={setVerifiedPassword}
          secureTextEntry
          textContentType="password"
        />
      </View>

      <View className={s.fieldContainer}>
        <Text className={s.label}>Create your username</Text>
        <TextInput className={s.input}
          textContentType="username"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      <Text className={s.error}>{errorMessage}</Text>

      <View className={s.buttonContainer}>
        <TextButton
          color={colors.yellow}
          text='Cancel'
          iconName=''
          iconPosition=''
          onTap={() => router.back()}
        />
        <TextButton
          color={colors.green}
          text='Register'
          iconName=''
          iconPosition=''
          onTap={async () => {
            const status = await register()
            setErrorMessage(status);
          }

          }
        />
      </View>
    </View >
  );
}

const s = {
  mainContainer: 'flex flex-1 flex-col items-center justify-center bg-dugnad-white gap-4',
  title: 'text-3xl',
  fieldContainer: 'flex flex-col self-stretch px-16',
  label: 'text-xl',
  buttonContainer: 'flex flex-row items-center justify-between self-stretch gap-2 px-16 my-10',
  input: 'bg-white text-lg rounded-lg p-2',
  error: 'text-lg text-dugnad-red text-center font-semibold',
}
