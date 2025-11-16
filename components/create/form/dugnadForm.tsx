import styled from 'styled-components/native';
import { RefObject, useEffect, useRef, useState } from 'react';
import TitleAndDescriptionSelection from './sections/titleDescriptionSection';
import CategorySelection from './sections/categorySection';
import PlaceSelection from './sections/placeSection';
import DateAndTimeSelection from './sections/dateTimeSection';
import PersonsSelection from './sections/personSection';
import ImageUpload from './sections/imageSection';
import Dugnad from 'models/dugnad';
import { add, addHours, isFuture, isToday } from 'date-fns';
import FirestoreService from 'services/dugnadService';
import { Column } from 'components/general/styledTags';
import StorageService from 'services/storageService';
import { Category } from 'constants/createConstants';

export default function DugnadForm({
  step,
  setShowUI,
  validSteps,
  setValidSteps,
}: {
  step: number;
  setShowUI: (bool: boolean) => void;
  validSteps: number;
  setValidSteps: (step: number) => void

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

  return <Main>{SectionList[step - 1]}</Main>;
}

const Main = styled(Column)({
  gap: 10,
});
