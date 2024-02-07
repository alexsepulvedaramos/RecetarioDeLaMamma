import { Component, OnInit } from '@angular/core';
import { FirestoreService } from './recipes/services/firestore.service';
import { Recipe } from './recipes/interfaces/recipe';

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
    let data: Recipe[] = [];
    this.firestoreService.getAllRecipes().subscribe(recipes => {
      data = recipes;
      console.table(recipes);
    });


    // if (data.length > 0) {
    //   data[0].pasos.push('Dorar la cebolla durante unos 10 minutos.');
    //   console.log((await this.firestoreService.updateRecipe(data[0].id, data[0])))
    //   console.log((await this.firestoreService.addRecipe(data[0])).id);
    //   console.log((await this.firestoreService.getRecipeById(data[0].id)))
    // }

    // setTimeout(() => {
    //   data.forEach(recipe => {
    //     this.firestoreService.deleteRecipe(recipe.id);
    //   });
    // }, 10000);
  }
}
