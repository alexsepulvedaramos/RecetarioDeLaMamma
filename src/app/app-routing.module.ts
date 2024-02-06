import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRecipeComponent } from './pages/add-recipe/add-recipe.component';
import { RecipeListComponent } from './pages/recipe-list/recipe-list.component';

const routes: Routes = [
  { path: 'addRecipe', component: AddRecipeComponent },
  { path: 'recipeList', component: RecipeListComponent },
  { path: '**', redirectTo: 'recipeList' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
