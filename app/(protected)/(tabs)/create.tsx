import DugnadForm from 'components/create/form/dugnadForm';
import StepIndicator from 'components/create/stepIndicator';
import { TextButton } from 'components/general/buttons';
import { Column, Row, Title } from 'components/general/styledTags';
import { createConstants } from 'constants/createConstants';
import { useState } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

export default function Create() {
  const [step, setStep] = useState(1);
  const [isShowingUI, setShowUI] = useState(true);

  return (
    <Main>
      <StyledStepIndicator $hidden={!isShowingUI} currentStep={step} setStep={setStep} />
      <Column>
        <SectionTitle $hidden={!isShowingUI}>{createConstants.sections[step - 1].title}</SectionTitle>
        {/* <Heading className={s.section.description}>{section.description}</Heading> */}
        <DugnadForm step={step} setShowUI={setShowUI} />
      </Column>
      {isShowingUI &&
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
      }
    </Main>
  );
}

const Main = styled.View({
  flex: 1,
  alignSelf: 'stretch',
  backgroundColor: '#e4e3d5',
  padding: 20,
  paddingTop: 40,
  gap: 20,
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const StyledStepIndicator = styled(StepIndicator)<{ $hidden: boolean }>(props => ({
  visibility: props.$hidden ? 'hidden' : 'visible',
}))

const SectionTitle = styled(Title)<{ $hidden: boolean }>(props => ({
  visibility: props.$hidden ? 'hidden' : 'visible',
}))

const ButtonWrapper = styled(View)<{ $show: boolean }>(props => ({
  display: props.$show ? 'block' : 'none',
}))

const StepButtons = styled(Row)({
  width: 300,
  justifyContent: "space-between",
})

