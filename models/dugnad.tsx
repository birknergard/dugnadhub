export default interface Dugnad {
  id?: string;
  category?: string,
  ownerId: string,
  title: string;
  description: string;
  address: string;
  postcode: string;
  city: string;
  startDateTime: Date;
  endDateTime: Date;
  requiredPersons: number;
  images: string[];
}
