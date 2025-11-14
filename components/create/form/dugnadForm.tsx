import styled from 'styled-components/native';
import { useState } from 'react';
import TitleAndDescriptionSelection from './sections/titleDescriptionSection';
import CategorySelection from './sections/categorySection';
import PlaceSelection from './sections/placeSection';
import DateAndTimeSelection from './sections/dateTimeSection';
import PersonsSelection from './sections/personSection';
import ImageUpload from './sections/imageSection';
import Dugnad from 'models/dugnad';
import { addHours } from 'date-fns';
import { FirestoreService } from 'services/firestoreService';
import { Column } from 'components/general/styledTags';
import { StorageService } from 'services/storageService';

export default function DugnadForm({
  step,
  setShowUI,
}: {
  step: number;
  setShowUI: (bool: boolean) => void;
}) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<string>('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [postcode, setPostcode] = useState('');
  const [dateTime, setDateTime] = useState<Date>(new Date());
  const [duration, setDuration] = useState(0);
  const [people, setPeople] = useState<number>(0);
  const [images, setImages] = useState<string[]>([]);

  // TODO: Submit completed doc
  const submit = async (): Promise<boolean> => {
    // Create dugnad object
    const dugnad: Dugnad = {
      title: title,
      description: description,
      address: address,
      postcode: postcode,
      city: 'unknown',
      startDateTime: dateTime,
      endDateTime: addHours(dateTime, duration),
      requiredPersons: people,
      images: [],
    };
    // Upload all images
    for (let i = 0; i < images.length; i++) {
      const uploaded = await StorageService.uploadImage(images[i]);
      if (uploaded === 'ERROR') {
        return false;
      }
      dugnad.images.push(uploaded);
    }
    return await FirestoreService.postDugnad(dugnad);
  };

  const SectionList = [
    <CategorySelection category={category} onCategorySelect={setCategory} />,
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
    />,
    <DateAndTimeSelection
      dateTime={dateTime}
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
