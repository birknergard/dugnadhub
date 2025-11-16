import styled from 'styled-components/native';
import { RefObject, useEffect, useRef, useState } from 'react';
import TitleAndDescriptionSelection from './titleDescriptionSection';
import CategorySelection from './categorySection';
import PlaceSelection from './placeSection';
import DateAndTimeSelection from './dateTimeSection';
import PersonsSelection from './personSection';
import ImageUpload from './imageSection';
import Dugnad from 'models/dugnad';
import { add, addHours, isFuture, isToday } from 'date-fns';
import FirestoreService from 'services/dugnadService';
import { colors, Column, Row } from 'components/general/styledTags';
import StorageService from 'services/storageService';
import { Category } from 'constants/createConstants';
import Finalize from './finalize';
import { ScrollView, View } from 'react-native';
import { TextButton } from 'components/general/buttons';

export default function DugnadForm({
  step,
  setStep,
  validSteps,
  setValidSteps,
  isShowingUI,
  setShowUI
}: {
  step: number;
  validSteps: number;
  setStep: (step: number) => void;
  setValidSteps: (step: number) => void;
  isShowingUI: boolean,
  setShowUI: (show: boolean) => void
}) {
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

  // TODO: Submit completed doc
  const submit = async (): Promise<boolean> => {
    const dugnad: Dugnad = {
      title: title,
      description: description,
      address: address,
      postcode: postcode,
      city: city,
      startDateTime: dateTime!,
      endDateTime: addHours(dateTime!, duration),
      requiredPersons: people,
      images: [],
    };
    for (let i = 0; i < images.length; i++) {
      const uploaded = await StorageService.uploadImage(images[i]);
      if (uploaded === 'ERROR') {
        return false;
      }
      dugnad.images.push(uploaded);
    }
    return await FirestoreService.postDugnad(dugnad);
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
      setValidSteps(0);
    }
  }, [address, postcode, city]);

  useEffect(() => {
    if (dateTime && !isToday(dateTime) && isFuture(dateTime) && duration > 0) {
      previousValidStep.current = validSteps;
      setValidSteps(4);
    } else {
      setValidSteps(0);
    }
  }, [dateTime, duration])

  useEffect(() => {
    if (people > 0) {
      previousValidStep.current = validSteps;
      setValidSteps(7); // Since images (next form) are optional, we skip straight to 7
    } else {
      setValidSteps(0);
    }
  }, [people]);

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
  ];

  if (step === 7) return (
    <Main>
      {step !== 7 ? SectionList[step - 1] : <Finalize />}
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
              color={step === 7 ? colors.green : colors.yellow}
              text={step === 7 ? "Submit" : "Next"}
              iconName={step === 7 ? "plus" : "chevron-right"}
              iconPosition="left"
              onTap={() => {
                // Only allow shift forward if within range, and the step is validated
                if (step + 1 <= 7 && step <= validSteps) {
                  setStep(step + 1);
                  return
                }
                if (step === 7) {

                }
              }}
            />
          </ButtonWrapper>
        </StepButtons>
      }
    </Main>
  );

  return <Main></Main>;
}


const Main = styled(Column)({
  gap: 10,
});

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
