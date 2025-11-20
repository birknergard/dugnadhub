import Dugnad from 'models/dugnad';
import { arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { auth, db } from 'firebaseConfig';
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

  const getDugnaderByMultipleIDs = async (dugnadIds: string[]): Promise<Dugnad[]> => {
    try {
      const requests = dugnadIds.map(id => getDugnadById(id));
      // runs all requests asynchronously
      const results = await Promise.all(requests);

      return results.filter(Boolean) as Dugnad[];
    } catch (e: any) {
      console.error("API Error: could not fetch dugnads:", e);
      return [];
    }
  };


  const postDugnad = async (
    organizerId: string,
    dugnad: Dugnad,
    images: string[]
  ): Promise<boolean> => {

    // Create copy to work on
    let parsed = { ...dugnad };

    try {
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
      await setDoc(doc(db, 'dugnad', dugnadId), { ...parsed, id: dugnadId })

      // Update organizers list
      await updateDoc(doc(db, 'users', organizerId), { organizerFor: arrayUnion(dugnadId) })
      console.info("Posted dugnad with id: ", dugnadId)
      return true;

    } catch (e) {
      console.error('Dugnad API error: ', e);
      return false;
    };
  }

  const registerVolunteerOnDugnad = async (userId: string, dugnadId: string): Promise<boolean> => {
    const refDugnad = doc(collection(db, 'dugnad'), dugnadId);
    const refUser = doc(collection(db, 'users'), userId);
    try {
      await updateDoc(refDugnad, {
        signedUp: arrayUnion(userId)
      });
      await updateDoc(refUser, {
        volunteerFor: arrayUnion(dugnadId)
      });
      return true;
    } catch (e) {
      console.error('Dugnad API error: ', e);
      return false;
    }
  }

  const removeVolunteerFromDugnad = async (userId: string, dugnadId: string): Promise<boolean> => {
    const ref = doc(collection(db, 'dugnad'), dugnadId)
    return await updateDoc(ref, {
      signedUp: arrayRemove(userId)
    })
      .then((r) => {
        console.info(`Added volunteer ${userId} to dugnad with id: ${r}`)
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
    getDugnaderByMultipleIDs,
    postDugnad,
    registerVolunteerOnDugnad,
    removeVolunteerFromDugnad
  };
})();

export default DugnadService;
