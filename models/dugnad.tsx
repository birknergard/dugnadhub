import { Category, categoryConstants } from "constants/createConstants";
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

export interface Category {
  name: string
  iconName: string
  description: string
}

export const categories: Category[] = [
  {
    name: "Maintenance & Upkeep",
    iconName: "screwdriver-wrench",
    description: "Regular tasks that keep shared areas clean, functional, and in good condition.",
  },
  {
    name: "Beautification & Improvement",
    iconName: "seedling",
    description: "Projects that make the surroundings more welcoming and attractive.",
  },
  {
    name: "Safety & Accessibility",
    iconName: "shield-heart",
    description: "Efforts to ensure all spaces are safe and usable for everyone.",
  },
  {
    name: "Community Building",
    iconName: "people-group",
    description: "Activities that strengthen social bonds and promote collaboration.",
  },
  {
    name: "Environmental Sustainability",
    iconName: "leaf",
    description: "Initiatives focused on protecting nature and promoting sustainable living.",
  },
  {
    name: "Fundraising & Financial Support",
    iconName: "coins",
    description: "Events or tasks aimed at raising funds for shared goals or projects.",
  },
  {
    name: "Educational & Awareness",
    iconName: "lightbulb",
    description: "Activities that share knowledge, skills, or raise awareness within the community.",
  },
]

export function getDugnadCategory(dugnad: Dugnad): Category | null {
  return categories.find(category => dugnad.category == category.name) ?? null;
}

export function getFormattedAddress(dugnad: Dugnad): string {
  return `${dugnad.address}, ${dugnad.postcode} ${dugnad.city}`;
}
