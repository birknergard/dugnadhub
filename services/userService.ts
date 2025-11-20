import { getAuth, User } from 'firebase/auth';
import { addDoc, collection, doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from 'firebaseConfig';
import UserInfo from 'models/user';
import { useAuthSession } from 'providers/authSessionProvider';

const UserService = (() => {
  const getUser = async (userEmail: string) => {
    const ref = doc(collection(db, 'users'), userEmail);
    return await getDoc(ref)
      .then(r => {
        if (!r.data()) return null;
        return { ...r.data() } as UserInfo;
      })
      .catch(e => {
        console.error(`Could not fetch user from cloud on email ${userEmail} : ${e}`);
        return null;
      })
  };

  const postUser = async (
    firstName: string,
    lastName: string,
    email: string,
    username: string,
  ): Promise<boolean> => {

    // Gets a unique id and creates a doc on that id
    return setDoc(doc(collection(db, 'users'), email), {
      firstName: firstName,
      lastName: lastName,
      username: username,
      volunteerFor: [],
      organizerFor: [],
      dateCreated: Timestamp.now(),
    })
      .then((r) => {
        console.info("Created user: ", (email))
        return true;
      })
      .catch((e) => {
        console.error('User API error: ', e);
        return false;
      });
  };

  return {
    getUser,
    postUser,
  };
})();

export default UserService;
