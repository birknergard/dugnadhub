import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { TextButton } from "components/general/buttons";
import { Spinner } from "components/general/spinner";
import { colors, Column, ColumnPressable, Input, Label, PlainText, Row, RowPressable, SmallTitle } from "components/general/styledTags";
import { format } from "date-fns";
import useToast from "hooks/useToast";
import { Comment } from "models/comment";
import { useAuthSession } from "providers/authSessionProvider";
import { useState } from "react";
import CommentService from "services/commentService";
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
    if (userComment.length < 3) {
      toastError('Kommentaren er for kort. Må være minst 3 bokstaver');
      return;
    }
    const status = await CommentService.postComment(
      userComment,
      dugnadId,
      auth.user!.email!,
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
      <InputRow>
        <StyledInput
          value={userComment}
          onChangeText={setUserComment}
          multiline
          numberOfLines={3}
        />
        <StyledTextButton
          text='Ok'
          color={colors.yellow}
          iconName=''
          iconPosition='left'
          onTap={async () => { await addComment() }}
        />
      </InputRow>
      <CommentList>
        {comments!.length > 0 ? comments!.map((comment, i) => (
          <CommentOuterBody key={i}>
            <CommentBody>
              <CommentData>
                <UsernameText>{`${comment.username}`}</UsernameText>
                <UsernameText>{format(comment.dateCreated.toDate(), "HH:mm - dd/MM/yy")}</UsernameText>
              </CommentData>
              <CommentText>{comment.comment}</CommentText>
            </CommentBody>
            <LikeButton onPress={async () => {
              await CommentService.updateCommentLikes(comment.id!, auth.user!.email!);
              refetch();
            }}>
              <FontAwesome name='thumbs-up' size={35} color={comment.likes.includes(auth.user!.email!) ? colors.red : colors.black} />
              <Label>{comment.likes.length}</Label>
            </LikeButton>
          </CommentOuterBody>
        )) : <PlainText>Ingen kommentarer</PlainText>}
      </CommentList>
    </Body>
  );
}

const Body = styled(Column)({
  alignSelf: 'stretch',
  flexGrow: 1,
  gap: 10,
})

const InputRow = styled(Row)({
  flexGrow: 1,
  gap: 5,
})

const StyledInput = styled(Input)({
  flex: 1,
})

const StyledTextButton = styled(TextButton)({
  width: 50,
  alignSelf: 'center'
})

const CommentList = styled(Column)({
  alignSelf: 'stretch',
  flexGrow: 1,
  justifyContent: 'center',
  alignItems: 'center',
  gap: 3
})

const CommentOuterBody = styled(Row)({
  alignSelf: 'stretch',
  flexGrow: 1,
  justifyContent: 'space-between',
  padding: 5,
})

const CommentBody = styled(Column)({
  backgroundColor: colors.white,
  flex: 1,
  gap: 5,
  padding: 10,
  borderRadius: 15,
  alignSelf: 'stretch',
  justifyContent: 'space-between'
})

const CommentData = styled(Row)({
  alignSelf: 'stretch',
  alignItems: 'center',
  justifyContent: 'space-between'
})

const UsernameText = styled(PlainText)({
  textAlign: 'start',
  fontSize: 20
})

const CommentText = styled(PlainText)({
  alignSelf: 'stretch',
  marginTop: 3,
  fontSize: 18
})

const LikeButton = styled(RowPressable)({
  paddingLeft: 10,
  gap: 5,
  width: 60,
})
