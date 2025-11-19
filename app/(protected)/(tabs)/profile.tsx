import { FontAwesome6 } from "@expo/vector-icons";
import { colors, Column, ColumnPressable, PlainText, SmallTitle } from "components/general/styledTags";
import { format } from "date-fns";
import { useAuthSession } from "providers/authSessionProvider";
import { Image } from "react-native";
import styled from "styled-components/native";

export default function Profile() {
  const userSession = useAuthSession();

  if (!userSession.userInfo) return (
    <Main>
      <PlainText>Kunne ikke laste inn bruker</PlainText>
    </Main>
  );

  return (
    <Main>
      <ProfilePictureContainer
        onPress={() => { }}
      >
        {userSession.userInfo.picture !== '' ? (
          <Image source={{ uri: userSession.userInfo.picture }} />
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
