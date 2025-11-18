import { Category, categoryConstants } from "constants/createConstants";

export default function getCategoryByName(name: string): Category | null {
  return categoryConstants.find(category => {
    return category.name === name
  }) ?? null;
}
