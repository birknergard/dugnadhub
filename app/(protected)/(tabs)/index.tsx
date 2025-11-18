import { useQuery } from '@tanstack/react-query';
import DugnadItem from 'components/browse/dugnadItem';
import { TextButton } from 'components/general/buttons';
import { Spinner } from 'components/general/spinner';
import { Column, PlainText } from 'components/general/styledTags';
import { useFocusEffect } from 'expo-router';
import Dugnad from 'models/dugnad';
import { useCallback, useEffect } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import DugnadService from 'services/dugnadService';
import styled from 'styled-components/native';

export default function Home() {
  const { data: dugnads, isLoading, refetch } = useQuery({
    queryKey: ['dugnads'],
    queryFn: async (): Promise<Dugnad[]> => {
      return await DugnadService.getDugnader()
        .then(r => r)
        .catch(e => {
          const errorMessage = 'Error when retrieving dugnads.';
          Toast.show({
            type: 'error',
            text1: errorMessage
          });
          console.error(e);
          return [];
        })
    },
    enabled: true
  })
  // Refetches whevener the window appears
  useFocusEffect(
    useCallback(() => {
      refetch()
    }, [])
  );

  if (isLoading) return (
    <Load>
      <PlainText>Loading ...</PlainText>
      <Spinner />
    </Load>
  );

  return (
    <Main>
      <FlatList
        data={dugnads}
        renderItem={dugnad => <DugnadItem dugnad={dugnad.item} />}
        keyExtractor={item => item.id!}
        contentContainerStyle={{ gap: 20 }}
      />
    </Main>
  );
}
const Load = styled(Column)({
  flex: 1
})


const Main = styled.View({
  flex: 1,
  backgroundColor: '#e4e3d5',
  padding: 20,
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'stretch'
});

const DugnadList = styled(FlatList)({
  gap: 10,
})
