import { Column, Heading, Input, Label, PlainText, Row } from "components/general/styledTags";
import { Text, TextInput, View } from "react-native";
import styled from "styled-components/native";
import { useQuery } from "@tanstack/react-query";
import GeocodingService from "services/geocodingService";

export default function PlaceSelection({ address, onAddressChange, postcode, onPostcodeChange, setCity }: {
  address: string,
  onAddressChange: (address: string) => void,
  postcode: string,
  onPostcodeChange: (postcode: string) => void
  setCity: (city: string) => void
}) {

  // Using tanstack@query for seamless refetch logic and clean code
  const { data: city } = useQuery({
    queryKey: ['cityByPostCode', postcode, setCity],
    queryFn: () => postcode.length === 4 ? GeocodingService.getCityByPostcode(postcode)
      .then(city => {
        if (city) {
          setCity(city);
          return city;
        }
      }) : null
  })

  return (
    <Column style={{ gap: 10 }}>
      <Label>Skriv inn addressen der dugnaden skal holdes</Label>
      <Input
        value={address}
        onChangeText={(e) => onAddressChange(e)}
        textContentType="streetAddressLine2"
        placeholder="Skriv addressen ..."
      />
      <Label>Postkode og by</Label>
      <StyledRow>
        <StyledInput
          value={postcode}
          onChangeText={(e) => onPostcodeChange(e)}
          textContentType="postalCode"
          keyboardType='number-pad'
          inputMode="numeric"
          placeholder="eks. 5050"
        />
        <PlainText>{city ?? ''}</PlainText>
      </StyledRow>
    </Column>
  );
}

const StyledRow = styled(Row)({
  alignSelf: 'flex-start',
  gap: 10
})

const StyledInput = styled(Input)({
  width: 100
})
