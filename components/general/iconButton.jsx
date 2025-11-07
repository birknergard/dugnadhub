import { Pressable } from 'react-native';
import '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';

// In Javascript because FontAwesome6 was giving annoying errors for acceptable names
export default function IconButton({ iconName, onTap }) {
  return (
    <Pressable className={main} onPress={onTap}>
      <FontAwesome6 className={icon} name={iconName} size={30} />
    </Pressable>
  );
}

const main =
  'flex justify-center items-center bg-dugnad-beige rounded-xl p-3 bg-clip-padding transition hover:scale-110';
const icon = 'text-dugnad-black';
