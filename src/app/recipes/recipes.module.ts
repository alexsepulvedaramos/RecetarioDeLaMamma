import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../primeNG/primeNg.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RecipesRoutingModule } from './recipes-routing.module';

import { AddRecipePageComponent } from './pages/add-recipe-page/add-recipe-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { RecipeListPageComponent } from './pages/recipe-list-page/recipe-list-page.component';
import { RecipePageComponent } from './pages/recipe-page/recipe-page.component';

import { FirestoreService } from './services/firestore.service';
import { FoodsService } from './services/foods.service';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import { MinutesToHoursPipe } from './pipes/minutes-to-hours.pipe';

@NgModule({
  declarations: [
    AddRecipePageComponent,
    LayoutPageComponent,
    RecipeListPageComponent,
    RecipeCardComponent,
    RecipePageComponent,
    MinutesToHoursPipe,
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule,
    RecipesRoutingModule,
  ],
  providers: [
    FirestoreService,
    FoodsService
  ],
})
export class RecipesModule { }
