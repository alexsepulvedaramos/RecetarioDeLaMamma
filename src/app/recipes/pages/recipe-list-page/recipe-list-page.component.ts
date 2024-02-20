import { Component } from '@angular/core';
import { AutoCompleteCompleteEvent, AutoCompleteSelectEvent } from 'primeng/autocomplete';
import { FirestoreService } from '../../services/firestore.service';
import { Recipe } from '../../interfaces/recipe';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list-page.component.html',
  styleUrl: './recipe-list-page.component.scss'
})
export class RecipeListPageComponent {

  searchParam: any;

  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  suggestedRecipes: Recipe[] = [];

  constructor(
    private firestoreService: FirestoreService
  ) {
    this.firestoreService.getAllRecipes().subscribe(recipes => {
      console.log(recipes);
      this.recipes = recipes;
      this.filteredRecipes = this.recipes;
    });
  }

  searchRecipe(event: AutoCompleteCompleteEvent): void {
    let query = event.query;

    this.suggestedRecipes = this.filterRecipes(query);
    this.showRecipes();
  }

  showRecipes(event?: AutoCompleteSelectEvent): void {
    if (event) {
      this.suggestedRecipes = this.filterRecipes(event.value.name);
    }
    this.filteredRecipes = this.suggestedRecipes;
  }

  resetRecipes(): void {
    this.filteredRecipes = this.recipes;
  }

  filterRecipes(filter: string): Recipe[] {
    let filtered: Recipe[] = [];

    this.recipes.forEach(recipe => {
      if (recipe.name.toLowerCase().includes(filter.toLowerCase())) {
        filtered.push(recipe);
      }
    });

    return filtered;
  }
}
