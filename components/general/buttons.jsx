import { Pressable, Text } from 'react-native';
import '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { Label } from './styledTags';

// In Javascript because FontAwesome6 was giving annoying errors for acceptable names

export function IconButton({ iconName, onTap }) {
  return (
    <Pressable className={main} onPress={onTap}>
      <FontAwesome6 className={icon} name={iconName} size={30} />
    </Pressable>
  );
}

export function TextButton({ text, iconName, onTap, iconPosition }) {
  const icon = <FontAwesome6 className={s.icon} name={iconName} size={30} />;
  return (
    <Pressable className={s.main} onPress={onTap}>
      {iconName && iconPosition == 'right' && icon}
      <Label>{text}</Label>
      {iconName && iconPosition == 'left' && icon}
    </Pressable>
  );
}

const main = 'flex justify-center items-center bg-dugnad-yellow rounded-xl p-3 bg-clip-padding transition hover:scale-110';
const icon = 'text-dugnad-black';

const s = {
  main: 'flex flex-row w-fit justify-center items-center bg-dugnad-yellow rounded-xl p-3 bg-clip-padding transition gap-2 hover:scale-110',
  text: 'font-bold text-xl',
  icon: 'text-black',
};

