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

  responsiveOptions: any[] | undefined;

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

    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 5
      },
      {
        breakpoint: '768px',
        numVisible: 3
      },
      {
        breakpoint: '560px',
        numVisible: 1
      }
    ];
  }
}
