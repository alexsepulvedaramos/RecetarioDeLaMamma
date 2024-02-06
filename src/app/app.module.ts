import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AddRecipeComponent } from './pages/add-recipe/add-recipe.component';
import { RecipeListComponent } from './pages/recipe-list/recipe-list.component';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';

import { FirestoreService } from './services/firestore.service';

@NgModule({
  declarations: [
    AppComponent,
    AddRecipeComponent,
    RecipeListComponent,
    RecipeFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    FirestoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
