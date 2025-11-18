import { FontAwesome6 } from "@expo/vector-icons";
import { colors, Column, ColumnPressable, Heading, Label, PlainText, Row, RowPressable, SmallTitle } from "components/general/styledTags";
import { format } from "date-fns";
import { useRouter } from "expo-router";
import Dugnad from "models/dugnad";
import styled from "styled-components/native";

export default function DugnadItem({ dugnad }: { dugnad: Dugnad }) {
  const router = useRouter()

  return (
    <Body $isFull={dugnad.requiredPersons <= dugnad.signedUp.length} onPress={() => {
      router.navigate({
        pathname: '/dugnadDetails/[id]',
        params: { id: dugnad.id }
      })
    }}>
      <TextColumn>
        <SmallTitle>{dugnad.title}</SmallTitle>
        <PlainText>{`${dugnad.address}, ${dugnad.postcode} ${dugnad.city}`}</PlainText>
        <PlainText>{format(dugnad.startDateTime.toDate(), 'd MMMM yyyy')}</PlainText>
      </TextColumn>
      <Column>
        <FontAwesome6 name={'plus'} size={20} />
        <Label>{`${dugnad.signedUp.length}/${dugnad.requiredPersons}`}</Label>
      </Column>
    </Body>
  );
}

const Body = styled(RowPressable)<{ $isFull: boolean }>(props => ({
  backgroundColor: props.$isFull ? colors.red : colors.green,
  alignSelf: 'stretch',
  justifyContent: 'space-between',

  borderWidth: 2,
  borderColor: colors.white,
  borderRadius: 15,
  padding: 20,
}))

const TextColumn = styled(Column)({
  alignItems: 'flex-start',
  gap: 3,
})
