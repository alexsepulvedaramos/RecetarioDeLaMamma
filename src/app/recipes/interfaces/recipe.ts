import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot } from "firebase/firestore";

export interface Recipe {
  id: string;
  images?: string[];
  ingredients: Ingredient[];
  instructions: string[];
  minutes: number;
  name: string;
}

export interface Ingredient {
  unit: string;
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
      name: data['name'],
    };
  }
};
