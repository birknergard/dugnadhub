import DugnadForm from 'components/create/form/form';
import StepIndicator from 'components/create/stepIndicator';
import TextButton from 'components/general/textButton';
import { useState } from 'react';
import styled from 'styled-components/native';

export default function Create() {
  const [step, setStep] = useState(1);

  return (
    <Main>
      <StepContainer>
        <StepIndicator currentStep={step} setStep={setStep} />
      </StepContainer>
      <StyledDugnadForm step={step} />
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
  width: 100vw;
  height: 100%;
  display: flex;

  padding: 1rem;

  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const StyledDugnadForm = styled(DugnadForm)`
  width: 100%;
`;

const NavigationButtons = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StepContainer = styled.View`
  justify-self: start;
  align-self: start;
`;
