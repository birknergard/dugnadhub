import { FontAwesome6 } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "components/general/spinner";
import { colors, Column, ColumnPressable, PlainText, SmallTitle } from "components/general/styledTags";
import { format } from "date-fns";
import { getAuth } from "firebase/auth";
import { auth } from "firebaseConfig";
import UserInfo from "models/user";
import { useAuthSession } from "providers/authSessionProvider";
import { useEffect, useState } from "react";
import { Image } from "react-native";
import Toast from "react-native-toast-message";
import UserService from "services/userService";
import styled from "styled-components/native";

export default function Profile() {
  const currentUserMail = useAuthSession().user!.email!;

  const { data: userInfo, isLoading, refetch } = useQuery({
    queryKey: ['userInfo'],
    queryFn: async (): Promise<UserInfo | null> => {
      return await UserService.getUser(currentUserMail)
        .then(r => {
          console.log(currentUserMail)
          return r ?? null
        })
        .catch(e => {
          console.error(`Feil: Kunne ikke laste profil: ${e}`)
          return null;
        })
    }
  })

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (errorMessage != '') {
      Toast.show({
        type: 'error',
        text1: errorMessage
      })
    }
  }, [errorMessage])

  if (isLoading) return (
    <Main>
      <Spinner />
    </Main>
  );

  if (!userInfo) return (
    <Main>
      <PlainText>Kunne ikke laste inn bruker</PlainText>
    </Main>
  );

  return (
    <Main>
      <ProfilePictureContainer
        onPress={() => { }}
      >
        {userInfo.picture !== '' ? (
          <Image source={{ uri: userInfo.picture }} />
        ) : (
          <FontAwesome6 name='user' size={120} />
        )}
      </ProfilePictureContainer>
      <SmallTitle>{`${userInfo.firstName} ${userInfo.lastName}`}</SmallTitle>
      <PlainText>{userInfo.username}</PlainText>
      <PlainText>{currentUserMail}</PlainText>
      <PlainText>Registrert {format(userInfo.dateCreated.toDate(), "d MMMM yyyy")}</PlainText>
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
