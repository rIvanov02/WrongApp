import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductPageComponent } from './product-page/product-page.component';
import { RouterModule } from '@angular/router';
import { ProductRoutingModule } from './product-routing.module';
import { FavoritesPageComponent } from './favorites-page/favorites-page.component';



@NgModule({
  declarations: [
    ProductPageComponent,
    FavoritesPageComponent
  ],
  imports: [
    CommonModule,RouterModule,ProductRoutingModule
  ],

})
export class ProductModule { }
