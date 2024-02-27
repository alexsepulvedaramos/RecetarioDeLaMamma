import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot } from "firebase/firestore";
import { UserInfo } from "./user";
import { MESUREMENT_UNITS } from "./measurement-units.enum";

export interface Recipe {
  id: string;
  images?: string[];
  ingredients: Ingredient[];
  instructions: string[];
  minutes?: number;
  portions?: number;
  author: UserInfo;
  name: string;
}

export interface Ingredient {
  unit: MESUREMENT_UNITS;
  amount: number;
  name: string;
  icon?: string;
}

// Firestore data converter
export const recipeConverter: FirestoreDataConverter<Recipe> = {
  toFirestore: (recipe: Recipe) => {
    return {
      images: recipe.images,
      ingredients: recipe.ingredients.map((ingredient) => ({
        unit: ingredient.unit,
        amount: ingredient.amount,
        name: ingredient.name,
        icon: ingredient.icon ? ingredient.icon : '',
      })),
      instructions: recipe.instructions,
      minutes: recipe.minutes,
      portions: recipe.portions,
      author: recipe.author,
      name: recipe.name,
    };
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot<DocumentData, DocumentData>): Recipe => {
    const data: DocumentData | undefined = snapshot.data();

    return {
      id: snapshot.id,
      images: data['images'],
      ingredients: data['ingredients'].map((ingredient: Ingredient) => ({
        unit: ingredient.unit,
        amount: ingredient.amount,
        name: ingredient.name,
        icon: ingredient.icon,
      })),
      instructions: data['instructions'],
      minutes: data['minutes'],
      portions: data['portions'],
      author: data['author'],
      name: data['name'],
    };
  }
};
