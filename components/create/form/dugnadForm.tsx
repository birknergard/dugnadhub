import { createConstants } from 'constants/createConstants';
import { Text, View, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { useState } from 'react';
import TitleAndDescriptionSelection from './sections/titleDescriptionSection';
import CategorySelection from './sections/categorySection';
import PlaceSelection from './sections/placeSection';
import DateAndTimeSelection from './sections/dateTimeSection';
import PersonsSelection from './sections/personSection';
import ImageUpload from './sections/imageSection';
import { Column, Label, Row, Title } from 'components/general/styledTags';

export default function DugnadForm({ step, setShowUI }: {
  step: number,
  setShowUI: (bool: boolean) => void
}) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<string>('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [postcode, setPostcode] = useState('');
  const [dateTime, setDateTime] = useState<Date>(new Date());
  const [people, setPeople] = useState<number>(0);
  const [images, setImages] = useState<string[]>([]);

  // TODO: Submit completed doc
  const submit = () => { }

  const SectionList = [
    <CategorySelection
      category={category}
      onCategorySelect={setCategory}
    />,
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
    />,
    <PersonsSelection
      people={people}
      onPeopleChange={setPeople}
    />,
    <ImageUpload
      images={images}
      onImageAdd={setImages}
      setShowUI={setShowUI}
    />,
  ];

  return (
    <Main>
      {SectionList[step - 1]}
    </Main>
  );
}

const Main = styled(Column)({
  gap: 10
})
