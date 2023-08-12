import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductPageComponent } from './product-page/product-page.component';
import { FavoritesPageComponent } from './favorites-page/favorites-page.component';
import { AuthActivate } from '../guards/guard.activate';
import { DetailsPageComponent } from './details-page/details-page.component';

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
  {
    path: 'products/:docId',
    component: DetailsPageComponent
  },
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
