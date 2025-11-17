import { useQuery } from '@tanstack/react-query';
import { IconButton, TextButton } from 'components/general/buttons';
import { Spinner } from 'components/general/spinner';
import { colors, Column, Heading, Label, PlainText, Row, Title } from 'components/general/styledTags';
import { format } from 'date-fns';
import { useLocalSearchParams, useSearchParams } from 'expo-router/build/hooks';
import Dugnad from 'models/dugnad';
import { useAuthSession } from 'providers/authSessionProvider';
import { useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import Toast from 'react-native-toast-message';
import DugnadService from 'services/dugnadService';
import styled from 'styled-components/native';

export default function DugnadDetails({ }: {}) {
  const { id } = useLocalSearchParams();
  const [currentImage, setCurrentImage] = useState(0);
  const userId = useAuthSession().user!.uid;
  const [errorMessage, setErrorMessage] = useState('');

  const { data: dugnad, isLoading, refetch } = useQuery({
    queryKey: ['dugnadDetails', id],
    queryFn: async (): Promise<Dugnad | null> => {
      console.log(id);
      return id ? await DugnadService.getDugnadById(id as string) : null
    },
  })

  const withdraw = async () => {
    await DugnadService.removeVolunteerFromDugnad(userId, dugnad!.id!)
      .then(r => {
        if (r) {
          Toast.show({
            type: 'success',
            text1: `You withdrew from ${dugnad!.title}`
          })
        }
        setErrorMessage(`Error: could not remove registration for ${dugnad!.title}`);
      });
    refetch();
  }
  const volunteer = async () => {
    await DugnadService.registerVolunteerOnDugnad(userId, dugnad!.id!)
      .then(r => {
        if (r) {
          Toast.show({
            type: 'success',
            text1: `You volunteered for ${dugnad!.title}`
          })
        }
        setErrorMessage(`Error: could not volunteer for ${dugnad!.title}`);
      });
    refetch();
  }

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
        <ScrollView style={{ flex: 1, alignSelf: 'stretch', padding: 20 }}>
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
                  <View></View>
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

            {dugnad.signedUp.includes(userId) ? (
              <TextButton
                text='Withdraw from event'
                iconName=''
                iconPosition=''
                color={colors.red}
                onTap={async () => {
                  await withdraw();
                }}
              />
            ) : (
              <TextButton
                text='Volunteer for this Dugnad'
                iconName=''
                iconPosition=''
                color={colors.green}
                onTap={async () => {
                  await volunteer();
                }}
              />
            )}
          </Body>
        </ScrollView>
      )
      }
    </Main >
  );
}

const Main = styled.View({
  flex: 1,
  alignSelf: 'stretch',
  backgroundColor: colors.bg,
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
