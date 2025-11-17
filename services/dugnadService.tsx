import Dugnad from 'models/dugnad';
import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from 'firebaseConfig';
import StorageService from './storageService';

const DugnadService = (() => {

  const getDugnader = async (): Promise<Dugnad[]> => {
    return await getDocs(collection(db, 'dugnad'))
      .then(r => r.docs.map(doc => {
        return doc.data() as Dugnad;
      }))
      .catch(e => {
        console.error('Could not fetch dugnads from cloud: ', e);
        return [];
      })
  };

  const getDugnadById = async (dugnadId: string): Promise<Dugnad | null> => {
    const ref = doc(db, 'dugnad', dugnadId);
    return await getDoc(ref)
      .then(r => {
        if (!r.data()) return null;
        return { ...r.data() } as Dugnad;
      })
      .catch(e => {
        console.error(`Could not fetch dugnad from cloud on id ${dugnadId} : ${e}`);
        return null;
      })
  };

  const postDugnad = async (
    dugnad: Dugnad,
    images: string[]
  ): Promise<boolean> => {

    // Create copy to work on
    let parsed = { ...dugnad };

    // Gets a unique id and creates a doc on that id
    const dugnadId = doc(collection(db, 'dugnad')).id;

    // Uploads images
    for (let i = 0; i < images.length; i++) {
      const uploaded = await StorageService.uploadDugnadImage(
        `image-dugnad-${dugnadId}-${i}`,
        images[i]
      );
      if (uploaded === 'ERROR') {
        return false;
      }
      parsed.images.push(uploaded);
    }

    // Uploads the rest of the data
    return await setDoc(doc(db, 'dugnad', dugnadId), { ...parsed, id: dugnadId })
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
    getDugnadById,
    postDugnad,
  };
})();

export default DugnadService;
