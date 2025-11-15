import { Pressable, Text } from 'react-native';
import '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { colors, DugnadColors, Label } from './styledTags';
import styled from 'styled-components/native';

// In Javascript because FontAwesome6 was giving annoying errors for acceptable names

export function IconButton({ iconName, onTap }) {
  return (
    <StyledIconButton onPress={onTap}>
      <FontAwesome6 name={iconName} size={30} />
    </StyledIconButton>
  );
}

export function TextButton({ text, iconName, onTap, iconPosition, color }) {
  const icon = <FontAwesome6 name={iconName} size={20} />;
  return (
    <StyledButton $color={color} onPress={onTap}>
      {iconName && iconPosition == 'right' && icon}
      <ButtonLabel>{text}</ButtonLabel>
      {iconName && iconPosition == 'left' && icon}
    </StyledButton>
  );
}

const StyledButton = styled.Pressable < { $color } > `
  background-color: ${props => props.$color};
  padding: 10px;
  border-radius: 10px;
  flex-direction: row;
  gap: 10px;
  justify-self: stretch;
  justify-content: center;
  align-items: center;
`

const ButtonLabel = styled(Label)({
  fontSize: 22,
  textAlign: 'center'
})

const StyledIconButton = styled(StyledButton)`
  border-radius: 50px;
`
