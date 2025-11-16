import Dugnad from 'models/dugnad';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from 'firebaseConfig';
import StorageService from './storageService';

const DugnadService = (() => {

  const getDugnader = async () => { };

  const postDugnad = async (
    dugnad: Dugnad,
  ): Promise<boolean> => {

    // Gets a unique id and creates a doc on that id
    const dugnadId = doc(collection(db, 'dugnads')).id;

    // Uploads images
    for (let i = 0; i < dugnad.images.length; i++) {
      const uploaded = await StorageService.uploadDugnadImage(`image-dugnad-${dugnadId}-${i}`, dugnad.images[i], dugnadId);
      if (uploaded === 'ERROR') {
        return false;
      }
      dugnad.images.push(uploaded);
    }

    // Uploads the rest of the data
    return await setDoc(doc(db, 'dugnad', dugnadId), { ...dugnad, id: dugnadId })
      .then((r) => {
        console.info("Posted dugnad with id: ", { r })
        return true;
      })
      .catch((e) => {
        console.error('Dugnad API error: ', e);
        return false;
      });
  }

  return {
    getDugnader,
    postDugnad,
  };
})();

export default DugnadService;
