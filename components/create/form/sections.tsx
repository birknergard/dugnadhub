import { Text, TextInput, View } from 'react-native';

export function CategorySelection({}: {}) {
  return (
    <View className={s.main}>
      <Text>Category</Text>
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
          placeholder="Your new title ..."
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

export function DateAndTimeSelection({}: {}) {
  return (
    <View className={s.main}>
      <Text>Date and time</Text>
    </View>
  );
}

export function PlaceSelection({}: {}) {
  return (
    <View className={s.main}>
      <Text>Place</Text>
    </View>
  );
}

export function PersonsSelection({}: {}) {
  return (
    <View className={s.main}>
      <Text>Persons</Text>
    </View>
  );
}

export function ImageUpload({}: {}) {
  return (
    <View className={s.main}>
      <Text>Images</Text>
    </View>
  );
}

const s = {
  main: 'w-full h-full flex flex-col items-center justify-evenly bg-dugnad-red rounded-xl p-3',
  fieldContainer: {
    base: 'w-full flex flex-col items-center',
    desc: 'text-lg text-white text-start',
    textField: 'w-3/4 text-lg rounded-md bg-dugnad-white p-2',
  },
};
