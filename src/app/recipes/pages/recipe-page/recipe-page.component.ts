import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FirestoreService } from '../../services/firestore.service';
import { Recipe } from '../../interfaces/recipe';

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrl: './recipe-page.component.scss'
})
export class RecipePageComponent implements OnInit {

  public recipe?: Recipe;

  imageIndex: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private firestoreService: FirestoreService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(params => {
        this.firestoreService.getRecipeById(params['id'])
          .subscribe({
            next: recipe => {
              if (!recipe) return this.router.navigate(['/recipes/list']);

              this.recipe = recipe;
              return;
            },
            error: () => {
              return this.router.navigate(['/recipes/list']);
            }
          });
      });
  }

  getCurrentImage(): string {
    if (this.recipe && this.recipe.images && this.recipe.images.length > 0) {
      if (this.recipe.images[this.imageIndex]) {
        return this.recipe.images[this.imageIndex];
      }
    }

    return '';
  }

  prevImage() {
    if (this.recipe?.images) {
      this.imageIndex = (this.imageIndex - 1 + this.recipe.images.length) % this.recipe.images.length;
    }
  }

  nextImage() {
    if (this.recipe?.images) {
      this.imageIndex = (this.imageIndex + 1) % this.recipe.images.length;
    }
  }
}
