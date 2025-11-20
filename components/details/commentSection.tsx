import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { TextButton } from "components/general/buttons";
import { Spinner } from "components/general/spinner";
import { colors, Column, ColumnPressable, Input, Label, PlainText, Row, SmallTitle } from "components/general/styledTags";
import useToast from "hooks/useToast";
import { Comment } from "models/comment";
import { useAuthSession } from "providers/authSessionProvider";
import { useEffect, useState } from "react";
import { Pressable } from "react-native";
import Toast from "react-native-toast-message";
import CommentService from "services/commentService";
import UserService from "services/userService";
import styled from "styled-components/native";

export default function CommentSection({ dugnadId }: { dugnadId: string }) {
  const auth = useAuthSession();
  const { toastError, toastSuccess } = useToast();

  const { data: comments, isLoading, refetch } = useQuery({
    queryKey: ['allComments'],
    queryFn: async (): Promise<Comment[]> => {
      try {
        const r = await CommentService.getCommentsByDugnad(dugnadId)
        return r;
      } catch (e) {
        console.error('Error: Could not fetch comments:', e)
        return [];
      }
    },
    enabled: true
  })

  const [userComment, setUserComment] = useState('');
  const addComment = async () => {
    const status = await CommentService.postComment(
      userComment,
      dugnadId,
      auth.user!.email!,
      auth.userInfo!.username
    )
    if (!status) {
      toastError('Feil: kunne ikke publisere kommentar');
      return;
    }
    setUserComment('');
    toastSuccess('Kommentaren er registrert');
    refetch();
  }

  if (isLoading) return (
    <Body>
      <Spinner />
    </Body>
  );

  if (!comments) {
    <Body>
      <PlainText>Comments could not be loaded.</PlainText>
    </Body>
  }

  return (
    <Body>
      <SmallTitle>Kommentarfelt</SmallTitle>
      <Row>
        <Input
          value={userComment}
          onChangeText={setUserComment}
        />
        <TextButton
          text='Kommenter'
          color={colors.yellow}
          iconName=''
          iconPosition='left'
          onTap={async () => { await addComment() }}
        />
      </Row>
      {comments!.map((comment, i) => (
        <CommentBody key={i}>
          <PlainText>{comment.comment}</PlainText>
          <Pressable onPress={async () => {
            await CommentService.updateCommentLikes(comment.id!, auth.user!.email!);
            refetch();
          }}>
            <FontAwesome name='thumbs-up' size={35} color={comment.likes.includes(auth.user!.email!) ? colors.red : colors.black} />
          </Pressable>
          <PlainText>{comment.likes.length}</PlainText>
        </CommentBody>
      ))}
    </Body>
  );
}

const Body = styled(Column)({
  alignSelf: 'stretch'
})
const CommentBody = styled(Row)({})
