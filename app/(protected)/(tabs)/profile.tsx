import { FontAwesome6 } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "components/general/spinner";
import { colors, Column, ColumnPressable, SmallTitle } from "components/general/styledTags";
import { useAuthSession } from "providers/authSessionProvider";
import { useState } from "react";
import { ActivityIndicator } from "react-native";
import UserService from "services/userDataService";
import styled from "styled-components/native";

export default function Profile() {
  const userId = useAuthSession().user?.uid ?? '';
  const { data: userInfo, isLoading, refetch } = useQuery({
    queryKey: ['userInfo'],
    queryFn: async () => await UserService.getUser(userId)
      .then(r => r)
      .catch(e => { })
  })

  const [errorMessage, setErrorMessage] = useState('');

  if (isLoading) return (
    <Main>
      <Spinner />
    </Main>
  );

  if (!userInfo) return (
    <Main>
      <Spinner />
    </Main>
  );

  return (
    <Main>
      <Column>
        <ProfilePictureContainer
          onPress={() => { }}
        >
          <FontAwesome6 name='user' size={120} />
        </ProfilePictureContainer>
      </Column>
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
  alignItems: 'stretch'
});

const ProfilePictureContainer = styled(ColumnPressable)({
  height: 230,
  width: 230,
  backgroundColor: colors.white,
  borderWidth: 2,
  borderRadius: 200,
})
