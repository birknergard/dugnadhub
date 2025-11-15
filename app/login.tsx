import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { signUp } from 'services/authService';
import { useAuthSession } from "providers/authSessionProvider";
import { TextButton } from "components/general/buttons";
import { Label } from "components/general/styledTags";
import { useRouter } from "expo-router";
WebBrowser.maybeCompleteAuthSession();

export default function Login() {

    const router = useRouter()
    const { signIn } = useAuthSession()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const login = async () => {
        try {
            signIn(email, password);
        } catch (error: any) {
            return `Login failed:\n${error}`;
        }
    }

    useEffect(() => {
        setErrorMessage('');
    }, [email, password])

    return (
        <View className={s.mainContainer}>
            <Text className={s.title}>DugnadHub</Text>
            <View className={s.loginContainer}>
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
            </View>
            <View className={s.buttonContainer}>
                <TextButton
                    text='Login'
                    iconName=''
                    iconPosition=''
                    onTap={async () => {
                        await login()
                    }}
                />
                <TextButton
                    text='Create new user'
                    iconName=''
                    iconPosition=''
                    onTap={() => router.push('register')}
                />
            </View>
        </View>
    );
}

const s = {
    mainContainer: 'flex flex-1 flex-col items-center justify-center bg-dugnad-white gap-10',
    title: 'text-3xl',
    loginContainer: 'flex items-center self-stretch px-16 gap-4',
    fieldContainer: 'flex flex-col self-stretch',
    label: 'text-xl',
    buttonContainer: 'flex flex-col items-center justify-center gap-2',
    button: 'bg-dugnad-yellow p-4',
    buttonText: 'text-xl',
    input: 'bg-white text-lg rounded-lg p-2',
}
