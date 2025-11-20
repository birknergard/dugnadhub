import Dugnad, { getDugnadCategory, getFormattedAddress } from "models/dugnad";
import { colors, Column, Heading, PlainText, Row, SmallTitle, Title } from "./styledTags";
import styled from "styled-components/native";
import { TextButton } from "./buttons";
import { View } from "react-native";
import { format } from "date-fns";
import { useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";

export default function DugnadView({ dugnad, preview }: { dugnad: Dugnad, preview?: boolean }) {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <Body>
      <Header>
        <SmallTitle>{dugnad.title}</SmallTitle>
        <Row>
          <Heading>{dugnad.category}</Heading>
          <FontAwesome6 name={getDugnadCategory(dugnad)!.iconName} size={25} />
        </Row>
      </Header>
      <Column style={{
        gap: 5,
        padding: 10,
        alignSelf: 'stretch',
        backgroundColor: preview ? colors.yellow : colors.white,
        borderRadius: 15,
        borderWidth: 2,
      }}>
        <Section>
          <Heading>Beskrivelse</Heading>
          <PlainText>{dugnad.description.trimEnd()}</PlainText>
        </Section>
        <Section>
          <Row style={{ alignSelf: 'stretch', justifyContent: 'space-evenly' }}>
            <Column>
              <Heading>Dato</Heading>
              <PlainText>{format(dugnad.startDateTime.toDate(), "dd MMMM yyyy")}</PlainText>
            </Column>
            <Column>
              <Heading>Varighet</Heading>
              <PlainText>{`Fra ${format(dugnad.startDateTime.toDate(), "HH:mm")} til ${format(dugnad.endDateTime.toDate(), "HH:mm")}`}</PlainText>
            </Column>
          </Row>
        </Section>
        <Section>
          <Heading>Arbeidsoppgaver</Heading>
          <Column>
            {dugnad.taskList.map((task, i) => (
              <PlainText key={i}>{`${i + 1}. ${task}`}</PlainText>
            ))}
          </Column>
        </Section>
        <Section>
          <Heading>Sted</Heading>
          <PlainText>{getFormattedAddress(dugnad)}</PlainText>
        </Section>
      </Column>
      <ImageSection>
        {dugnad.images.length > 0 &&
          <StyledImage source={{ uri: dugnad.images[currentImage] }} resizeMode='cover' />
        }
      </ImageSection>
      {dugnad.images.length > 0 &&
        <ImageButtons>
          {(0 < currentImage && currentImage <= dugnad.images.length - 1) &&
            <TextButton
              color={colors.beige}
              text='Prev'
              iconName='caret-left'
              iconPosition='right'
              onTap={() => {
                setCurrentImage(currentImage - 1)
              }}
            />
          }
          <View style={{ flexGrow: 1 }} />
          {(0 <= currentImage && currentImage < dugnad.images.length - 1) &&
            <TextButton
              color={colors.beige}
              text='Next'
              iconName='caret-right'
              iconPosition='left'
              onTap={() => {
                setCurrentImage(currentImage + 1)
              }}
            />
          }
        </ImageButtons>
      }
      <Section>
        <Heading>Påmeldte</Heading>
        <Title>{`${dugnad.signedUp.length} av ${dugnad.requiredPersons}`}</Title>
      </Section>
    </Body>
  );
}

const Body = styled(Column)({
  flexGrow: 1,
  alignSelf: 'stretch',
  gap: 20,
})

const Header = styled(Column)({
  alignSelf: 'stretch',
})

const Section = styled(Column)({
  alignSelf: 'stretch',
  borderColor: colors.white,
  padding: 10,
})

const ImageSection = styled(Column)({
  alignSelf: 'stretch',
})

const StyledImage = styled.Image({
  alignSelf: 'stretch',
  height: 300,
  borderRadius: 15,
  borderBottomRightRadius: 15,
  borderBottomLeftRadius: 15,
})

const ImageButtons = styled(Row)({
  alignSelf: 'stretch',
  justifyContent: 'space-between',
  paddingLeft: 50,
  paddingRight: 50,
})
