import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { signUp } from 'services/authService';
import { useAuthSession } from "providers/authSessionProvider";
import { TextButton } from "components/general/buttons";
import { colors, Label, PlainText } from "components/general/styledTags";
import { useRouter } from "expo-router";
import UserService from "services/userService";
import useToast from "hooks/useToast";
WebBrowser.maybeCompleteAuthSession();

export default function Register() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifiedPassword, setVerifiedPassword] = useState('');
  const [username, setUsername] = useState('');

  const { toastError, toastSuccess } = useToast();

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

  const register = async () => {
    if (firstName.length < 2) {
      toastError('Ugyldig fornavn. må være minst 2 bokstaver')
    }

    if (lastName.length < 3) {
      toastError('Ugyldig etternavn. Må være minst 3 bokstaver');
    }

    if (!verifyEmail(email)) {
      toastError('Ugyldig epost.');
    }

    if (password.length < 5) {
      toastError('Ditt passord må være minst 5 karakterer');
    }

    if (password !== verifiedPassword) {
      toastError('Passordene må være like');
    }

    if (username.length < 3) {
      toastError('Ditt brukernavn må være minst 3 karakterer');
    }

    try {
      await signUp(firstName, lastName, email, username, password);
      toastSuccess(`Vellykket registrering. Logger inn som ${username}`);
    } catch (e) {
      console.error('Failed to create user: ', e);
      toastError('Feil: Kunne ikke lage bruker.');
    }
  }

  return (
    <View className={s.mainContainer}>
      <Text className={s.title}>DugnadHub</Text>
      <Text className={s.label}>Registrer ny bruker</Text>

      <View className={s.fieldContainer}>
        <Text className={s.label}>Fornavn</Text>
        <TextInput className={s.input}
          textContentType="givenName"
          value={firstName}
          onChangeText={setFirstName}
        />
      </View>

      <View className={s.fieldContainer}>
        <Text className={s.label}>Ettername</Text>
        <TextInput className={s.input}
          textContentType="familyName"
          value={lastName}
          onChangeText={setLastName}
        />
      </View>

      <View className={s.fieldContainer}>
        <Text className={s.label}>Epost</Text>
        <TextInput className={s.input}
          textContentType="emailAddress"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View className={s.fieldContainer}>
        <Text className={s.label}>Lag passord</Text>
        <TextInput className={s.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          textContentType="password"
        />
      </View>

      <View className={s.fieldContainer}>
        <Text className={s.label}>Skriv passord by nytt</Text>
        <TextInput className={s.input}
          value={verifiedPassword}
          onChangeText={setVerifiedPassword}
          secureTextEntry
          textContentType="password"
        />
      </View>

      <View className={s.fieldContainer}>
        <Text className={s.label}>Lag et brukernavn</Text>
        <TextInput className={s.input}
          textContentType="username"
          value={username}
          onChangeText={setUsername}
        />
      </View>

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
            await register()
          }}
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
