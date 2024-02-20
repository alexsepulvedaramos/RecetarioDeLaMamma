import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../interfaces/recipe';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss'
})
export class RecipeCardComponent implements OnInit {
  @Input() recipe!: Recipe;

  ngOnInit(): void {
    if (!this.recipe) throw Error('Recipe property is required!');
  }

  getRecipeImg(): string {
    if (this.recipe && this.recipe.images && this.recipe.images.length > 0) {
      if (this.recipe.images[0]) {
        return this.recipe.images[0];
      }
    }

    return '';
  }
}
