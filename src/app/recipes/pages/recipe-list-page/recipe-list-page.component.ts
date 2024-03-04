import { Component } from '@angular/core';
import { AutoCompleteCompleteEvent, AutoCompleteSelectEvent } from 'primeng/autocomplete';
import { TranslateService } from '@ngx-translate/core';

import { FirestoreService } from '../../services/firestore.service';

import { Recipe } from '../../interfaces/recipe';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list-page.component.html',
  styleUrl: './recipe-list-page.component.scss'
})
export class RecipeListPageComponent {

  searchParam: any;

  // Paginator controls
  pageSize: number = 10;
  pageNumber: number = 0;

  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  suggestedRecipes: Recipe[] = [];

  constructor(
    private firestoreService: FirestoreService,
    private translateService: TranslateService
  ) {
    const lastFetchTimeStr = localStorage.getItem('lastRecipeFetch');
    const lastFetchLanguage = localStorage.getItem('lastRecipeLanguage');
    const recipeAdded = localStorage.getItem('recipeAdded') ? JSON.parse(localStorage.getItem('recipeAdded') as string) : false;
    const lastFetchTime = lastFetchTimeStr ? parseInt(lastFetchTimeStr, 10) : 0;
    const currentTime = new Date().getTime();

    if (recipeAdded || (lastFetchLanguage !== this.translateService.currentLang) || (!lastFetchTime || currentTime - lastFetchTime > 5 * 60 * 1000)) {
      this.firestoreService.getAllRecipes().subscribe(recipes => {
        // Check if 5 minutes have passed from last  fetch.
        this.recipes = recipes;
        this.filteredRecipes = this.recipes;

        // Store time and content of fetch data.
        localStorage.setItem('lastRecipeFetch', currentTime.toString());
        localStorage.setItem('lastRecipeLanguage', this.translateService.currentLang);
        localStorage.setItem('recipeAdded', 'false');
        localStorage.setItem('recipes', JSON.stringify(this.recipes));
      });
    } else {
      // Use recipes from local storage if they are recent.
      const recipesFromStorage = localStorage.getItem('recipes');

      if (recipesFromStorage) {
        this.recipes = JSON.parse(recipesFromStorage) as Recipe[];
        this.filteredRecipes = this.recipes;
      }
    }

    this.translateService.onLangChange.subscribe(() => {
      this.firestoreService.getAllRecipes().subscribe(recipes => {
        this.recipes = recipes;
        this.filteredRecipes = this.recipes;
        localStorage.setItem('lastRecipeFetch', currentTime.toString());
        localStorage.setItem('lastRecipeLanguage', this.translateService.currentLang);
        localStorage.setItem('recipeAdded', 'false');
        localStorage.setItem('recipes', JSON.stringify(this.recipes));
      });
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

  paginatorEvent(event: any): void {
    this.pageNumber = event.page;
  }

  emptyMessage(): string {
    return this.translateService.instant('HOME.NO_RECIPES');
  }
}
