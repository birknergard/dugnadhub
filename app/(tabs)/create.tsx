import DugnadForm from 'components/create/form/dugnadForm';
import StepIndicator from 'components/create/stepIndicator';
import TextButton from 'components/general/textButton';
import { useState } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

export default function Create() {
  const [step, setStep] = useState(1);

  return (
    <Main>
      <StepIndicator currentStep={step} setStep={setStep} />
      <DugnadForm step={step} />
      <StepButtons>
        {step >= 2 && (
          <TextButton
            text="Back"
            iconName="caret-left"
            iconPosition="right"
            onTap={() => {
              setStep(step - 1);
            }}
          />
        )}
        <View></View>
        {step <= 5 && (
          <TextButton
            text="Next"
            iconName="caret-right"
            iconPosition="left"
            onTap={() => {
              setStep(step + 1);
            }}
          />
        )}
      </StepButtons>
    </Main>
  );
}

const Main = styled.View({
  flex: 1,
  backgroundColor: '#e4e3d5',
  padding: 20,
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'stretch'
});

const StepContainer = styled(StepIndicator)({})

const StepButtons = styled.View({
  width: "100%",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
})

