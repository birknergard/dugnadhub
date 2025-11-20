import { Timestamp } from "firebase/firestore";

export default interface UserInfo {
  firstName: string,
  lastName: string,
  username: string,
  volunteerFor: string[],
  organizerFor: string[],
  dateCreated: Timestamp,
}
