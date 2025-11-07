import { Text, View } from 'react-native';
import styled from 'styled-components/native';

export default function FormSection({ step }: { step: number }) {
  return (
    <Main>
      <Text>hello</Text>
    </Main>
  );
}

const Main = styled.View`
  display: flex;
  flex-direction: column;
  justify-center: center;
  align-items: center;
`;
