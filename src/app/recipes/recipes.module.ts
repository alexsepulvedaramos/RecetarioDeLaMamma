import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PrimeNgModule } from '../primeNG/primeNg.module';
import { WebcamModule } from 'ngx-webcam';

import { RecipesRoutingModule } from './recipes-routing.module';

import { AddIngredientsComponent } from './components/add-ingredients/add-ingredients.component';
import { AddInstructionsComponent } from './components/add-instructions/add-instructions.component';
import { AddRecipePageComponent } from './pages/add-recipe-page/add-recipe-page.component';
import { ImageCarrouselComponent } from './components/image-carrousel/image-carrousel.component';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { MinutesToHoursPipe } from './pipes/minutes-to-hours.pipe';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import { RecipeListPageComponent } from './pages/recipe-list-page/recipe-list-page.component';
import { RecipePageComponent } from './pages/recipe-page/recipe-page.component';

import { FirestoreService } from './services/firestore.service';
import { FoodsService } from './services/foods.service';

@NgModule({
  declarations: [
    AddIngredientsComponent,
    AddInstructionsComponent,
    AddRecipePageComponent,
    ImageCarrouselComponent,
    ImageUploaderComponent,
    LayoutPageComponent,
    MinutesToHoursPipe,
    RecipeCardComponent,
    RecipeListPageComponent,
    RecipePageComponent,
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule,
    RecipesRoutingModule,
    WebcamModule
  ],
  providers: [
    FirestoreService,
    FoodsService
  ],
})
export class RecipesModule { }
