import { useEffect, useState } from 'react';
import { Platform, View } from 'react-native';
import DatePicker from 'react-datepicker';
import RNDateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import styled from 'styled-components/native';
import { colors, Column, Input, Label, PlainText, Row } from 'components/general/styledTags';
import 'react-datepicker/dist/react-datepicker.css';
import NumberInput from 'components/general/numberInput';
import { format, isFuture, isToday, set } from 'date-fns';

export default function DateAndTimeSelection({
  setDateTime, duration, setDuration
}: {
  setDateTime: (date: Date) => void;
  duration: number;
  setDuration: (number: number) => void;
}) {
  const [date, setDate] = useState<Date | null>(null);
  const [isTimeSelected, setTimeSelected] = useState(false);

  const [isShowingAndroidDatePicker, setShowAndroidDatePicker] = useState(false);
  const [isShowingAndroidTimePicker, setShowAndroidTimePicker] = useState(false);

  const handleDurationChange = (duration: number) => {
    console.log(duration);
    if (0 < duration && duration <= 8) {
      setDuration(duration);
    }
  };

  const handleAndroidDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === 'set' && selectedDate) {
      setDate(selectedDate);
    }
    setShowAndroidDatePicker(false);
  };

  const handleAndroidTimeChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
    if (event.type === 'set' && selectedTime) {
      setDate(selectedTime);
      setTimeSelected(true);
    }
    setShowAndroidTimePicker(false);
  };

  const datePickerByPlatform =
    Platform.OS === 'web' ? (
      <StyledDatePicker
        selected={date}
        onChange={(e) => setDate(e)}
        dateFormat={'P'}
        startDate={new Date()}
      />
    ) : (
      <Column>
        <AndroidPicker onPress={() => setShowAndroidDatePicker(true)}>
          {date ? format(date, 'dd/MM/yyyy') : 'Not selected'}
        </AndroidPicker>
        {isShowingAndroidDatePicker && (
          <RNDateTimePicker mode="date" value={date ?? new Date()} onChange={handleAndroidDateChange} />
        )}
      </Column>
    );

  const timePickerByPlatform =
    Platform.OS === 'web' ? (
      <StyledDatePicker
        showTimeSelect
        showTimeSelectOnly
        selected={date}
        dateFormat={'p'}
        onChange={(e) => {
          console.log("hello");
          setDate(e)
          setTimeSelected(true);
        }}
        timeIntervals={15} // minute intervals
      />
    ) : (
      <Column>
        <AndroidPicker onPress={() => setShowAndroidTimePicker(true)}>
          {date ? format(date, 'HH:mm') : 'Select a time'}
        </AndroidPicker>
        {isShowingAndroidTimePicker && (
          <RNDateTimePicker mode="time" value={date ?? new Date()} onChange={handleAndroidTimeChange} />
        )}
      </Column>
    );

  useEffect(() => {
    if (date) {
      setDateTime(date);
    }
  }, [isTimeSelected, date])

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
