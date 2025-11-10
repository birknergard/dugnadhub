import { AntDesign } from '@expo/vector-icons';
import { View, Text, Pressable } from 'react-native';

export default function StepIndicator({
  currentStep,
  setStep,
}: {
  currentStep: number;
  setStep: (step: number) => void;
}) {
  return (
    <View className={s.main}>
      {Array.from({ length: currentStep }).map((_, step) => (
        <View className={s.step.body}>
          <Pressable
            className={`${s.step.container.base} ${step === currentStep - 1 ? s.step.container.current : s.step.container.normal}`}
            onPress={() => setStep(step + 1)}>
            <Text className={s.step.text} key={step}>
              {step + 1}
            </Text>
          </Pressable>
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
    container: {
      base: 'flex justify-center items-center rounded-full border-2 border-black p-1 w-9 h-9',
      current: 'bg-dugnad-red -m-1',
      normal: 'bg-dugnad-yellow -m-1',
    },
    text: 'text-center text-xl font-semibold',
  },
};
