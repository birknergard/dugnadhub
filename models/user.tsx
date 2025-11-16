export default interface UserInfo {
  userId: string;
  firstName: string,
  lastName: string,
  email: string,
  username: string,
  volunteerFor: string[], // Dugnad id array
  dateCreated: Date,
}
