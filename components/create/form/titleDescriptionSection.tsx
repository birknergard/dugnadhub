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
      <Input
        onChangeText={(e) => onChangeTitle(e)}
        value={title}
        placeholder="Write a title ..."
      />
      <Label>Please describe your dugnad</Label>
      <InputBox
        onChangeText={(e) => onChangeDescription(e)}
        value={description}
        multiline
        numberOfLines={6}
        placeholder="Write a description ..."
      />
    </>
  );
}

const InputBox = styled(Input)({
  height: 100,
  textAlignVertical: 'top',
}) 
