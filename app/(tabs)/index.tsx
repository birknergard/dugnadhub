import IconButton from "components/iconButton";
import TextButton from "components/textButton";
import { Text, View } from "react-native";

export default function Home() {
  return (
    <View className={main} style={{
      width: '100%',
      height: '100%'
    }}>
      <Text className="text-lg">Visning</Text>
      <View className="flex flex-row">
        <TextButton text="Login" />
        <TextButton text="Next" iconName="caret-right" />
        <IconButton iconName="heart" />
      </View>
    </View>
  );
}

const main = "bg-dugnad-background w-screen h-screen flex flex-col justify-center items-center"
