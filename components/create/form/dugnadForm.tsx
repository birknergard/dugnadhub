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

export default function DugnadForm({ step }: { step: number }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<string>('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [postcode, setPostcode] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  const [timeFrom, setTimeStart] = useState<Date>();
  //const images = useState('')

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
      date={date}
      setDate={setDate}
    />,
    <PersonsSelection />,
    <ImageUpload />,
  ];

  return (
    <Main>
      <Text className={s.section.title}>{createConstants.sections[step - 1].title}</Text>
      {/* <Text className={s.section.description}>{section.description}</Text> */}
      <View className={`${s.main}`}>
        {SectionList[step - 1]}
      </View>
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
  main: 'w-full flex flex-col items-center justify-evenly bg-dugnad-red rounded-xl p-4 gap-2',
  section: {
    title: 'text-3xl text-dugnad-red font-bold',
    description: 'text-lg',
  },
};
