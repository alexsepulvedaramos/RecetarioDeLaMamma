import { Injectable } from '@angular/core';

import { FirebaseApp, initializeApp } from 'firebase/app';
import { DocumentReference, Firestore, addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, updateDoc } from 'firebase/firestore';

import { Recipe, recipeConverter } from '../interfaces/recipe';
import { Observable, from, map } from 'rxjs';

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

  // Get a list of all the recipes from the database
  getAllRecipes(): Observable<Recipe[]> {
    const recipesCol = collection(this.firestore, 'recipes').withConverter(recipeConverter);
    return from(getDocs(recipesCol)).pipe(
      map(snapshot => {
        return snapshot.docs.map(doc => doc.data())
      })
    );
  }

  // Get a recipe from 'recipes' collection using id
  getRecipeById(id: string): Observable<Recipe> {
    const documentRef = doc(this.firestore, 'recipes', id).withConverter(recipeConverter);
    return from(getDoc(documentRef)).pipe(
      map(snapshot => {
        if (snapshot.exists()) {
          const recipe = snapshot.data();
          return recipe;
        } else {
          throw new Error('The requested recipe was not found');
        }
      })
    )
  }

  // Add a recipe into 'recipes' collection
  addRecipe(recipe: Recipe): Observable<DocumentReference> {
    const recipesCol = collection(this.firestore, 'recipes').withConverter(recipeConverter);
    return from(addDoc(recipesCol, recipe));
  }

  // Update a recipe into 'recipes' collection
  updateRecipe(recipe: Recipe): Observable<void> {
    const documentRef = doc(this.firestore, 'recipes', recipe.id).withConverter(recipeConverter);
    return from(updateDoc(documentRef, { ...recipe }));
  }

  // Delete a recipe from 'recipes' collection using id
  deleteRecipe(id: string): Observable<void> {
    const documentRef = doc(this.firestore, 'recipes', id).withConverter(recipeConverter);
    return from(deleteDoc(documentRef));
  }
}
