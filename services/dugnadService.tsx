import Dugnad from 'models/dugnad';
import { addDoc, collection } from 'firebase/firestore';
import { db } from 'firebaseConfig';

const DugnadService = (() => {
  const getDugnader = async () => { };

  const postDugnad = async (dugnad: Dugnad): Promise<boolean> => {
    return addDoc(collection(db, 'dugnad'), dugnad)
      .then((r) => {
        console.info("Posted dugnad with id: ", { r })
        return true;
      })
      .catch((e) => {
        console.error('Dugnad API error: ', e);
        return false;
      });
  };

  return {
    getDugnader,
    postDugnad,
  };
})();

export default DugnadService;
