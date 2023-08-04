import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductPageComponent } from './product-page/product-page.component';
import { RouterModule } from '@angular/router';
import { ProductRoutingModule } from './product-routing.module';
import { FavoritesPageComponent } from './favorites-page/favorites-page.component';
import { MatDialogModule} from '@angular/material/dialog';
import { PopUpDetailsComponent } from './pop-up-details/pop-up-details.component'


@NgModule({
  declarations: [
    ProductPageComponent,
    FavoritesPageComponent,
    PopUpDetailsComponent
  ],
  imports: [
    CommonModule,RouterModule,ProductRoutingModule,MatDialogModule
  ],

})
export class ProductModule { }
