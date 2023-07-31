import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FireServiceService } from 'src/app/fire/fire-service.service';
import { Product } from 'src/app/types/product';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  products: Observable<any> | undefined
  
  constructor(private fire: FireServiceService) {}

  
  addRemoveFavPost(post: Object) {
    
    this.fire.addFavPost(post)
  }
  



  ngOnInit(): void {
    this.products = this.fire.getProducts();

  }
}
