import { Timestamp } from "firebase/firestore"

export interface Comment {
  id?: string,
  comment: string
  dugnadId: string,
  userId: string,
  username: string,
  likes: string[],
  dateCreated: Timestamp
}

