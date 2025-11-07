import { Pressable } from "react-native";
import "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { FontAwesomeIconName } from "./icons";

export default function IconButton({ iconName }: { iconName: FontAwesomeIconName }) {
  return (
    <Pressable className={main}>
      <FontAwesome6 className={icon}
        name={iconName}
        size={30}
      />
    </Pressable>
  );
}

const main = "flex justify-center items-center bg-dugnad-beige rounded-xl p-3 bg-clip-padding"
const icon = "text-dugnad-black"
