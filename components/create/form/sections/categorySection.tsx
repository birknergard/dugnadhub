import { FontAwesome6 } from '@expo/vector-icons';
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
      <Text>angy at droid man</Text>
    </>
  );

  return (
    <>
      <Text className={s.desc}>Please select a category from the list below</Text>
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
            <Text className={s.selectBox.text.title}>{category.name}</Text>
            <Text className={s.selectBox.text.desc}>{category.description}</Text>
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
  desc: 'text-md text-white font-bold',
  selectBox: {
    container: 'w-full flex flex-row justify-between items-center border-dugnad-white rounded-xl bg-dugnad-white p-2',
    text: {
      title: 'text-md font-bold',
      desc: 'text-sm'
    },
    selected: 'border-2 bg-dugnad-yellow p-2'
  },
};
