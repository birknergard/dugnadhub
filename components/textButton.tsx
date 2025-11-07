import { Pressable, Text } from "react-native";
import "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { FontAwesomeIconName } from "./icons";

export default function TextButton({ text, iconName }: { iconName?: FontAwesomeIconName | undefined, text: String }) {
  return (
    <Pressable className={s.main}>
      <Text className={s.text}>
        {text}
      </Text>
      {iconName &&
        <FontAwesome6 className={s.icon} name={iconName} size={30} />
      }
    </Pressable>
  );
}

const s = {
  main: "flex flex-row justify-center items-center bg-dugnad-beige rounded-xl p-3 bg-clip-padding gap-2",
  text: "font-bold text-xl",
  icon: "text-dugnad-black"
}
