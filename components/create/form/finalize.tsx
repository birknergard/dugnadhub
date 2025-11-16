import { TextButton } from "components/general/buttons";
import { colors, Column, PlainText, Row } from "components/general/styledTags";
import DugnadForm from "./dugnadForm";
import { createConstants } from "constants/createConstants";
import { ScrollView } from "react-native";
import styled from "styled-components/native";

export default function Finalize({ }: {}) {
  return (
    <PreviewContainer>
      <StyledScrollView>
        {Array.from<number>({ length: 300 }).map((_, index) => (
          <PlainText key={index}>Preview goes here {index}</PlainText>
        ))}
      </StyledScrollView>
    </PreviewContainer>
  );
}

const PreviewContainer = styled(Column)({
  flexGrow: 1,
  alignSelf: 'stretch',
})

const StyledScrollView = styled(ScrollView)({
  maxHeight: 620,
  alignSelf: 'stretch'
})

