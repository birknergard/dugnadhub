import styled from "styled-components/native";

export interface DugnadColors {
  yellow: string,
  pink: string,
  green: string,
  red: string,
  white: string,
  beige: string,
  bg: string,
  black: string,
}

export const colors: DugnadColors = {
  yellow: '#FCE1AC',
  pink: '#F5AFBF',
  green: '#BBE19D',
  red: '#F77563',
  white: '#F1F5FD',
  beige: '#F8CF82',
  bg: '#E4E3D5',
  black: '#000000',
}

export const Column = styled.View({
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
})

export const ColumnPressable = styled.Pressable({
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
})

export const Row = styled.View({
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
})

export const RowPressable = styled.Pressable({
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
})

export const Input = styled.TextInput({
  fontFamily: 'monospace',
  fontSize: 16,
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

export const SmallTitle = styled.Text({
  fontFamily: 'sans-serif',
  fontWeight: 500,
  fontSize: 25
})

export const Label = styled.Text({
  fontFamily: 'sans-serif',
  fontWeight: 600,
  fontSize: 18
})

export const Heading = styled.Text({
  fontFamily: 'sans-serif',
  fontSize: 18,
  fontWeight: 700
})

export const PlainText = styled.Text({
  fontFamily: 'sans-serif',
  fontSize: 16,
})
