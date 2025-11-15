import { addDoc, collection } from 'firebase/firestore';
import { db } from 'firebaseConfig';

const UserDataService = (() => {
  const getUser = async () => { };

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

export default UserDataService;
