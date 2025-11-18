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
import { format } from 'date-fns';

export default function DateAndTimeSelection({
  dateTime, setDateTime, duration, setDuration
}: {
  dateTime: Date | null;
  setDateTime: (date: Date) => void;
  duration: number;
  setDuration: (number: number) => void;
}) {
  const [isShowingAndroidDatePicker, setShowAndroidDatePicker] = useState(false);
  const [isShowingAndroidTimePicker, setShowAndroidTimePicker] = useState(false);

  const handleAndroidDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === 'set' && selectedDate) {
      setDateTime(selectedDate);
    }
    setShowAndroidDatePicker(false);
  };

  const handleAndroidTimeChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
    if (event.type === 'set' && selectedTime) {
      setDateTime(selectedTime);
    }
    setShowAndroidTimePicker(false);
  };

  const datePickerByPlatform =
    Platform.OS === 'web' ? (
      <StyledDatePicker
        selected={dateTime}
        onChange={(e) => e && setDateTime(e)}
        dateFormat={'P'}
      />
    ) : (
      <Column>
        <AndroidPicker onPress={() => setShowAndroidDatePicker(true)}>
          {dateTime ? format(dateTime, 'dd/MM/yyyy') : 'Not selected'}
        </AndroidPicker>
        {isShowingAndroidDatePicker && (
          <RNDateTimePicker mode="date" value={dateTime ?? new Date()} onChange={handleAndroidDateChange} />
        )}
      </Column>
    );

  const timePickerByPlatform =
    Platform.OS === 'web' ? (
      <StyledDatePicker
        showTimeSelect
        showTimeSelectOnly
        selected={dateTime}
        dateFormat={'p'}
        onChange={(e) => e && setDateTime(e)}
        timeFormat="HH:mm"
        timeIntervals={15} // minute intervals
      />
    ) : (
      <Column>
        <AndroidPicker onPress={() => setShowAndroidTimePicker(true)}>
          {dateTime ? format(dateTime, 'HH:mm') : 'Select a time'}
        </AndroidPicker>
        {isShowingAndroidTimePicker && (
          <RNDateTimePicker mode="time" value={dateTime ?? new Date()} onChange={handleAndroidTimeChange} />
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
        <NumberInput value={duration} suffix="hours" min={1} max={12} onChange={setDuration} />
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
