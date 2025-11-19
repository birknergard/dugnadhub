import { colors, Column, Heading, Label, PlainText, Row } from "components/general/styledTags";
import { FlatList, Image, StyleSheet, Text } from "react-native";
import { CameraView } from "expo-camera";
import { launchImageLibraryAsync, MediaTypeOptions, useCameraPermissions } from "expo-image-picker";
import { useEffect, useRef, useState } from "react";
import { IconButton, TextButton } from "components/general/buttons";
import styled from "styled-components/native";

export default function ImageUpload({ images, setImages, setShowUI }: {
  images: string[],
  setImages: (images: string[]) => void
  setShowUI: (boolean: any) => void
}) {
  const cameraRef = useRef<CameraView | null>(null)
  const [permission, requestPermission] = useCameraPermissions();
  const [mode, setMode] = useState<| 'camera' | 'picker' | null>(null)

  const captureImage = async () => {
    const photo = await cameraRef.current?.takePictureAsync();
    if (photo?.uri) {
      setImages([...images, photo.uri]);
      setMode(null);
      setShowUI(true)
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
      setImages([...images, ...uris]);
      setMode(null);
    };
  }

  const removeImage = (taskIndex: number) => {
    const newList = [
      ...images.slice(0, taskIndex),
      ...images.slice(taskIndex + 1)
    ];
    setImages(newList);
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
        <TextButton color={colors.yellow} text='Ok' onTap={() => {
          setMode(null)
          setShowUI(true)
        }} iconName='' iconPosition='' />
        {(permission?.granted) &&
          <IconButton iconName="camera" onTap={async () => await captureImage()} size={30} color={colors.green} />
        }
      </CameraButtons>
    </Column>
  );

  return (
    <>
      <StyledLabel>Last opp bilder relevant for dugnaden</StyledLabel>
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
          setShowUI(false)
        }}
        iconName=''
        iconPosition='left'
      />
      <StyledLabel>Bilder lastet opp: {images.length}</StyledLabel>
      <ImageListColumn>
        <FlatList
          style={{ alignSelf: 'stretch', flexGrow: 1 }}
          contentContainerStyle={{ gap: 30 }}
          data={images}
          keyExtractor={(item, i) => item + i}
          renderItem={({ item, index }) => (
            <ImageListItem>
              <Image source={{ uri: item }} style={{
                alignSelf: 'stretch',
                margin: 5,
                marginBottom: 0,
                height: 300,
              }} />
              <TextButton
                color={colors.red}
                text='Slett'
                iconPosition='left'
                iconName=''
                onTap={() => removeImage(index)}
              />
            </ImageListItem>
          )}
        />
      </ImageListColumn>
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

