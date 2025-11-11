import { createConstants } from 'constants/createConstants';
import { Text, View, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import {
  CategorySelection,
  DateAndTimeSelection,
  ImageUpload,
  PersonsSelection,
  PlaceSelection,
  TitleAndDescriptionSelection,
} from './sections/dugnadSections';
import { useState } from 'react';

export default function DugnadForm({ step }: { step: number }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [postcode, setPostcode] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  const [timeFrom, setTimeStart] = useState<Date>();
  //const images = useState('')

  const SectionList = [
    <CategorySelection />,
    <TitleAndDescriptionSelection
      title={title}
      onChangeTitle={setTitle}
      description={description}
      onChangeDescription={setDescription}
    />,
    <PlaceSelection />,
    <DateAndTimeSelection date={date} setDate={setDate} />,
    <PersonsSelection />,
    <ImageUpload />,
  ];

  return (
    <Main>
      <Text className={s.section.title}>{createConstants.sections[step - 1].title}</Text>
      {/* <Text className={s.section.description}>{section.description}</Text> */}
      {SectionList[step - 1]}
    </Main>
  );
}

const Main = styled.View({
  flexDirection: "column",
  justifyCenter: "center",
  alignItems: "center",
  gap: 10,
})

const s = {
  section: {
    title: 'text-3xl text-dugnad-red font-bold',
    description: 'text-lg',
  },
};
