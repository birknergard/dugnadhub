import IconButton from 'components/general/iconButton';
import TextButton from 'components/general/textButton';
import { Text, View } from 'react-native';

export default function Home() {
  return (
    <View
      className={main}
      style={{
        width: '100%',
        height: '100%',
      }}></View>
  );
}

const main = 'bg-dugnad-red w-screen h-screen flex flex-col justify-center items-center';
