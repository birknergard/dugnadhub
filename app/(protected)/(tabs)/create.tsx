import DugnadForm from 'components/create/form/dugnadForm';
import PreviewDugnad from 'components/create/form/preview';
import StepIndicator from 'components/create/stepIndicator';
import { TextButton } from 'components/general/buttons';
import { Column, Row, Title, PlainText, RowPressable } from 'components/general/styledTags';
import { createConstants } from 'constants/createConstants';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import styled from 'styled-components/native';

export default function Create() {
  const [step, setStep] = useState(1);
  const [isShowingUI, setShowUI] = useState(true);

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
            <DugnadForm step={step} setShowUI={setShowUI} />
          </Column>
          {isShowingUI &&
            <StepButtons>
              <ButtonWrapper $show={step >= 2}>
                <TextButton
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
              <ButtonWrapper $show={step <= 6}>
                <TextButton
                  text={step === 6 ? "Finish" : "Next"}
                  iconName="chevron-right"
                  iconPosition="left"
                  onTap={() => {
                    if (step + 1 <= 7) {
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
              text={"Go Back"}
              iconName="chevron-left"
              iconPosition="right"
              onTap={() => {
                setStep(6);
              }}
            />
            <TextButton
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
  visibility: props.$show ? 'visible' : 'hidden',
}))

const StepButtons = styled(Row)({
  alignSelf: 'stretch',
  justifyContent: "space-between",
})

const PreviewContainer = styled(ScrollView)({
  flex: 1,
  alignSelf: 'stretch',
})
