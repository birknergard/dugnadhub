import { Column, PlainText } from "components/general/styledTags";
import Dugnad from "models/dugnad";
import { ScrollView } from "react-native";
import styled from "styled-components/native";

export default function PreviewDugnad({ dugnad }: { dugnad?: Dugnad }) {
  return (
    <StyledScrollableColumn>
      <Column>
        {Array.from<number>({ length: 100 }).map((_, index) => (
          <PlainText key={index}>{'world ' + index}</PlainText>
        ))}
      </Column>
    </StyledScrollableColumn>
  );
}

const StyledScrollableColumn = styled(ScrollView)({
  flex: 1,
  alignSelf: 'stretch',
})

