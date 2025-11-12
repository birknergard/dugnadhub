import NumberInput from "components/general/numberInput";
import { Column, Label } from "components/general/styledTags";
import { Text } from "react-native";
import styled from "styled-components/native";

export default function PersonsSelection({ people, onPeopleChange }: {
  people: number,
  onPeopleChange: (people: number) => void
}) {

  return (
    <StyledColumn>
      <Label>Please select how many people you need</Label>
      <NumberInput
        value={people}
        suffix="person(s)"
        onChange={onPeopleChange}
      />
    </StyledColumn>
  );
}

const StyledColumn = styled(Column)({
  gap: 30
})
