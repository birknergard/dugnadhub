import DugnadForm from 'components/create/form/dugnadForm';
import StepIndicator from 'components/create/stepIndicator';
import { TextButton } from 'components/general/buttons';
import { Row } from 'components/general/styledTags';
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
        <ButtonWrapper $show={step >= 2}>
          <TextButton
            text="Back"
            iconName="caret-left"
            iconPosition="right"
            onTap={() => {
              setStep(step - 1);
            }}
          />
        </ButtonWrapper>
        <ButtonWrapper $show={step <= 5}>
          <TextButton
            text="Next"
            iconName="caret-right"
            iconPosition="left"
            onTap={() => {
              setStep(step + 1);
            }}
          />
        </ButtonWrapper>
      </StepButtons>
    </Main>
  );
}

const Main = styled.View({
  flex: 1,
  alignSelf: 'stretch',
  backgroundColor: '#e4e3d5',
  padding: 20,
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center'
});

const StepContainer = styled(StepIndicator)({})

const ButtonWrapper = styled(View)<{ $show: boolean }>(props => ({
  display: props.$show ? 'block' : 'none'
}))

const StepButtons = styled(Row)({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
})

