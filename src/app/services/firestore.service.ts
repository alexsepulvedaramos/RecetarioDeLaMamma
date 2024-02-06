import { Injectable } from '@angular/core';

import { FirebaseApp, initializeApp } from 'firebase/app';
import { DocumentReference, DocumentSnapshot, Firestore, addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore } from 'firebase/firestore';

import { Recipe, recipeConverter } from '../interfaces/recipe';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  public app: FirebaseApp;
  public firestore: Firestore;

  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyBbEu6Xmj7uqCUvg7KiSuczU0DXvOm8YRI",
      authDomain: "recetario-de-la-mama.firebaseapp.com",
      projectId: "recetario-de-la-mama",
      storageBucket: "recetario-de-la-mama.appspot.com",
      messagingSenderId: "674687883908",
      appId: "1:674687883908:web:f8fed4b9131bdf823a40d1",
      measurementId: "G-82Y1H8QSXQ"
    };

    this.app = initializeApp(firebaseConfig);
    this.firestore = getFirestore(this.app);
  }

  // Get a list of all the recipies from the database
  async getAllRecipes(): Promise<Recipe[]> {
    const recetasCol = collection(this.firestore, 'recetas').withConverter(recipeConverter);
    const recipesSnapshot = await getDocs(recetasCol);
    const recipesList: Recipe[] = recipesSnapshot.docs.map(doc => {
      const data = doc.data() as Recipe;
      return { ...data, id: doc.id };
    });

    return recipesList;
  }

  // Add a recipe into 'recetas' collection
  async addRecipe(recipe: Recipe): Promise<DocumentReference> {
    const recipesCol = collection(this.firestore, 'recetas').withConverter(recipeConverter);
    return await addDoc(recipesCol, recipe);
  }

  // Delete a recipe from 'recetas' collection using id
  async deleteRecipe(id: string): Promise<void> {
    const documentRef = doc(this.firestore, 'recetas', id).withConverter(recipeConverter);
    return await deleteDoc(documentRef);
  }

  // Get a recipe from 'recetas' collection using id
  async getRecipeById(id: string): Promise<Recipe> {
    const documentRef = doc(this.firestore, 'recetas', id).withConverter(recipeConverter);
    const docSnap = await getDoc(documentRef);
    if (docSnap.exists()) {
      const recipe = docSnap.data();
      return recipe;
    } else {
      throw new Error('No se ha encontrado la receta solicitada');
    }

  }
}
