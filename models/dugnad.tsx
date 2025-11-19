import { Timestamp } from "firebase/firestore";

export default interface Dugnad {
  id?: string;
  category: string,
  ownerId: string,
  title: string;
  description: string;
  taskList: string[];
  address: string;
  postcode: string;
  city: string;
  startDateTime: Timestamp;
  endDateTime: Timestamp;
  requiredPersons: number;
  signedUp: string[]; // userids of signed up users
  images: string[];
  commments: { username: string, comment: string }[];
  likedBy: string[];
}

export interface Comment {
  comment: string
  dugnadId: string,
  userId: string,
  username: string,
  dateCreated: Timestamp
}

export interface Category {
  name: string
  iconName: string
  description: string
}

export const categories: Category[] = [
  {
    name: "Vedlikehold",
    iconName: "screwdriver-wrench",
    description: "Arbeid som holder fellesområder i god stand, som reparasjoner, maling og generelt vedlikehold.",
  },
  {
    name: "Opprydning og forskjønning",
    iconName: "seedling",
    description: "Tiltak som gjør området ryddigere og mer trivelig, som søppelhenting, luking og enkel forskjønning.",
  },
  {
    name: "Sikring",
    iconName: "shield-heart",
    description: "Arbeid som gjør områder tryggere, for eksempel utbedring av farlige forhold eller montering av sikkerhetstiltak.",
  },
  {
    name: "Samfunnsbygging",
    iconName: "people-group",
    description: "Aktiviteter som styrker fellesskapet, samarbeidet og samholdet blant beboerne.",
  },
  {
    name: "Miljø",
    iconName: "leaf",
    description: "Dugnader som bidrar til bedre miljø, som gjenvinning, naturpleie eller bærekraftige tiltak.",
  },
  {
    name: "Veldedighet",
    iconName: "coins",
    description: "Innsatser som støtter gode formål, som innsamlinger eller hjelpetiltak for ulike behov.",
  },
  {
    name: "Utdanning og kunnskapsbygging",
    iconName: "lightbulb",
    description: "Aktiviteter som deler nyttig kunnskap eller ferdigheter, ofte gjennom korte kurs eller veiledning.",
  },
]

export function getDugnadCategory(dugnad: Dugnad): Category | null {
  return categories.find(category => dugnad.category === category.name) ?? null;
}

export function getFormattedAddress(dugnad: Dugnad): string {
  return `${dugnad.address}, ${dugnad.postcode} ${dugnad.city}`;
}
