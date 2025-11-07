import { AntDesign } from '@expo/vector-icons';
import { View, Text } from 'react-native';

export default function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <View className={s.main}>
      {Array.from({ length: currentStep }).map((_, step) => (
        <View className={s.step.body}>
          <View className={s.step.container}>
            <Text className={s.step.text} key={step}>
              {step + 1}
            </Text>
          </View>
          <AntDesign name={step === currentStep - 1 ? 'arrow-right' : 'line'} size={32} />
        </View>
      ))}
    </View>
  );
}

const s = {
  main: 'flex flex-row',
  step: {
    body: 'flex flex-row items-center justify-center',
    container:
      'flex justify-center items-center rounded-full border-4 border-black p-1 w-9 h-9 -m-1',
    text: 'text-center text-xl font-bold',
  },
};
