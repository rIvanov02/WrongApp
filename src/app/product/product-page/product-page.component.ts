import { Component } from '@angular/core';
import { FireServiceService } from 'src/app/fire/fire-service.service';
import { Product } from 'src/app/types/product';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent {

  get products() { 
    return this.fire.productList
  }

  constructor(private fire: FireServiceService) {
    console.log(this.products)
  }
}
