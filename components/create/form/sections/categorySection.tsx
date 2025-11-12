import { FontAwesome6 } from '@expo/vector-icons';
import { Heading, Label, PlainText } from 'components/general/styledTags';
import { categoryConstants, Category } from 'constants/createConstants';
import { useState } from 'react';
import { Platform, Pressable, Text, TextInput, View } from 'react-native';

export default function CategorySelection({ category, onCategorySelect }: {
  category: string,
  onCategorySelect: (category: string) => void
}) {
  const [selected, setSelected] = useState<number | null>(null)

  // TODO: Non scrollable view, needs to be smaller
  if (Platform.OS === 'android') return (
    <>
      <Label>angy at droid man</Label>
    </>
  );

  return (
    <>
      <Label>Please select a category from the list below</Label>
      {categoryConstants.map((category, i) => (
        <Pressable
          key={i}
          className={s.selectBox.container + (selected === i ? s.selectBox.selected : '')}
          onPress={() => {
            onCategorySelect(category.name)
            setSelected(i)
          }}
        >
          <View className={'w-3/4'}>
            <Heading>{category.name}</Heading>
            <PlainText>{category.description}</PlainText>
          </View>
          <FontAwesome6
            name={category.iconName}
            size={40}
          />
        </Pressable>
      ))}
    </>
  );

}

const s = {
  selectBox: {
    container: 'w-full flex flex-row justify-between items-center border-dugnad-white rounded-xl bg-dugnad-white p-2',
    selected: 'border-2 bg-dugnad-yellow p-2'
  },
};
