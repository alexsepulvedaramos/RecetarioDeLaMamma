import { Component, Inject, OnInit } from '@angular/core';
import { FirebaseApp, initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
import { Firestore, getFirestore, DocumentData, collection, getDocs } from "firebase/firestore";
import { FirestoreService } from './services/firestore.service';
import { Recipe } from './interfaces/recipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private firestoreService: FirestoreService
  ) {
  }

  async ngOnInit(): Promise<void> {
    const data: Recipe[] = await this.firestoreService.getAllRecipes();

    if (data.length > 0) {
      console.log((await this.firestoreService.addRecipe(data[0])).id);
      console.log((await this.firestoreService.getRecipeById(data[0].id)))
    }

    setTimeout(() => {
      data.forEach(recipe => {
        this.firestoreService.deleteRecipe(recipe.id);
      });
    }, 10000);
  }
}
