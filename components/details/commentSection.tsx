import { useQuery } from "@tanstack/react-query";
import { TextButton } from "components/general/buttons";
import { Spinner } from "components/general/spinner";
import { colors, Column, Input, Label, PlainText, Row, SmallTitle } from "components/general/styledTags";
import useToast from "hooks/useToast";
import { Comment } from "models/dugnad";
import { useAuthSession } from "providers/authSessionProvider";
import { useEffect, useState } from "react";
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
    }
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
      <SmallTitle>Comments</SmallTitle>
      {comments!.map((comment, i) => (
        <CommentBody key={i}>
          <PlainText>{comment.comment}</PlainText>
        </CommentBody>
      ))}
      <Label>Legg igjen kommentar</Label>
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
    </Body>
  );
}

const Body = styled(Column)({
  alignSelf: 'stretch'
})
const CommentBody = styled(Column)({})
