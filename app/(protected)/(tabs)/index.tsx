import { useQuery } from '@tanstack/react-query';
import DugnadItem from 'components/browse/dugnadItem';
import { Spinner } from 'components/general/spinner';
import { Column, Input, PlainText } from 'components/general/styledTags';
import { useFocusEffect } from 'expo-router';
import Dugnad, { getFormattedAddress } from 'models/dugnad';
import { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import Toast from 'react-native-toast-message';
import DugnadService from 'services/dugnadService';
import styled from 'styled-components/native';

export default function Home() {
  const { data: dugnads, isLoading, refetch } = useQuery({
    queryKey: ['dugnads'],
    queryFn: async (): Promise<Dugnad[]> => {
      return await DugnadService.getDugnader()
        .then(r => {
          setDisplayList([...r]);
          return r;
        })
        .catch(e => {
          const errorMessage = 'Feil: kunne ikke hente dugnader';
          Toast.show({
            type: 'error',
            text1: errorMessage
          });
          console.error(e);
          return [];
        })
    },
    enabled: true,
  })

  const [searchQuery, setSearchQuery] = useState('');
  const [displayList, setDisplayList] = useState<Dugnad[]>([]);

  const getFilteredList = (source: Dugnad[], searchQuery: string): Dugnad[] => {
    const query = searchQuery.toLowerCase();
    return source.filter(dugnad => {
      const base = dugnad.title + getFormattedAddress(dugnad).toLowerCase()
      return base.includes(query);
    });
  }
  // Refetches whevener the window appears
  useFocusEffect(
    useCallback(() => {
      refetch()
    }, [])
  );

  useEffect(() => {
    if (!dugnads) return;
    if (searchQuery === '') {
      setDisplayList([...dugnads]);
    } else {
      setDisplayList(getFilteredList(dugnads, searchQuery));
    }
  }, [dugnads, searchQuery]);

  if (isLoading) return (
    <Load>
      <PlainText>Laster inn dugnader ...</PlainText>
      <Spinner />
    </Load>
  );

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
          placeholder='Søk ...'
        />
        <SearchNote>{`${displayList.length} resultater`}</SearchNote>
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

const SearchField = styled(Column)({
  alignItems: 'flex-start'
})

const SearchNote = styled(PlainText)({
  color: '#555555',
  marginLeft: 8,
})

const SearchInput = styled(Input)({
  padding: 10,
  fontSize: 20
})
