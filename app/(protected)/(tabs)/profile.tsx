import { FontAwesome6 } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import ImageUploader from "components/general/imageUploader";
import { colors, Column, ColumnPressable, PlainText, SmallTitle } from "components/general/styledTags";
import { format } from "date-fns";
import { updateProfile } from "firebase/auth";
import useToast from "hooks/useToast";
import { useAuthSession } from "providers/authSessionProvider";
import { useState } from "react";
import { Image } from "react-native";
import StorageService from "services/storageService";
import styled from "styled-components/native";

export default function Profile() {
  const userSession = useAuthSession();
  const [showImageUploader, setShowImageUploader] = useState(false);
  const { toastError, toastSuccess } = useToast();

  const updateProfilePicture = useMutation({
    mutationFn: async (image: string) => {
      await StorageService.uploadDugnadImage(`${userSession.user!.email}-profilepic`, image);
      await updateProfile(userSession.user!, { photoURL: image });
      userSession.user!.reload();
      console.log(userSession.user?.photoURL);
      toastSuccess('Skiftet profilbilde!');
    },
    onError: () => {
      toastError('Kunne ikke laste opp nytt profilbilde.')
    }
  });

  if (!userSession.userInfo) return (
    <Main>
      <PlainText>Kunne ikke laste inn bruker</PlainText>
    </Main>
  );

  if (showImageUploader) return (
    <Main>
      <ImageUploader
        setImage={updateProfilePicture.mutate}
        triggerExit={() => setShowImageUploader(false)}
      />
    </Main>
  );

  return (
    <Main>
      <ProfilePictureContainer
        onPress={() => { setShowImageUploader(true) }}
      >
        {(userSession.user?.photoURL && userSession.user.photoURL) !== '' ? (
          <Image
            source={{ uri: userSession.user!.photoURL! }}
            style={{
              alignSelf: 'stretch',
              borderRadius: 200,
              flexGrow: 1
            }}
          />
        ) : (
          <FontAwesome6 name='user' size={120} />
        )}
      </ProfilePictureContainer>
      <SmallTitle>{`${userSession.userInfo.firstName} ${userSession.userInfo.lastName}`}</SmallTitle>
      <PlainText>{userSession.userInfo.username}</PlainText>
      <PlainText>{userSession.user!.email}</PlainText>
      <PlainText>Registrert {format(userSession.userInfo.dateCreated.toDate(), "d MMMM yyyy")}</PlainText>
    </Main>
  );
}

const Main = styled.View({
  flex: 1,
  justifySelf: 'stretch',
  backgroundColor: '#e4e3d5',
  padding: 20,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
});

const ProfilePictureContainer = styled(ColumnPressable)({
  height: 230,
  width: 230,
  backgroundColor: colors.white,
  borderWidth: 2,
  borderRadius: 200,
})
