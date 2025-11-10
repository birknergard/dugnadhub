import { createConstants } from 'constants/create';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';

export default function FormSection({ step }: { step: number }) {

  return (
    <Main>
      {createConstants.sections.map((section, i) => (
        step === i + 1 && (
          <>
            <Text className={s.section.title}>{section.title}</Text>
            <Text className={s.section.description}>{section.description}</Text>
          </>
        )
      ))}
    </Main>
  );
}

const Main = styled.View`
  display: flex;
  flex-direction: column;
  justify-center: center;
  align-items: center;
`;

const s = {
  section: {
    title: 'text-3xl text-dugnad-red font-bold',
    description: 'text-lg'
  }
}
