import { FontAwesome6 } from '@expo/vector-icons';
import { categoryConstants, Category } from 'constants/createConstants';
import { useState } from 'react';
import { Platform, Pressable, Text, TextInput, View } from 'react-native';
import DatePicker from 'react-datepicker';
import RNDateTimePicker, { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import styled from 'styled-components/native';
import { colors, Column, Input, Label, Row } from 'components/general/styledTags';
import "react-datepicker/dist/react-datepicker.css";
import DurationPicker from 'components/general/durationInput';
import NumberInput from 'components/general/numberIncrementPicker';

export default function DateAndTimeSelection({ date, setDate }: {
  date: Date,
  setDate: (date: Date) => void
}) {

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date | undefined | void) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const [time, setStartTime] = useState<Date>(new Date())
  const [duration, setDuration] = useState<number>(0)

  const handleDurationChange = (duration: number) => {
    if (1 <= duration && duration <= 8) {
      setDuration(duration);
    }
  };

  const datePickerByPlatform = Platform.OS === 'web' ? (
    <StyledDatePicker
      className='text-start'
      selected={date}
      onChange={(e) => setDate(e!)}
      dateFormat={'P'}
      timeIntervals={15}
    />
  ) : (
    <RNDateTimePicker mode='date' value={date} onChange={onChange} />
  )

  const timePickerByPlatform = Platform.OS === 'web' ? (
    <StyledDatePicker
      className='text-start'
      showTimeSelect
      showTimeSelectOnly
      selected={time}
      dateFormat={'p'}
      onChange={(e) => setStartTime(e!)}
      timeIntervals={15} // minute intervals
    />
  ) : (
    <RNDateTimePicker mode='time' value={date} onChange={onChange} />
  )
  return (
    <StyledColumn>
      <Column>
        <StyledLabel>Select a date</StyledLabel>
        <DatePickerContainer>
          {datePickerByPlatform}
        </DatePickerContainer>
      </Column>

      <Column>
        <StyledLabel>Select starting time</StyledLabel>
        <DatePickerContainer>
          {timePickerByPlatform}
        </DatePickerContainer>
      </Column>

      <StyledColumn>
        <StyledLabel>Provide duration (hours)</StyledLabel>
        <NumberInput
          value={duration}
          onChange={handleDurationChange}
        />
      </StyledColumn>
    </StyledColumn>
  );
}

const StyledColumn = styled(Column)({
  gap: 20
})

const StyledLabel = styled(Label)({
  textAlign: 'center',
})

const DatePickerContainer = styled(View)({
  alignSelf: 'center',
  background: '#FFFFFF',
  borderWidth: 1,
  borderRadius: 5,
  padding: 5,
})

const StyledDatePicker = styled(DatePicker).attrs({
  className: 'text-center',
  popperClassName: 'z-50',
  portalId: 'root-portal',
})`
  .react-datepicker-popper {
    z-index: 9999 !important;
  }
`;
