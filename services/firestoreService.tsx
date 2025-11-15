import Dugnad from 'models/dugnad';
import { addDoc, collection } from 'firebase/firestore';
import { db } from 'firebaseConfig';

const FirestoreService = (() => {
  const getDugnader = async () => { };

  const postDugnad = async (dugnad: Dugnad): Promise<boolean> => {
    return addDoc(collection(db, 'dugnad'), dugnad)
      .then((r) => {
        console.info("Posted dugnad with id: ", { r })
        return true;
      })
      .catch((e) => {
        console.error('Firestore error: ', e);
        return false;
      });
  };

  return {
    getDugnader,
    postDugnad,
  };
})();

export default FirestoreService;
