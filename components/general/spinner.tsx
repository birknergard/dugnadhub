import { ActivityIndicator } from "react-native";
import { colors } from "./styledTags";

export function Spinner({ small }: { small?: boolean }) {
  return <ActivityIndicator color={colors.red} size={small ? 'small' : 'large'} />
}
