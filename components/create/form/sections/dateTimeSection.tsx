import { FontAwesome6 } from '@expo/vector-icons';
import { categoryConstants, Category } from 'constants/createConstants';
import { useState } from 'react';
import { Platform, Pressable, Text, TextInput, View } from 'react-native';
import DatePicker from 'react-datepicker';
import RNDateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import styled from 'styled-components/native';
import { colors, Column, Input, Label, PlainText, Row } from 'components/general/styledTags';
import 'react-datepicker/dist/react-datepicker.css';
import NumberInput from 'components/general/numberInput';
import { TextButton } from 'components/general/buttons';
import { format } from 'date-fns';

export default function DateAndTimeSelection({
  dateTime,
  setDateTime,
}: {
  dateTime: Date;
  setDateTime: (date: Date) => void;
  duration: number;
  setDuration: (number: number) => void;
}) {
  const onChange = (event: DateTimePickerEvent, selectedDate?: Date | undefined | void) => {
    const currentDate = selectedDate || dateTime;
    setDateTime(currentDate);
  };

  const [time, setStartTime] = useState<Date>(new Date());
  const [duration, setDuration] = useState<number>(0);

  const [isShowingAndroidDatePicker, setShowAndroidDatePicker] = useState(false);
  const [isShowingAndroidTimePicker, setShowAndroidTimePicker] = useState(false);

  const handleDurationChange = (duration: number) => {
    if (1 <= duration && duration <= 8) {
      setDuration(duration);
    }
  };

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === 'set' && selectedDate) {
      setDateTime(selectedDate);
    }
    setShowAndroidDatePicker(false);
  };

  const handleTimeChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
    if (event.type === 'set' && selectedTime) {
      setStartTime(selectedTime);
    }
    setShowAndroidTimePicker(false);
  };

  const datePickerByPlatform =
    Platform.OS === 'web' ? (
      <StyledDatePicker
        className="text-start"
        selected={dateTime}
        onChange={(e) => setDateTime(e!)}
        dateFormat={'P'}
        timeIntervals={15}
      />
    ) : (
      <Column>
        <AndroidPicker onPress={() => setShowAndroidDatePicker(true)}>
          {format(dateTime, 'dd/MM/yyyy')}
        </AndroidPicker>
        {isShowingAndroidDatePicker && (
          <RNDateTimePicker mode="date" value={dateTime} onChange={handleDateChange} />
        )}
      </Column>
    );

  const timePickerByPlatform =
    Platform.OS === 'web' ? (
      <StyledDatePicker
        className="text-start"
        showTimeSelect
        showTimeSelectOnly
        selected={time}
        dateFormat={'p'}
        onChange={(e) => setStartTime(e!)}
        timeIntervals={15} // minute intervals
      />
    ) : (
      <Column>
        <AndroidPicker onPress={() => setShowAndroidTimePicker(true)}>
          {format(time, 'HH:mm')}
        </AndroidPicker>
        {isShowingAndroidTimePicker && (
          <RNDateTimePicker mode="time" value={time} onChange={handleTimeChange} />
        )}
      </Column>
    );
  return (
    <StyledColumn>
      <Column>
        <StyledLabel>Select a date</StyledLabel>
        <DatePickerContainer>{datePickerByPlatform}</DatePickerContainer>
      </Column>

      <Column>
        <StyledLabel>Select starting time</StyledLabel>
        <DatePickerContainer>{timePickerByPlatform}</DatePickerContainer>
      </Column>

      <StyledColumn>
        <StyledLabel>Provide duration (hours)</StyledLabel>
        <NumberInput value={duration} suffix="hours" onChange={handleDurationChange} />
      </StyledColumn>
    </StyledColumn>
  );
}

const StyledColumn = styled(Column)({
  gap: 20,
});

const StyledLabel = styled(Label)({
  textAlign: 'center',
});

const DatePickerContainer = styled(View)({
  alignSelf: 'center',
  background: '#FFFFFF',
  borderWidth: 1,
  borderRadius: 5,
  padding: 5,
});

const AndroidPicker = styled(PlainText)({});

const StyledDatePicker = styled(DatePicker).attrs({
  className: 'text-center',
  popperClassName: 'z-50',
  portalId: 'root-portal',
})`
  .react-datepicker-popper {
    z-index: 9999 !important;
  }
`;
