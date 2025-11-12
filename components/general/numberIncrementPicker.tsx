import { FontAwesome6 } from "@expo/vector-icons";
import { colors, Row } from "./styledTags";
import styled from "styled-components/native";
import { Pressable } from "react-native";

export default function NumberInput({ value, onChange }: {
  value: number,
  onChange: (value: number) => void
}) {
  return (
    <StyledRow>
      <Pressable onPress={() => onChange(value - 1)}>
        <FontAwesome6 name='chevron-left' size={30} />
      </Pressable>

      <Value>{value}</Value>

      <Pressable onPress={() => onChange(value + 1)}>
        <FontAwesome6 name='chevron-right' size={30} />
      </Pressable>
    </StyledRow>
  );
}

const StyledRow = styled(Row)({
  flex: 1,
  alignSelf: 'stretch',
  gap: 10
})

const Value = styled.Text({
  fontFamily: 'monospace',
  fontSize: 16,
  backgroundColor: colors.white,
  borderRadius: 5,
  padding: 5,
  borderWidth: 1,
})
