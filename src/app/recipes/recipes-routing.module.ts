import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { AddRecipePageComponent } from './pages/add-recipe-page/add-recipe-page.component';
import { RecipeListPageComponent } from './pages/recipe-list-page/recipe-list-page.component';
import { RecipePageComponent } from './pages/recipe-page/recipe-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'add-recipe', component: AddRecipePageComponent },
      { path: 'list', component: RecipeListPageComponent },
      { path: ':id', component: RecipePageComponent },
      { path: '**', redirectTo: 'list' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
