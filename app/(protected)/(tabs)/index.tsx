import { useQuery } from '@tanstack/react-query';
import { TextButton } from 'components/general/buttons';
import { Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import DugnadService from 'services/dugnadService';
import styled from 'styled-components/native';

export default function Home() {
  const { data: dugnads, isLoading } = useQuery({
    queryKey: ['dugnads'],
    queryFn: async () => {
      return await DugnadService.getDugnader()
        .then(r => {
          console.log(r);
          return r
        })
        .catch(e => {
          const errorMessage = 'Error when retrieving dugnads.';
          Toast.show({
            type: 'error',
            text1: errorMessage
          });
          console.error(e);
        })
    }
  })

  return (
    <Main>
    </Main>
  );
}

const Main = styled.View({
  flex: 1,
  backgroundColor: '#e4e3d5',
  padding: 20,
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'stretch'
});

