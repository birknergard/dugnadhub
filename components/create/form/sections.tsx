import { FontAwesome6 } from '@expo/vector-icons';
import { categoryConstants, Category } from 'constants/createConstants';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

export function CategorySelection({ }: {}) {
  const [selected, setSelected] = useState<Category | null>(null)
  return (
    <View className={s.main}>
      <Text className={s.fieldContainer.desc}>Please select a category from the list below</Text>
      {categoryConstants.map(category => (
        <Pressable
          className={s.selectBox.container.box + (selected === category ? s.selectBox.selected : '')}
          onPress={() => setSelected(category)}
        >
          <View className={'w-3/4'}>
            <Text className={s.selectBox.container.text.title}>{category.name}</Text>
            <Text className={s.selectBox.container.text.desc}>{category.description}</Text>
          </View>
          <FontAwesome6
            name={category.iconName}
            size={40}
          />
        </Pressable>
      ))}
    </View>
  );
}

export function TitleAndDescriptionSelection({
  title,
  onChangeTitle,
  description,
  onChangeDescription,
}: {
  title: string;
  onChangeTitle: (e: string) => void;
  description: string;
  onChangeDescription: (e: string) => void;
}) {
  return (
    <View className={s.main}>
      <View className={s.fieldContainer.base}>
        <Text className={s.fieldContainer.desc}>
          1. Please create a fitting title for your dugnad
        </Text>
        <TextInput
          className={s.fieldContainer.textField}
          onChangeText={(e) => onChangeTitle(e)}
          value={title}
          placeholder="Write a title ..."
        />
      </View>
      <View className={s.fieldContainer.base}>
        <Text className={s.fieldContainer.desc}>2. Please describe your dugnad.</Text>
        <TextInput
          className={s.fieldContainer.textField}
          onChangeText={(e) => onChangeDescription(e)}
          value={description}
          multiline={true}
          numberOfLines={4}
          placeholder="Write a description ..."
        />
      </View>
    </View>
  );
}

export function DateAndTimeSelection({ }: {}) {
  return (
    <View className={s.main}>
      <Text>Date and time</Text>
    </View>
  );
}

export function PlaceSelection({ }: {}) {
  return (
    <View className={s.main}>
      <Text>Place</Text>
    </View>
  );
}

export function PersonsSelection({ }: {}) {
  return (
    <View className={s.main}>
      <Text>Persons</Text>
    </View>
  );
}

export function ImageUpload({ }: {}) {
  return (
    <View className={s.main}>
      <Text>Images</Text>
    </View>
  );
}

const s = {
  main: 'w-full h-full flex flex-col items-center justify-evenly bg-dugnad-red rounded-xl p-4',
  fieldContainer: {
    base: 'w-full flex flex-col items-start gap-2',
    desc: 'text-md text-white font-bold',
    textField: 'w-full text-md rounded-md bg-dugnad-white p-2',
  },
  selectBox: {
    container: {
      box: 'w-full h-fit flex flex-row justify-between items-center border-dugnad-white rounded-xl bg-dugnad-white p-8',
      text: {
        title: 'text-lg',
        desc: 'text-md truncate'
      }
    },
    selected: 'border-2 bg-dugnad-yellow p-8'
  },
};
