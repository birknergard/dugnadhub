import { FontAwesome6 } from '@expo/vector-icons';
import { categoryConstants, Category } from 'constants/createConstants';
import { useState } from 'react';
import { Platform, Pressable, Text, TextInput, View } from 'react-native';
import DatePicker from 'react-datepicker';
import RNDateTimePicker, { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';

export function CategorySelection({ }: {}) {
  const [selected, setSelected] = useState<Category | null>(null)

  if (Platform.OS === 'android') return (
    <View className={`${s.main}`}>
      <Text>Fuck you kill yourself</Text>
    </View>
  );

  return (
    <View className={s.main}>
      <Text className={s.fieldContainer.desc}>Please select a category from the list below</Text>
      {categoryConstants.map((category, i) => (
        <Pressable key={i}
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

export function PlaceSelection({ }: {}) {
  return (
    <View className={s.main}>
      <Text>Address</Text>
      <Text>Postcode</Text>
      <Text>City</Text>
    </View>
  );
}

export function DateAndTimeSelection({ date, setDate }: {
  date: Date,
  setDate: (date: Date) => void
}) {
  const onChange = (event: DateTimePickerEvent, selectedDate?: Date | undefined | void) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  return (
    <View className={s.main}>
      <View>
        {Platform.OS === 'web' && <>
          <DatePicker selected={date} onChange={(e) => setDate(e!)} />
        </>}
        {Platform.OS === 'android' && <>
          <RNDateTimePicker value={date} onChange={onChange} />
        </>}
      </View>
    </View>
  );
}

export function PersonsSelection({ }: {}) {
  return (
    <View className={s.main}>
      <Text>Persons require</Text>
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
  main: 'w-full flex flex-col items-center justify-evenly bg-dugnad-red rounded-xl p-4 gap-2',
  fieldContainer: {
    base: 'w-full flex flex-col items-start gap-2',
    desc: 'text-md text-white font-bold',
    textField: 'w-full text-md rounded-md bg-dugnad-white p-2',
  },
  selectBox: {
    container: {
      box: 'w-full flex flex-row justify-between items-center border-dugnad-white rounded-xl bg-dugnad-white p-2',
      text: {
        title: 'text-md font-bold',
        desc: 'text-sm'
      }
    },
    selected: 'border-2 bg-dugnad-yellow p-2'
  },
};
