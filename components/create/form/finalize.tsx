import { TextButton } from "components/general/buttons";
import { colors, Column, PlainText, Row } from "components/general/styledTags";
import DugnadForm from "./dugnadForm";
import { createConstants } from "constants/createConstants";
import { ScrollView, Text } from "react-native";
import styled from "styled-components/native";
import Dugnad from "models/dugnad";
import DugnadView from "components/general/dugnadView";

export default function Finalize({ dugnad }: { dugnad: Dugnad }) {
  return (
    <PreviewContainer>
      <StyledScrollView>
        <DugnadView dugnad={dugnad} preview={true} />
      </StyledScrollView>
    </PreviewContainer>
  );
}

const PreviewContainer = styled(Column)({
  flexGrow: 1,
  alignSelf: 'stretch',
})

const StyledScrollView = styled(ScrollView)({
  flex: 1,
  alignSelf: 'stretch',
})

