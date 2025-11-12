import styled from "styled-components/native";

export const colors = {
  yellow: '#FCE1AC',
  pink: '#F5AFBF',
  green: '#BBE19D',
  red: '#F77563',
  white: '#F1F5FD',
  beige: '#F8CF82',
  bg: '#E4E3D5',
}

export const Column = styled.View({
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
})

export const Row = styled.View({
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
})

export const Input = styled.TextInput({
  fontFamily: 'monospace',
  fontSize: 16,
  flex: 1,
  alignSelf: 'stretch',
  backgroundColor: colors.white,
  borderRadius: 5,
  padding: 5,
  borderWidth: 1,
})

export const Title = styled.Text({
  fontFamily: 'sans-serif',
  fontWeight: 600,
  fontSize: 30
})

export const Label = styled.Text({
  flex: 1,
  alignSelf: 'stretch',
  fontFamily: 'sans-serif',
  fontWeight: 600,
  fontSize: 20
})

export const Heading = styled.Text({
  flex: 1,
  alignSelf: 'stretch',
  fontSize: 18,
  fontWeight: 700
})

export const PlainText = styled.Text({
  fontSize: 16
})
