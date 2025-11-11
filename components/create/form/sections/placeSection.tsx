import { Text, TextInput, View } from "react-native";

export default function PlaceSelection({ address, onAddressChange, postcode, onPostcodeChange }: {
  address: string,
  onAddressChange: (address: string) => void,
  postcode: string,
  onPostcodeChange: (postcode: string) => void
}) {

  const handlePostCodeChange = () => {

  }

  return (
    <>
      <Text className={s.desc}>Address</Text>
      <TextInput
        className={s.text.textField}
        value={address}
        onChangeText={(e) => onAddressChange(e)}
        textContentType="streetAddressLine2"
      />
      <Text>Postcode</Text>
      <View className={s.postcode.container}>
        <TextInput
          className={`${s.text.textField} w-14`}
          value={postcode}
          onChangeText={(e) => onPostcodeChange(e)}
          textContentType="postalCode"
          keyboardType='number-pad'
          inputMode="numeric"
        />
        <Text>City</Text>
      </View>
    </>
  );
}

const s = {
  desc: 'text-md text-white font-bold',
  text: {
    title: 'text-md font-bold',
    desc: 'text-sm',
    textField: 'text-md rounded-md bg-dugnad-white p-2',
  },
  postcode: {
    container: 'flex flex-row items-center justify-center gap-2',
  }
};
