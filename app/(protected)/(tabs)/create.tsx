import DugnadForm from 'components/create/form/dugnadForm';
import StepIndicator from 'components/create/stepIndicator';
import { TextButton } from 'components/general/buttons';
import { Column, Row, Title, PlainText, colors } from 'components/general/styledTags';
import { createConstants } from 'constants/createConstants';
import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import styled from 'styled-components/native';

export default function Create() {
  const [step, setStep] = useState(1);
  const [isShowingUI, setShowUI] = useState(true);
  const [validSteps, setValidSteps] = useState(0);

  // Keeps count of which steps have been marked as "validated"
  useEffect(() => {
    console.log('validsteps changed: ', validSteps);
  }, [validSteps])

  return (
    <Main>
      <StepIndicatorColumn>
        <PlainText>Press any of these steps to go back</PlainText>
        <StyledStepIndicator $hidden={!isShowingUI} currentStep={step} setStep={setStep} />
      </StepIndicatorColumn>
      {step < 7 ? (
        <>
          <Column>
            <SectionTitle $hidden={!isShowingUI}>{createConstants.sections[step - 1].title}</SectionTitle>
            {/* <Heading className={s.section.description}>{section.description}</Heading> */}
            <DugnadForm step={step} validSteps={validSteps} setValidSteps={setValidSteps} setShowUI={setShowUI} />
          </Column>
          {isShowingUI &&
            <StepButtons>
              <ButtonWrapper $show={step >= 2}>
                <TextButton
                  color={colors.yellow}
                  text={"Back"}
                  iconName="chevron-left"
                  iconPosition="right"
                  onTap={() => {
                    if (step - 1 > 0) {
                      setStep(step - 1);
                    }
                  }}
                />
              </ButtonWrapper>
              <ButtonWrapper $show={step <= 6 && step <= validSteps}>
                <TextButton
                  color={colors.yellow}
                  text={step === 6 ? "Finish" : "Next"}
                  iconName="chevron-right"
                  iconPosition="left"
                  onTap={() => {
                    // Only allow shift forward if within range, and the step is validated
                    if (step + 1 <= 7 && step <= validSteps) {
                      setStep(step + 1);
                    }
                  }}
                />
              </ButtonWrapper>
            </StepButtons>
          }

        </>
      ) : (
        <PreviewContainer>
          <Column>
            {Array.from<number>({ length: 100 }).map((_, index) => (
              <PlainText key={index}>Preview goes here</PlainText>
            ))}
          </Column>
          <StepButtons>
            <TextButton
              color={colors.yellow}
              text={"Go Back"}
              iconName="chevron-left"
              iconPosition="right"
              onTap={() => {
                setStep(6);
              }}
            />
            <TextButton
              color={colors.green}
              text={"Post"}
              iconName="plus"
              iconPosition="left"
              onTap={() => {

              }}
            />
          </StepButtons>
        </PreviewContainer>
      )
      }
    </Main >
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

const StepIndicatorColumn = styled(Column)({ gap: 10 })

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
  alignSelf: 'stretch',
  justifyContent: "space-between",
})

const PreviewContainer = styled(ScrollView)({
  flex: 1,
  alignSelf: 'stretch',
})
