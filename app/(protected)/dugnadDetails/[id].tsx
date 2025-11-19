import { useQuery } from '@tanstack/react-query';
import CommentSection from 'components/details/commentSection';
import { IconButton, TextButton } from 'components/general/buttons';
import DugnadView from 'components/general/dugnadView';
import { Spinner } from 'components/general/spinner';
import { colors, Column, Heading, Label, PlainText, Row, Title } from 'components/general/styledTags';
import { format } from 'date-fns';
import { useLocalSearchParams, useSearchParams } from 'expo-router/build/hooks';
import Dugnad, { getFormattedAddress } from 'models/dugnad';
import { useAuthSession } from 'providers/authSessionProvider';
import { useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import Toast from 'react-native-toast-message';
import DugnadService from 'services/dugnadService';
import styled from 'styled-components/native';

export default function DugnadDetails({ }: {}) {
  const { id } = useLocalSearchParams();
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
            text1: `Du er avmeldt dugnaden ${dugnad!.title}`
          })
        }
        setErrorMessage(`Feil: kunne ikke melde deg av dugnaden ${dugnad!.title}`);
      });
    refetch();
  }
  const volunteer = async () => {
    await DugnadService.registerVolunteerOnDugnad(userId, dugnad!.id!)
      .then(r => {
        if (r) {
          Toast.show({
            type: 'success',
            text1: `Du er påmeldt på dugnaden ${dugnad!.title}`
          })
        }
        setErrorMessage(`Feil: kunne ikke melde deg av ${dugnad!.title}`);
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
            <DugnadView dugnad={dugnad} />
            {dugnad.signedUp.includes(userId) ? (
              <TextButton
                text='Meld deg på'
                iconName=''
                iconPosition=''
                color={colors.red}
                onTap={async () => {
                  await withdraw();
                }}
              />
            ) : (
              <TextButton
                text='Meld deg av'
                iconName=''
                iconPosition=''
                color={colors.green}
                onTap={async () => {
                  await volunteer();
                }}
              />
            )}
            <CommentSection dugnadId={dugnad.id!} />
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
