import Finalize from 'components/create/form/finalize';
import StepIndicator from 'components/create/stepIndicator';
import { TextButton } from 'components/general/buttons';
import { Column, Row, Title, PlainText, colors } from 'components/general/styledTags';
import * as datefns from 'date-fns';
import { Category, createConstants } from 'constants/createConstants';
import Dugnad from 'models/dugnad';
import { useEffect, useRef, useState } from 'react';
import CategorySelection from 'components/create/form/categorySection';
import { View } from 'react-native';
import DugnadService from 'services/dugnadService';
import StorageService from 'services/storageService';
import styled from 'styled-components/native';
import TitleAndDescriptionSelection from 'components/create/form/titleDescriptionSection';
import PlaceSelection from 'components/create/form/placeSection';
import DateAndTimeSelection from 'components/create/form/dateTimeSection';
import PersonsSelection from 'components/create/form/personSection';
import ImageUpload from 'components/create/form/imageSection';
import { auth, getStorageReference } from 'firebaseConfig';
import { useAuthSession } from 'providers/authSessionProvider';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';

export default function Create() {
  const [step, setStep] = useState(1);
  const [isShowingUI, setShowUI] = useState(true);
  const userId = useAuthSession().user?.uid ?? 'unknown user';

  // Keeps count of which steps have been marked as "validated"
  const [validSteps, setValidSteps] = useState(0);

  const [category, setCategory] = useState<Category | null>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [address, setAddress] = useState('');
  const [postcode, setPostcode] = useState('');
  const [city, setCity] = useState('');

  const [dateTime, setDateTime] = useState<Date | null>(null);
  const [duration, setDuration] = useState(0);

  const [people, setPeople] = useState<number>(0);

  const [images, setImages] = useState<string[]>([]);

  // Store previous ref, possibly allowing user to jump between steps later
  const previousValidStep = useRef(validSteps);

  const [errorMessage, setErrorMessage] = useState('');

  const submit = async () => {
    const dugnad: Dugnad = {
      title: title,
      description: description,
      address: address,
      postcode: postcode,
      city: city,
      startDateTime: dateTime!,
      endDateTime: datefns.addHours(dateTime!, duration),
      requiredPersons: people,
      images: [],
      ownerId: userId // Attach user id from current auth session
    };
    const request = await DugnadService.postDugnad(dugnad);
    if (!request) {
      // TODO: error logging
      return
    }
    Toast.show({
      type: 'success',
      text1: `Created new dugnad ${title}!`
    })
    router.navigate('/')
  };

  useEffect(() => {
    if (category) {
      previousValidStep.current = validSteps;
      setValidSteps(1);
    } else {
      setValidSteps(0);
    }
  }, [category]);

  useEffect(() => {
    if (title !== '' && description !== '') {
      previousValidStep.current = validSteps;
      setValidSteps(2);
    } else {
      setValidSteps(1);
    }
  }, [title, description]);

  useEffect(() => {
    if (address !== '' && postcode.length === 4, city !== '') {
      previousValidStep.current = validSteps;
      setValidSteps(3);
    } else {
      setValidSteps(2);
    }
  }, [address, postcode, city]);

  useEffect(() => {
    if (!dateTime) {
      return
    }

    if (datefns.isToday(dateTime)) {
      setErrorMessage('Invalid date, can\'t be current day');
      setValidSteps(3);
      return
    }

    if (!datefns.isFuture(dateTime)) {
      setErrorMessage('Invalid date, has to be in the future (not today).');
      setValidSteps(3);
      return
    }

    if (dateTime && duration > 0) {
      previousValidStep.current = validSteps;
      setValidSteps(4);
    } else {
      setValidSteps(3);
    }
  }, [dateTime, duration])

  useEffect(() => {
    if (people > 0) {
      previousValidStep.current = validSteps;
      setValidSteps(7); // Since images (next form) are optional, we skip straight to 7
    } else {
      setValidSteps(4);
    }
  }, [people]);

  useEffect(() => {
    if (errorMessage !== '') {
      Toast.show({
        type: 'error',
        text1: errorMessage
      })
    }
  }, [errorMessage])

  const SectionList = [
    <CategorySelection selected={category} onCategorySelect={setCategory} />,
    <TitleAndDescriptionSelection
      title={title}
      onChangeTitle={setTitle}
      description={description}
      onChangeDescription={setDescription}
    />,
    <PlaceSelection
      address={address}
      onAddressChange={setAddress}
      postcode={postcode}
      onPostcodeChange={setPostcode}
      setCity={setCity}
    />,
    <DateAndTimeSelection
      setDateTime={setDateTime}
      duration={duration}
      setDuration={setDuration}
    />,
    <PersonsSelection people={people} onPeopleChange={setPeople} />,
    <ImageUpload images={images} onImageAdd={setImages} setShowUI={setShowUI} />,
    <Finalize />
  ];

  return (
    <Main>
      <StepIndicatorColumn>
        <PlainText>Press any of these steps to go back</PlainText>
        <StyledStepIndicator $hidden={!isShowingUI} currentStep={step} setStep={setStep} />
      </StepIndicatorColumn>
      <Form>
        <SectionTitle $hidden={!isShowingUI}>{createConstants.sections[step - 1].title}</SectionTitle>
        {/* <Heading className={s.section.description}>{section.description}</Heading> */}
        {SectionList[step - 1]}
      </Form>
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
          <ButtonWrapper $show={step <= 7 && step <= validSteps}>
            <TextButton
              color={step === 7 ? colors.green : colors.yellow}
              text={step === 7 ? "Submit" : "Next"}
              iconName={step === 7 ? "plus" : "chevron-right"}
              iconPosition="left"
              onTap={async () => {
                // Only allow shift forward if within range, and the step is validated
                if (step + 1 <= 7 && step <= validSteps) {
                  setStep(step + 1);
                  return
                }
                if (step === 7) {
                  await submit()
                }
              }}
            />
          </ButtonWrapper>
        </StepButtons>
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
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const Form = styled(Column)({
  marginTop: 10,
  marginBottom: 10,
  flexGrow: 1,
  alignSelf: 'stretch',
  gap: 10,
})

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
