import { ColumnPressable, Label, Row } from "components/general/styledTags";
import { format } from "date-fns";
import { useRouter } from "expo-router";
import Dugnad from "models/dugnad";
import styled from "styled-components/native";

export default function DugnadItem({ dugnad }: { dugnad: Dugnad }) {
  const router = useRouter()

  return (
    <ColumnPressable onPress={() => {
      router.navigate({
        pathname: '/dugnadDetails/[id]',
        params: { id: dugnad.id! }
      })
    }}>
      <Label>{dugnad.title}</Label>
      <Label>{format(dugnad.startDateTime, 'dd:MM:yyyy HH:mm')}</Label>
      <Label>{dugnad.requiredPersons}</Label>
    </ColumnPressable>
  );
}

const Body = styled(ColumnPressable)({})
