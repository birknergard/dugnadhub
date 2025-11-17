import { useQuery } from '@tanstack/react-query';
import { IconButton, TextButton } from 'components/general/buttons';
import { Spinner } from 'components/general/spinner';
import { colors, Column, Heading, Label, PlainText, Row, Title } from 'components/general/styledTags';
import { format } from 'date-fns';
import { useLocalSearchParams, useSearchParams } from 'expo-router/build/hooks';
import Dugnad from 'models/dugnad';
import { useState } from 'react';
import { Image, ScrollView } from 'react-native';
import DugnadService from 'services/dugnadService';
import styled from 'styled-components/native';

export default function DugnadDetails({ }: {}) {
  const { id } = useLocalSearchParams();
  const [currentImage, setCurrentImage] = useState(0);

  const { data: dugnad, isLoading } = useQuery({
    queryKey: ['dugnadDetails', id],
    queryFn: async (): Promise<Dugnad | null> => {
      console.log(id);
      return id ? await DugnadService.getDugnadById(id as string) : null
    }
  })

  if (isLoading) return (
    <Main>
      <Spinner />
    </Main>
  );

  return (
    <Main>
      {!dugnad ? (
        <Label>Could not find dugnad</Label>
      ) : (
        <ScrollView style={{ flex: 1, alignSelf: 'stretch' }}>
          <Body>
            <Header>
              <Title>{dugnad.title}</Title>
              <Heading>{dugnad.category}</Heading>
            </Header>
            <Column style={{ gap: 10, alignSelf: 'stretch' }}>
              <ImageSection>
                <DescriptionField>
                  <Heading>Description</Heading>
                  <PlainText>{dugnad.description}</PlainText>
                </DescriptionField>
                {dugnad.images.length > 0 &&
                  <StyledImage source={{ uri: dugnad.images[currentImage] }} resizeMode='cover' />
                }
              </ImageSection>
              <ImageButtons>
                <TextButton
                  color={colors.beige}
                  text='Prev'
                  iconName='caret-left'
                  iconPosition='right'
                  onTap={() => {
                    setCurrentImage(currentImage - 1)
                  }}
                />
                <TextButton
                  color={colors.beige}
                  text='Next'
                  iconName='caret-right'
                  iconPosition='left'
                  onTap={() => {
                    setCurrentImage(currentImage + 1)
                  }}
                />
              </ImageButtons>

            </Column>
            <Section>
              <Heading>Place</Heading>
              <PlainText>{dugnad.address}, {dugnad.postcode} {dugnad.city}</PlainText>
            </Section>
            <Section>
              <Row style={{ alignSelf: 'stretch', justifyContent: 'space-evenly' }}>
                <Column>
                  <Heading>Date</Heading>
                  <PlainText>{format(dugnad.startDateTime.toDate(), "dd MMMM yyyy")}</PlainText>
                </Column>
                <Column>
                  <Heading>Duration</Heading>
                  <PlainText>
                    {`From ${format(dugnad.startDateTime.toDate(), "HH:mm")} to ${format(dugnad.endDateTime.toDate(), "HH:mm")}`}
                  </PlainText>
                </Column>
              </Row>
            </Section>

            <Section>
              <Heading>Registered Volunteers</Heading>
              <Title>{`${dugnad.signedUp.length} of ${dugnad.requiredPersons}`}</Title>
            </Section>

            <VolunteerButton
              text='Volunteer for this Dugnad'
              iconName=''
              iconPosition=''
              color={colors.green}
              onTap={() => { }}
            />
          </Body>
        </ScrollView>
      )}
    </Main>
  );
}

const Main = styled.View({
  flex: 1,
  alignSelf: 'stretch',
  backgroundColor: colors.bg,
  padding: 20,
  paddingTop: 20,
  gap: 20,
  flexDirection: 'column',
  justifyContent: 'start',
  alignItems: 'center',
});


const Body = styled(Column)({
  alignSelf: 'stretch',
  gap: 50,
  marginBottom: 100
})

const Header = styled(Column)({
  alignSelf: 'stretch',
})

const Section = styled(Column)({
  alignSelf: 'stretch',
  gap: 10,
  backgroundColor: colors.yellow,
  padding: 10,
  borderColor: colors.white,
  borderRadius: 15,
  borderWidth: 2,
})

const ImageSection = styled(Column)({
  alignSelf: 'stretch',
  borderColor: colors.white,
  borderRadius: 15,
  borderWidth: 2,
  backgroundColor: colors.yellow,
})

const DescriptionField = styled(Column)({
  alignSelf: 'stretch',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 10,
  borderColor: colors.white,
  borderBottomWidth: 2,
})

const StyledImage = styled.Image({
  alignSelf: 'stretch',
  height: 300,
  borderBottomRightRadius: 15,
  borderBottomLeftRadius: 15,
})

const ImageButtons = styled(Row)({
  alignSelf: 'stretch',
  justifyContent: 'space-between',
  paddingLeft: 50,
  paddingRight: 50,
})

const VolunteerButton = styled(TextButton)({})
