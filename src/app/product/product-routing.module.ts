import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductPageComponent } from './product-page/product-page.component';
import { FavoritesPageComponent } from './favorites-page/favorites-page.component';
import { AuthActivate } from '../guards/guard.activate';

const routes: Routes = [
    {
        path: 'products',
        component: ProductPageComponent
  },
  {
    path: ':userId/favorites',
    component: FavoritesPageComponent,
    canActivate: [AuthActivate]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
