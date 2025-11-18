import { AntDesign } from '@expo/vector-icons';
import { colors, Column, PlainText, Row } from 'components/general/styledTags';
import { View, Text, Pressable } from 'react-native';

export default function StepIndicator({
  currentStep,
  setStep,
}: {
  currentStep: number;
  setStep: (step: number) => void;
}) {
  return (
    <Row>
      {Array.from<number>({ length: currentStep }).map((_, step) => (
        <Row key={step}>
          <Pressable
            className={`${s.base}
              ${step === currentStep - 1 ? s.current : s.normal}
            `}
            onPress={() => setStep(step + 1)}>
            <PlainText key={step}>
              {step + 1}
            </PlainText>
          </Pressable>
          <AntDesign name={step === currentStep - 1 ? 'arrow-right' : 'line'} size={22} style={{ color: colors.red }} />
        </Row>
      ))}
    </Row>
  );
}

const s = {
  base: 'flex justify-center items-center rounded-full border-2 border-dugnad-red p-4 w-10 h-10',
  current: 'bg-dugnad-red -m-1',
  normal: 'bg-dugnad-white -m-1',
};
