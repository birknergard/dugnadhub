import { getDownloadURL, uploadBytes } from 'firebase/storage';
import { getStorageReference } from 'firebaseConfig';

const StorageService = (() => {
  const getImage = async () => { };

  const uploadDugnadImage = async (imageName: string, uri: string, dugnadId: string): Promise<string> => {
    const fetchResponse = await fetch(uri);
    const blob = await fetchResponse.blob();

    const uploadPath = `dugnadImageFiles/${imageName}`;
    const imageRef = getStorageReference(uploadPath);

    try {
      await uploadBytes(imageRef, blob);
      //console.log('Uploading image to', uploadPath);
      const downloadURL = await getDownloadURL(imageRef);
      console.log('Download URL:', downloadURL);
      return downloadURL;
    } catch (e) {
      console.error('error uploading image', e);
      return 'ERROR';
    }
  };

  return {
    getImage,
    uploadDugnadImage,
  };
})();

export default StorageService;
