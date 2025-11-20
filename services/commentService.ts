import { arrayRemove, arrayUnion, collection, doc, getDocs, query, runTransaction, setDoc, Timestamp, updateDoc, where } from 'firebase/firestore';
import { db } from 'firebaseConfig';
import { Comment } from 'models/comment';
import UserService from './userService';

const CommentService = (() => {
  const getCommentsByDugnad = async (dugnadId: string): Promise<Comment[]> => {
    const q = query(
      collection(db, 'comments'),
      where('dugnadId', '==', dugnadId)
    )
    return await getDocs(q)
      .then(r => r.docs.map(doc => {
        return doc.data() as Comment;
      }))
      .catch(e => {
        console.error('Could not fetch comments from cloud: ', e);
        return [];
      })
  };

  const postComment = async (
    comment: string,
    dugnadId: string,
    userId: string,
  ): Promise<boolean> => {
    // Gets a unique id and creates a doc on that id
    try {
      const commentId = doc(collection(db, 'comments')).id;
      const refComment = doc(collection(db, 'comments'), commentId);

      const username = await UserService.getUser(userId)
        .then(r => r?.username);
      // Gets a unique id and creates a doc on that id
      await setDoc(refComment, {
        id: commentId,
        comment: comment,
        dugnadId: dugnadId,
        userId: userId,
        username: username,
        likes: [],
        dateCreated: Timestamp.now(),
      } as Comment)

      console.info("Created comment: ", (userId))
      return true;
    }
    catch (e) {
      console.error('Comment API error: ', e);
      return false;
    };
  };

  const updateCommentLikes = async (commentId: string, user: string): Promise<void> => {
    const ref = doc(db, "comments", commentId);
    try {
      await runTransaction(db, async (transaction) => {
        const snap = await transaction.get(ref);
        const likes = snap.data()?.likes as string[];

        if (!likes.includes(user)) {
          transaction.update(ref, { likes: arrayUnion(user) });
          console.info("Liked comment", (commentId))
        } else {
          transaction.update(ref, { likes: arrayRemove(user) });
          console.info("Unliked comment", (commentId))
        }
      });
    } catch (e) {
      console.error('Comment API error: ', e);
    }
  };

  return {
    getCommentsByDugnad,
    postComment,
    updateCommentLikes,
  };

})();


export default CommentService;
