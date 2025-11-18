import { FontAwesome6 } from "@expo/vector-icons";
import { colors, Row } from "./styledTags";
import styled from "styled-components/native";
import { Pressable } from "react-native";

export default function NumberInput({ min, max, value, suffix, onChange }: {
  value: number,
  suffix?: string,
  onChange: (value: number) => void
  min?: number,
  max?: number,
}) {
  return (
    <StyledRow>
      <Pressable onPress={() => {
        if (min && value - 1 < min) {
          return
        }
        onChange(value - 1)
      }}>
        <FontAwesome6 name='caret-left' size={25} />
      </Pressable>

      <Value>{value + ` ${suffix}`}</Value>

      <Pressable onPress={() => {
        if (max && value + 1 > max) {
          return
        }
        onChange(value + 1)
      }}>
        <FontAwesome6 name='caret-right' size={25} />
      </Pressable>
    </StyledRow>
  );
}

const StyledRow = styled(Row)({
  gap: 10
})

const Value = styled.Text({
  fontFamily: 'monospace',
  fontSize: 16,
  backgroundColor: colors.white,
  borderRadius: 5,
  paddingTop: 5,
  paddingBottom: 5,
  paddingLeft: 7,
  paddingRight: 7,
  borderWidth: 1,
})
