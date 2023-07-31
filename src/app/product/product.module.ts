import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductPageComponent } from './product-page/product-page.component';
import { RouterModule } from '@angular/router';
import { ProductRoutingModule } from './product-routing.module';



@NgModule({
  declarations: [
    ProductPageComponent
  ],
  imports: [
    CommonModule,RouterModule,ProductRoutingModule
  ],

})
export class ProductModule { }
