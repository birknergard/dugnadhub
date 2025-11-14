import { Dugnad } from 'models/dugnad';
import { addDoc, collection } from 'firebase/firestore';
import { db } from 'firebaseConfig';

export const FirestoreService = (() => {
  const getDugnader = async () => {};

  const postDugnad = async (dugnad: Dugnad): Promise<boolean> => {
    return addDoc(collection(db, 'dugnad'), dugnad)
      .then((r) => {
        // TODO: Upload images to cloud storage
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
