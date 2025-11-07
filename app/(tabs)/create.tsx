import StepIndicator from 'components/create/stepIndicator';
import TextButton from 'components/general/textButton';
import { useState } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

export default function Create() {
  const [step, setStep] = useState(1);

  return (
    <Main>
      <StepIndicator currentStep={step} />
      <NavigationButtons>
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
      </NavigationButtons>
    </Main>
  );
}

const Main = styled.View`
  background-color: #e4e3d5;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const NavigationButtons = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
