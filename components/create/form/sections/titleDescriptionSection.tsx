import { Column, Input, Label } from 'components/general/styledTags';
import styled from 'styled-components/native';

export default function TitleAndDescriptionSelection({
  title,
  onChangeTitle,
  description,
  onChangeDescription,
}: {
  title: string;
  onChangeTitle: (e: string) => void;
  description: string;
  onChangeDescription: (e: string) => void;
}) {
  return (
    <>
      <Label>Please create a fitting title for your dugnad</Label>
      <StyledInput
        onChangeText={(e) => onChangeTitle(e)}
        value={title}
        placeholder="Write a title ..."
      />
      <Label>Please describe your dugnad</Label>
      <StyledInput
        onChangeText={(e) => onChangeDescription(e)}
        value={description}
        multiline={true}
        numberOfLines={4}
        placeholder="Write a description ..."
      />
    </>
  );
}

const StyledInput = styled(Input)({
  width: 'max-content'
}) 
