import { createConstants } from 'constants/create';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';
import {
  CategorySelection,
  DateAndTimeSelection,
  ImageUpload,
  PersonsSelection,
  PlaceSelection,
  TitleAndDescriptionSelection,
} from './sections';
import { useState } from 'react';

export default function DugnadForm({ step }: { step: number }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [postcode, setPostcode] = useState('');
  const [date, setDate] = useState<Date | undefined>();
  const [timeFrom, setTimeFrom] = useState<Date | undefined>();
  const [timeTo, setTimeTo] = useState<Date | undefined>();
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
    <DateAndTimeSelection />,
    <PersonsSelection />,
    <ImageUpload />,
  ];

  return (
    <>
      {createConstants.sections.map(
        (section, i) =>
          step === i + 1 && (
            <Main>
              <Text className={s.section.title}>{section.title}</Text>
              {/* <Text className={s.section.description}>{section.description}</Text> */}
              {SectionList[i]}
            </Main>
          )
      )}
    </>
  );
}

const Main = styled.View`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-center: center;
  align-items: center;
  gap: 1rem;
`;

const s = {
  section: {
    title: 'text-3xl text-dugnad-red font-bold',
    description: 'text-lg',
  },
};
