import { colors, Column, Heading, Label, PlainText, Row } from "components/general/styledTags";
import { FlatList, Image, StyleSheet, Text } from "react-native";
import { CameraView } from "expo-camera";
import { launchImageLibraryAsync, MediaTypeOptions, useCameraPermissions } from "expo-image-picker";
import { useEffect, useRef, useState } from "react";
import { IconButton, TextButton } from "components/general/buttons";
import styled from "styled-components/native";

export default function ImageUploader({ triggerExit, setImage }: {
  triggerExit: () => void;
  setImage: (image: string) => void;
}) {
  const cameraRef = useRef<CameraView | null>(null)
  const [permission, requestPermission] = useCameraPermissions();
  const [mode, setMode] = useState<| 'camera' | 'picker' | null>(null)

  const captureImage = async () => {
    const photo = await cameraRef.current?.takePictureAsync();
    if (photo?.uri) {
      setImage(photo.uri);
      triggerExit();
    }
  }

  const pickImage = async () => {
    let result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsEditing: true,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uris = result.assets.map((a) => a.uri);
      setImage(uris[0]);
      triggerExit();
    };
  }


  if (mode === 'camera') return (
    <Column>
      <CameraContainer>
        {(!permission?.granted) ? (
          <Column>
            <PlainText>Appen trenger tillatelse for å bruke kamera</PlainText>
          </Column>
        ) : (
          <StyledCamera
            style={StyleSheet.absoluteFill}
            ref={cameraRef}
            facing="back"
          />
        )}
      </CameraContainer>
      <CameraButtons>
        <TextButton color={colors.yellow} text='Cancel' onTap={() => {
          setMode(null)
        }} iconName='' iconPosition='' />
        {(permission?.granted) &&
          <IconButton iconName="camera" onTap={async () => await captureImage()} size={30} color={colors.green} />
        }
      </CameraButtons>
    </Column>
  );

  return (
    <>
      <TextButton
        color={colors.yellow}
        text="Last opp bilder"
        onTap={() => {
          pickImage()
        }}
        iconName=''
        iconPosition='left'
      />
      <TextButton
        color={colors.yellow}
        text="Ta bilder med kamera"
        onTap={() => {
          requestPermission()
          setMode('camera')
        }}
        iconName=''
        iconPosition='left'
      />
      <TextButton
        color={colors.beige}
        text="Avbryt"
        onTap={() => triggerExit()}
        iconName=''
        iconPosition='left'
      />
    </>
  );
}

const CameraContainer = styled(Column)({
  padding: 5,
  gap: 5,
  width: 400,
  height: 600
})

const StyledCamera = styled(CameraView)({
  borderRadius: 10,
  marginBottom: 10
})

const CameraButtons = styled(Row)({
  gap: 10
})

const StyledLabel = styled(Label)({
  textAlign: 'center'
})

const ImageListColumn = styled(Column)({
  flex: 1,
  alignSelf: 'stretch',
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 2,
  borderRadius: 15,
  padding: 10,
  borderColor: colors.black,
  backgroundColor: colors.white,
})

const ImageListItem = styled(Column)({
  marginTop: 10,
  alignSelf: 'stretch',
})

