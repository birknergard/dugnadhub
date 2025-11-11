import { FontAwesome6 } from '@expo/vector-icons';
import { categoryConstants, Category } from 'constants/createConstants';
import { useState } from 'react';
import { Platform, Pressable, Text, TextInput, View } from 'react-native';
import DatePicker from 'react-datepicker';
import RNDateTimePicker, { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';

export default function TitleAndDescriptionSelection({
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
    <>
      <View className={s.fieldContainer.base}>
        <Text className={s.fieldContainer.desc}>
          1. Please create a fitting title for your dugnad </Text>
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
    </>
  );
}

const s = {
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
