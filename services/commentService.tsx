import { collection, doc, getDocs, query, setDoc, Timestamp, where } from 'firebase/firestore';
import { db } from 'firebaseConfig';
import { Comment } from 'models/dugnad';

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
        console.error('Could not fetch dugnads from cloud: ', e);
        return [];
      })
  };

  const postComment = async (
    comment: string,
    dugnadId: string,
    userId: string,
  ): Promise<boolean> => {
    // Gets a unique id and creates a doc on that id
    const commentId = doc(collection(db, 'comments')).id;
    const ref = doc(collection(db, 'comments'), commentId);

    // Gets a unique id and creates a doc on that id
    return await setDoc(ref, {
      comment: comment,
      dugnadId: dugnadId,
      userId: userId,
      dateCreated: Timestamp.now(),
    } as Comment)
      .then((r) => {
        console.info("Created user: ", (userId))
        return true;
      })
      .catch((e) => {
        console.error('User API error: ', e);
        return false;
      });
  };

  return {
    getCommentsByDugnad,
    postComment,
  };
})();

export default CommentService;
