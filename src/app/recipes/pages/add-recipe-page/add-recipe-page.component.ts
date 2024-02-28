import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Ingredient, Recipe } from '../../interfaces/recipe';
import { UserInfo } from '../../interfaces/user';

import { FirestoreService } from '../../services/firestore.service';
import { ImageStorageService } from '../../services/image-storage.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe-page.component.html',
  styleUrl: './add-recipe-page.component.scss'
})
export class AddRecipePageComponent implements OnInit, OnDestroy {
  public imagesSrc: string[] = [];
  public ingredients: Ingredient[] = [];
  public instructions: string[] = [];

  public recipeForm: FormGroup = this.formBuilder.group({
    id: new FormControl<string>(''),
    images: new FormControl<string[]>([]),
    ingredients: new FormControl<Ingredient[]>([], {
      validators: [Validators.required],
      nonNullable: true
    }),
    instructions: new FormControl<string[]>([], {
      validators: [Validators.required],
      nonNullable: true
    }),
    minutes: new FormControl<number | undefined>(undefined),
    portions: new FormControl<number | undefined>(undefined),
    author: new FormControl<UserInfo>(
      {
        name: 'Alejandro Sepúlveda',
        avatar: 'https://media.licdn.com/dms/image/D4D03AQFk714AeuTRqA/profile-displayphoto-shrink_200_200/0/1708968135358?e=1714608000&v=beta&t=PorEYHfqimPOCJsVs-PaR314IVPPD8qufOQSXS0wI5I'
      },
      {
        validators: [Validators.required],
        nonNullable: true
      }
    ),
    name: new FormControl<string>('', {
      validators: [Validators.required, Validators.pattern(/\S/)],
      nonNullable: true,
    })
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private firestoreService: FirestoreService,
    private imageStorageService: ImageStorageService,
  ) {
  }

  ngOnInit(): void {
    // Empty local src images and image files arrays.
    this.imageStorageService.setLocalImageSource([]);
    this.imageStorageService.setImageFiles([]);
  }

  ngOnDestroy(): void {
    // Empty local src images and image files arrays.
    this.imageStorageService.setLocalImageSource([]);
    this.imageStorageService.setImageFiles([]);
  }

  get currentRecipe(): Recipe {
    const recipe = this.recipeForm.value as Recipe;
    return recipe;
  }

  updateIngredients(ingredients: Ingredient[]): void {
    this.ingredients = ingredients;
    this.recipeForm.patchValue({
      ingredients: this.ingredients
    });
  }

  updateInstructions(instructions: string[]): void {
    this.instructions = instructions;
    this.recipeForm.patchValue({
      instructions: this.instructions
    });
  }

  saveRecipe() {
    if (this.recipeForm.valid) {

      this.imageStorageService.uploadImageFiles().subscribe(serverImages => {
        if (serverImages.length > 0) {
          this.recipeForm.patchValue({
            images: serverImages
          });
        }

        this.firestoreService.addRecipe(this.currentRecipe)
          .subscribe(recipe => {
            this.router.navigate(['recipes/', recipe.id]);
            console.log('Successfully added')
          })

        console.log(this.currentRecipe);
      });

    } else {
      return;
    }
  }
}
