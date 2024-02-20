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
}
