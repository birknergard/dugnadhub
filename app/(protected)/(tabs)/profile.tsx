import { FontAwesome6 } from "@expo/vector-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import DugnadItem from "components/browse/dugnadItem";
import { TextButton } from "components/general/buttons";
import ImageUploader from "components/general/imageUploader";
import { Spinner } from "components/general/spinner";
import { colors, Column, ColumnPressable, Heading, PlainText, Row, SmallTitle } from "components/general/styledTags";
import { format } from "date-fns";
import { useFocusEffect } from "expo-router";
import { updateProfile } from "firebase/auth";
import useToast from "hooks/useToast";
import Dugnad from "models/dugnad";
import UserInfo from "models/user";
import { useAuthSession } from "providers/authSessionProvider";
import { useCallback, useState } from "react";
import { FlatList, Image, ScrollView } from "react-native";
import DugnadService from "services/dugnadService";
import StorageService from "services/storageService";
import UserService from "services/userService";
import styled from "styled-components/native";

interface UserCollection {
  info: UserInfo;
  volunteeredForDugnadList: Dugnad[];
  organizerForDugnadList: Dugnad[];
}

export default function Profile() {
  const userSession = useAuthSession();
  const [showImageUploader, setShowImageUploader] = useState(false);
  const { toastError, toastSuccess } = useToast();

  const updateProfilePicture = useMutation({
    mutationFn: async (image: string) => {
      const newImage = await StorageService.uploadDugnadImage(`${userSession.user!.email}-profilepic`, image);
      await updateProfile(userSession.user!, { photoURL: newImage });
      userSession.user!.reload();
      console.log(userSession.user?.photoURL);
      toastSuccess('Skiftet profilbilde!');
    },
    onError: () => {
      toastError('Kunne ikke laste opp nytt profilbilde.')
    }
  });

  const { data: userData, isLoading, refetch } = useQuery({
    queryKey: ['userInfo'],
    queryFn: async (): Promise<UserCollection | null> => {
      try {
        const userInfo = await UserService.getUser(userSession.user!.email!);
        console.log(userInfo);
        const organizerList = await DugnadService.getDugnaderByMultipleIDs(userInfo!.organizerFor!)
        const volunteerList = await DugnadService.getDugnaderByMultipleIDs(userInfo!.volunteerFor!);

        return {
          info: userInfo!,
          volunteeredForDugnadList: volunteerList,
          organizerForDugnadList: organizerList,
        } as UserCollection;
      } catch (e: any) {
        toastError('Feil: kunne ikke hente brukerdata.');
        return null;
      }

    },
    enabled: true,
  })
  // Refetches whevener the window appears
  useFocusEffect(
    useCallback(() => {
      refetch()
    }, [])
  );

  if (isLoading) return (
    <Main>
      <Spinner />
    </Main>
  );

  if (!userData) return (
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
      <ScrollView
        style={{
          alignSelf: 'stretch',
          flex: 1,
          backgroundColor: '#e4e3d5',
        }}
        contentContainerStyle={{
          alignItems: 'center',
          gap: 20,
          padding: 20,

        }}
      >
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
        <UserDataContainer>
          <SmallTitle>{`${userData.info.firstName} ${userData.info.lastName}`}</SmallTitle>
          <PlainText>{userData.info.username}</PlainText>
          <PlainText>{userSession.user!.email}</PlainText>
          <PlainText>Registrert {format(userData.info.dateCreated.toDate(), "d MMMM yyyy")}</PlainText>
        </UserDataContainer>

        {(userData.organizerForDugnadList && userData.organizerForDugnadList.length > 0) && (
          <Column>
            <Heading>Arrangør for</Heading>
            {userData.organizerForDugnadList.map((dugnad) => <DugnadItem key={dugnad.id} dugnad={dugnad} />)}
          </Column>
        )}

        {(userData.volunteeredForDugnadList && userData.volunteeredForDugnadList.length > 0) && (
          <Column>
            <Heading>Påmeldt til</Heading>
            {userData.volunteeredForDugnadList.map((dugnad) => <DugnadItem key={dugnad.id} dugnad={dugnad} />)}
          </Column>
        )}

        <TextButton
          color={colors.beige}
          iconName=''
          iconPosition=''
          text='Logg ut'
          onTap={() => userSession.signOut()}
        />

      </ScrollView>
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
  alignItems: 'center',
  gap: 20,
});

const UserDataContainer = styled(Column)({
  gap: 2,
})

const ProfilePictureContainer = styled(ColumnPressable)({
  height: 230,
  width: 230,
  backgroundColor: colors.white,
  borderWidth: 2,
  borderRadius: 200,
})

