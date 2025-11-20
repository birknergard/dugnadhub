import { FontAwesome6 } from "@expo/vector-icons";
import { colors, Column, ColumnPressable, Heading, Label, PlainText, Row, RowPressable, SmallTitle } from "components/general/styledTags";
import { format } from "date-fns";
import { useRouter } from "expo-router";
import Dugnad, { getDugnadCategory } from "models/dugnad";
import styled from "styled-components/native";

export default function DugnadItem({ dugnad, showImage }: { dugnad: Dugnad, showImage?: boolean }) {
  const router = useRouter();

  return (
    <Main $isFull={dugnad.requiredPersons <= dugnad.signedUp.length} onPress={() => {
      router.navigate({
        pathname: '/dugnadDetails/[id]',
        params: { id: dugnad.id }
      })
    }}>

      {(showImage && dugnad.images.length > 0) &&
        <ImageSection>
          <StyledImage source={{ uri: dugnad.images[0] }} />
        </ImageSection>
      }

      <ContentRow>
        <TextColumn>
          <Heading>{dugnad.title}</Heading>
          <PlainText>{`${dugnad.address}, ${dugnad.postcode} ${dugnad.city}`}</PlainText>
          <PlainText>{format(dugnad.startDateTime.toDate(), 'd MMMM yyyy')}</PlainText>
        </TextColumn>
        <RightColumn>
          <FontAwesome6 name={getDugnadCategory(dugnad)!.iconName} size={28} />
          <SmallTitle>{`${dugnad.signedUp.length} / ${dugnad.requiredPersons}`}</SmallTitle>
        </RightColumn>
      </ContentRow>
    </Main>
  );
}

const Main = styled(ColumnPressable)<{ $isFull: boolean }>(props => ({
  backgroundColor: props.$isFull ? colors.red : colors.green,
  alignSelf: 'stretch',
  justifyContent: 'space-between',

  borderWidth: 2,
  borderColor: colors.white,
  borderRadius: 15,
}))

const ContentRow = styled(Row)({
  alignSelf: 'stretch',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 20,
})

const RightColumn = styled(Column)({
  alignSelf: 'stretch',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
})

const TextColumn = styled(Column)({
  alignItems: 'flex-start',
  gap: 3,
})

const ImageSection = styled(Column)({
  alignSelf: 'stretch',
  borderBottomTopLeftRadius: 15,
  borderBottomTopRightRadius: 15,
})

const StyledImage = styled.Image({
  alignSelf: 'stretch',
  height: 200,
  borderTopLeftRadius: 15,
  borderTopRightRadius: 15,
})
