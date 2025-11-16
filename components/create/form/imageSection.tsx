import { colors, Column, Heading, Label, PlainText, Row } from "components/general/styledTags";
import { StyleSheet, Text } from "react-native";
import { CameraView } from "expo-camera";
import { launchImageLibraryAsync, MediaTypeOptions, useCameraPermissions } from "expo-image-picker";
import { useEffect, useRef, useState } from "react";
import { IconButton, TextButton } from "components/general/buttons";
import styled from "styled-components/native";

export default function ImageUpload({ images, onImageAdd, setShowUI }: {
  images: string[],
  onImageAdd: (images: string[]) => void
  setShowUI: (boolean: any) => void
}) {
  const cameraRef = useRef<CameraView | null>(null)
  const [permission, requestPermission] = useCameraPermissions();
  const [mode, setMode] = useState<| 'camera' | 'picker' | null>(null)

  const captureImage = async () => {
    const photo = await cameraRef.current?.takePictureAsync();
    if (photo?.uri) {
      onImageAdd([...images, photo.uri]);
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
      onImageAdd([...images, ...uris]);
    };

  }

  if (mode === 'camera') return (
    <Column>
      <CameraContainer>
        {(!permission?.granted) ? (
          <Column>
            <Text className="">Please give permissions to use camera</Text>
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
        <TextButton color={colors.yellow} text='Ok' onTap={() => {
          setMode(null)
          setShowUI(true)
        }} iconName='' iconPosition='' />
        <IconButton iconName="camera" onTap={async () => await captureImage()} />
      </CameraButtons>
    </Column>
  );

  return (
    <StyledColumn>
      <StyledLabel>Upload some relevant images for your dugnad</StyledLabel>
      <TextButton
        color={colors.yellow}
        text="Pick image from device"
        onTap={() => {
          pickImage()
        }}
        iconName=''
        iconPosition='left'
      />
      <TextButton
        color={colors.yellow}
        text="Take picture with camera"
        onTap={() => {
          requestPermission()
          setMode('camera')
          setShowUI(false)
        }}
        iconName=''
        iconPosition='left'
      />
      <StyledLabel>Images ({images.length})</StyledLabel>
    </StyledColumn>
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

const StyledColumn = styled(Column)({
  gap: 15
})
