import { Column, Label, PlainText, Row } from "components/general/styledTags";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { CameraView } from "expo-camera";
import { launchImageLibraryAsync, MediaTypeOptions, useCameraPermissions } from "expo-image-picker";
import { useRef, useState, useSyncExternalStore } from "react";
import { IconButton, TextButton } from "components/general/buttons";
import styled from "styled-components/native";

export default function ImageUpload({ onCameraMode }: { onCameraMode: (any: any) => void }) {
  const cameraRef = useRef<CameraView | null>(null)
  const [permission, requestPermission] = useCameraPermissions();
  const [images, setImages] = useState<string[]>([])
  const [mode, setMode] = useState<'camera' | 'picker' | null>(null)


  const captureImage = async () => {
    const photo = await cameraRef.current?.takePictureAsync();
    if (photo?.uri) {
      setImages([...images, photo.uri]);
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
      setImages([...images, ...uris]); // append selected image

    };

  }
  if (mode === 'camera') return (
    <Column>
      <CameraContainer>
        <StyledCamera
          style={StyleSheet.absoluteFill}
          ref={cameraRef}
          facing="back"
        />
      </CameraContainer>
      <CameraButtons>
        <TextButton text='Cancel' onTap={() => setMode(null)} iconName='' iconPosition='' />
        <IconButton iconName="camera" onTap={async () => await captureImage()} />
      </CameraButtons>
    </Column>
  );

  return (
    <StyledColumn>
      <StyledLabel>Upload some relevant images for your dugnad</StyledLabel>
      <TextButton
        text="Pick image from device"
        onTap={() => {
          pickImage()
        }}
        iconName=''
        iconPosition='left'
      />
      <TextButton
        text="Take picture with camera"
        onTap={() => {
          requestPermission()
          setMode('camera')
        }}
        iconName=''
        iconPosition='left'
      />
      <StyledLabel>Images ({images.length})</StyledLabel>
      {images.map(image => (
        <PlainText>{image}</PlainText>
      ))}
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
