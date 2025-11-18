import { User } from 'firebase/auth';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { db } from 'firebaseConfig';
import UserInfo from 'models/user';

const UserService = (() => {
  const getUser = async (id: string) => {
    const ref = doc(db, 'user', id);
    return await getDoc(ref)
      .then(r => {
        if (!r.data()) return null;
        return { ...r.data() } as UserInfo;
      })
      .catch(e => {
        console.error(`Could not fetch user from cloud on id ${id} : ${e}`);
        return null;
      })
  };

  const postUser = async (
    userId: string,
    firstName: string,
    lastName: string,
    email: string,
    username: string,
  ): Promise<boolean> => {

    return addDoc(collection(db, 'users'), {
      userId: userId,
      firstName: firstName,
      lastName: lastName,
      email: email,
      username: username,
      dateCreated: new Date(),
      volunteerFor: [],
      organizerFor: [],
    })
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
    getUser,
    postUser,
  };
})();

export default UserService;
