import { Pressable, Text } from 'react-native';
import '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';

// In Javascript because FontAwesome6 was giving annoying errors for acceptable names
export default function TextButton({ text, iconName, onTap, iconPosition }) {
  const icon = <FontAwesome6 className={s.icon} name={iconName} size={30} />;
  return (
    <Pressable className={s.main} onPress={onTap}>
      {iconName && iconPosition == 'right' && icon}
      <Text className={s.text}>{text}</Text>
      {iconName && iconPosition == 'left' && icon}
    </Pressable>
  );
}

const s = {
  main: 'flex flex-row w-fit justify-center items-center bg-dugnad-beige rounded-xl p-3 bg-clip-padding transition gap-2 hover:scale-110',
  text: 'font-bold text-xl',
  icon: 'text-black',
};
