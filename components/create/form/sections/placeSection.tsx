import { Heading, Input, Label, PlainText, Row } from "components/general/styledTags";
import { Text, TextInput, View } from "react-native";
import styled from "styled-components/native";
import { useQuery } from "@tanstack/react-query";
import GeocodingService from "services/geocodingService";

export default function PlaceSelection({ address, onAddressChange, postcode, onPostcodeChange }: {
  address: string,
  onAddressChange: (address: string) => void,
  postcode: string,
  onPostcodeChange: (postcode: string) => void
}) {

  const { data: city } = useQuery({
    queryKey: ['cityByPostCode', postcode],
    queryFn: () => {
      if (postcode.length === 4) {
        return GeocodingService.getCityByPostcode(postcode)
          .then(r => r)
          .catch(e => {
            console.error("API Error: ", e);
            return null;
          })
      } else return null
    }
  })

  return (
    <>
      <Label>Please provide an Address</Label>
      <Input
        value={address}
        onChangeText={(e) => onAddressChange(e)}
        textContentType="streetAddressLine2"
        placeholder="Write the address line ..."
      />
      <Label>Please provide Postcode and City</Label>
      <StyledRow>
        <StyledInput
          value={postcode}
          onChangeText={(e) => onPostcodeChange(e)}
          textContentType="postalCode"
          keyboardType='number-pad'
          inputMode="numeric"
          placeholder="ex.5050"
        />
        <PlainText>{city ?? 'Your city will appear here'}</PlainText>
      </StyledRow>
    </>
  );
}

const StyledRow = styled(Row)({
  alignSelf: 'flex-start',
  gap: 10
})

const StyledInput = styled(Input)({
  width: 100
})
