import { Injectable } from '@angular/core';

import { FirebaseApp, initializeApp } from 'firebase/app';
import { CollectionReference, DocumentReference, DocumentSnapshot, Firestore, Query, addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, limit, orderBy, query, startAt, updateDoc, where } from 'firebase/firestore';

import { Recipe, recipeConverter } from '../interfaces/recipe';
import { Observable, from, map } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  public app: FirebaseApp;
  public firestore: Firestore;
  private recipeCollection: CollectionReference;

  private currentDocSnap?: DocumentSnapshot;

  getCurrentDocSnap(): DocumentSnapshot | undefined {
    return this.currentDocSnap;
  }

  setCurrentDocSnap(value: DocumentSnapshot | undefined): void {
    this.currentDocSnap = value;
  }

  constructor(
    private translateService: TranslateService
  ) {
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
    this.recipeCollection = collection(this.firestore, 'recipes');
  }

  // Get a list of all the recipes from the database
  getAllRecipes(pageSize: number = 10, pageNumber: number = 0): Observable<Recipe[]> {
    let queryStart: 'A' | DocumentSnapshot | undefined = 'A';

    if (pageNumber > 0) {
      queryStart = this.getCurrentDocSnap();
    }

    if (queryStart) {
      const recipesCol: Query<any> = query(
        this.recipeCollection,
        where('language', '==', this.translateService.currentLang.toUpperCase()),
        orderBy('name'),
        startAt(queryStart),
        limit(pageSize),
      ).withConverter(recipeConverter);

      return from(getDocs(recipesCol)).pipe(
        map(snapshots => {
          // Save last Document Snpashot for paginator.
          const lastSnapshot = snapshots.docs[snapshots.docs.length - 1];
          this.setCurrentDocSnap(lastSnapshot);

          return snapshots.docs.map(doc => doc.data())
        })
      );
    } else {
      return from([]);
    }
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
    const recipesCol = this.recipeCollection.withConverter(recipeConverter);

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
