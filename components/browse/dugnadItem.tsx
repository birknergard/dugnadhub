import { Label, Row } from "components/general/styledTags";
import styled from "styled-components/native";

export default function DugnadItem({ }: {}) {
  return (
    <Body>
      <Label>Item goes here</Label>
    </Body>
  );
}

const Body = styled(Row)({})
