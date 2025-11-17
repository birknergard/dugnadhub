import { Timestamp } from "firebase/firestore";

export default interface Dugnad {
  id?: string;
  category: string,
  ownerId: string,
  title: string;
  description: string;
  address: string;
  postcode: string;
  city: string;
  startDateTime: Timestamp;
  endDateTime: Timestamp;
  requiredPersons: number;
  signedUp: string[]; // userids of signed up users
  images: string[];
}
