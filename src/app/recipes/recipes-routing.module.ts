import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { AddRecipePageComponent } from './pages/add-recipe-page/add-recipe-page.component';
import { RecipeListPageComponent } from './pages/recipe-list-page/recipe-list-page.component';

const routes: Routes = [

  { path: '**', redirectTo: 'recipe-list' },
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'add-recipe', component: AddRecipePageComponent },
      { path: 'recipe-list', component: RecipeListPageComponent },
      // { path: 'edit/:id', component: NewPageComponent },
      // { path: 'list', component: ListPageComponent },
      // { path: ':id', component: HeroPageComponent },
      { path: '**', redirectTo: 'recipe-list' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
