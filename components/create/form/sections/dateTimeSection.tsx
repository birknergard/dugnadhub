import { FontAwesome6 } from '@expo/vector-icons';
import { categoryConstants, Category } from 'constants/createConstants';
import { useState } from 'react';
import { Platform, Pressable, Text, TextInput, View } from 'react-native';
import DatePicker from 'react-datepicker';
import RNDateTimePicker, { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';

export default function DateAndTimeSelection({ date, setDate }: {
  date: Date,
  setDate: (date: Date) => void
}) {

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date | undefined | void) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  return (
    <>
      <View>
        {Platform.OS === 'web' && <>
          <DatePicker selected={date} onChange={(e) => setDate(e!)} />
        </>}
        {Platform.OS === 'android' && <>
          <RNDateTimePicker value={date} onChange={onChange} />
        </>}
      </View>
    </>
  );
}

const s = {};
