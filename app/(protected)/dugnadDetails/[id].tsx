import { useQuery } from '@tanstack/react-query';
import CommentSection from 'components/details/commentSection';
import { IconButton, TextButton } from 'components/general/buttons';
import DugnadView from 'components/general/dugnadView';
import { Spinner } from 'components/general/spinner';
import { colors, Column, Heading, Label, PlainText, Row, Title } from 'components/general/styledTags';
import { format } from 'date-fns';
import { useLocalSearchParams, useSearchParams } from 'expo-router/build/hooks';
import useToast from 'hooks/useToast';
import Dugnad, { getFormattedAddress } from 'models/dugnad';
import { useAuthSession } from 'providers/authSessionProvider';
import { useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import DugnadService from 'services/dugnadService';
import styled from 'styled-components/native';

export default function DugnadDetails({ }: {}) {
  const { id } = useLocalSearchParams();
  const userSession = useAuthSession();
  const userId = userSession.user!.email!

  const { toastSuccess, toastError } = useToast();

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
          toastSuccess(`Du er avmeldt dugnaden ${dugnad!.title}`);
          return;
        }
        toastError(`Feil: kunne ikke melde deg av dugnaden ${dugnad!.title}`);
      });
    refetch();
  }
  const volunteer = async () => {
    await DugnadService.registerVolunteerOnDugnad(userId, dugnad!.id!)
      .then(r => {
        if (r) {
          toastSuccess(`Du er påmeldt på dugnaden ${dugnad!.title}`);
          return
        }
        toastError(`Feil: kunne ikke melde deg av ${dugnad!.title}`);
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
        <ScrollView style={{ flex: 1, alignSelf: 'stretch' }}>
          <Body>
            <DugnadView dugnad={dugnad} />
            {dugnad.signedUp.includes(userId) ? (
              <TextButton
                text='Meld deg av'
                iconName=''
                iconPosition=''
                color={colors.red}
                onTap={async () => {
                  await withdraw();
                }}
              />
            ) : (
              <TextButton
                text='Meld deg på'
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
      )}
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

const StyledDugnadView = styled(DugnadView)({})

const Body = styled(Column)({
  alignSelf: 'stretch',
  flexGrow: 1,
  gap: 50,
  marginBottom: 100
})
