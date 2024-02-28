import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FirestoreService } from '../../services/firestore.service';
import { Recipe } from '../../interfaces/recipe';
import { ImageStorageService } from '../../services/image-storage.service';

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrl: './recipe-page.component.scss'
})
export class RecipePageComponent implements OnInit, OnDestroy {

  public recipe?: Recipe;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private firestoreService: FirestoreService,
    private imageStorageService: ImageStorageService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(params => {
        this.firestoreService.getRecipeById(params['id'])
          .subscribe({
            next: recipe => {
              if (!recipe) return this.router.navigate(['/recipes/list']);

              this.recipe = recipe;

              if (this.recipe.images) {
                this.imageStorageService.setLocalImageSource(this.recipe.images);
              }

              return;
            },
            error: () => {
              return this.router.navigate(['/recipes/list']);
            }
          });
      });
  }

  ngOnDestroy(): void {
    // Empty local src images and image files arrays.
    this.imageStorageService.setLocalImageSource([]);
  }
}
