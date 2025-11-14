import styled from 'styled-components/native';

export default function DugnadDetails({}: {}) {
  return <Main></Main>;
}

const Main = styled.View({
  flex: 1,
  alignSelf: 'stretch',
  backgroundColor: '#e4e3d5',
  padding: 20,
  paddingTop: 40,
  gap: 20,
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
});
