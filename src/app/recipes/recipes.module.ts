import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PrimenNgModule } from '../primeNG/primeNg.module';
import { RecipesRoutingModule } from './recipes-routing.module';

import { AddRecipePageComponent } from './pages/add-recipe-page/add-recipe-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { RecipeListPageComponent } from './pages/recipe-list-page/recipe-list-page.component';

import { FirestoreService } from './services/firestore.service';

@NgModule({
  declarations: [
    AddRecipePageComponent,
    LayoutPageComponent,
    RecipeListPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RecipesRoutingModule,
    PrimenNgModule,
  ],
  providers: [
    FirestoreService
  ],
})
export class RecipesModule { }
