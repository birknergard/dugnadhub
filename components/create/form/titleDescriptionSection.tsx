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
      <Label>Gi din dugnad en passende tittel</Label>
      <Input
        onChangeText={(e) => onChangeTitle(e)}
        value={title}
        placeholder="Skriv din tittel ..."
      />
      <Label>Beskriv din dugnad</Label>
      <InputBox
        onChangeText={(e) => onChangeDescription(e)}
        value={description}
        multiline
        numberOfLines={6}
        placeholder="Beskriv dugnaden ..."
      />
    </>
  );
}

const InputBox = styled(Input)({
  height: 100,
  textAlignVertical: 'top',
}) 
