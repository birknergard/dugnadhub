import Dugnad, { getDugnadCategory, getFormattedAddress } from "models/dugnad";
import { colors, Column, Heading, Label, PlainText, Row, SmallTitle, Title } from "./styledTags";
import styled from "styled-components/native";
import { TextButton } from "./buttons";
import { View } from "react-native";
import { format } from "date-fns";
import { useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import UserService from "services/userService";
import UserInfo from "models/user";

export default function DugnadView({ dugnad, preview }: { dugnad: Dugnad, preview?: boolean }) {
  const [currentImage, setCurrentImage] = useState(0);
  const { data: volunteers, refetch } = useQuery({
    queryKey: ['volunteers'],
    queryFn: async (): Promise<UserInfo[]> => {
      try {
        const requests = dugnad.signedUp.map(userId => UserService.getUser(userId));
        const results = await Promise.all(requests);

        return results.filter(Boolean) as UserInfo[];
      } catch (e: any) {
        console.error("Could not fetch dugnads:", e);
        return [];
      }
    }
  })

  return (
    <Body>
      <Header>
        <SmallTitle>{dugnad.title}</SmallTitle>
        <CategoryRow>
          <Heading>{dugnad.category}</Heading>
          <FontAwesome6 name={getDugnadCategory(dugnad)!.iconName} size={25} />
        </CategoryRow>
      </Header>
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
              text='Forrige bilde'
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
              text='Neste bilde'
              iconName='caret-right'
              iconPosition='left'
              onTap={() => {
                setCurrentImage(currentImage + 1)
              }}
            />
          }
        </ImageButtons>
      }

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
          <Row style={{ alignSelf: 'stretch', justifyContent: 'space-between' }}>
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

      {!preview &&
        <Section>
          <Title>{`${dugnad.signedUp.length} av ${dugnad.requiredPersons}`}</Title>
          <Heading>Påmeldte</Heading>
          <Column>
            {volunteers && volunteers.map(volunteer => (
              <PlainText key={volunteer.dateCreated.valueOf()}>{`${volunteer.firstName} ${volunteer.lastName}`}</PlainText>
            ))}
          </Column>
        </Section>
      }
    </Body>
  );
}

const Body = styled(Column)({
  flexGrow: 1,
  alignSelf: 'stretch',
  paddingLeft: 10,
  paddingRight: 10,
  gap: 20,
})

const Header = styled(Column)({
  alignSelf: 'stretch',
})

const CategoryRow = styled(Row)({
  gap: 10,
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
  paddingLeft: 5,
  paddingRight: 5,
})
