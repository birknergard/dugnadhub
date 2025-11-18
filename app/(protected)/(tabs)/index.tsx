import { useQuery } from '@tanstack/react-query';
import DugnadItem from 'components/browse/dugnadItem';
import { TextButton } from 'components/general/buttons';
import { Spinner } from 'components/general/spinner';
import { Column, Input, PlainText, SmallTitle, Title } from 'components/general/styledTags';
import { useFocusEffect } from 'expo-router';
import Dugnad from 'models/dugnad';
import { useCallback, useEffect, useState } from 'react';
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

  const [searchQuery, setSearchQuery] = useState('');
  const [displayList, setDisplayList] = useState<Dugnad[]>([]);

  if (isLoading) return (
    <Load>
      <PlainText>Loading ...</PlainText>
      <Spinner />
    </Load>
  );

  const getFilteredList = (source: Dugnad[], searchQuery: string): Dugnad[] => {
    return source.filter(dugnad => {
      return dugnad.title.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }

  useEffect(() => {
    if (!dugnads) return;

    if (searchQuery === '') {
      setDisplayList([...dugnads])
    } else {
      setDisplayList(getFilteredList(dugnads, searchQuery));
    }
  }, [dugnads, searchQuery])

  return (
    <Main>
      <FlatList
        data={displayList}
        renderItem={dugnad => <DugnadItem dugnad={dugnad.item} />}
        keyExtractor={item => item.id!}
        contentContainerStyle={{ gap: 20 }}
        style={{ marginTop: 30 }}
      />
      <SearchField>
        <SearchInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder='Search by title ...'
        />
      </SearchField>
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
  paddingBottom: 50,
  gap: 30,
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'stretch'
});

const DugnadList = styled(FlatList)({
  gap: 10,
})

const SearchField = styled(Column)({
  alignItems: 'flex-start'
})

const SearchInput = styled(Input)({
  padding: 10,
  fontSize: 20
})
