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

export default function FormSection({ step }: { step: number }) {
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
    <Main>
      {createConstants.sections.map(
        (section, i) =>
          step === i + 1 && (
            <View className={s.section.base}>
              <Text className={s.section.title}>{section.title}</Text>
              {/* <Text className={s.section.description}>{section.description}</Text> */}
              {SectionList[i]}
            </View>
          )
      )}
    </Main>
  );
}

const Main = styled.View`
  display: flex;
  flex-direction: column;
  justify-center: center;
  align-items: center;
`;

const s = {
  section: {
    base: 'w-full flex flex-col items-center justify-center gap-4',
    title: 'text-3xl text-dugnad-red font-bold',
    description: 'text-lg',
  },
};
