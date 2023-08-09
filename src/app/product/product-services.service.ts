import { Injectable } from '@angular/core';
import { Product } from '../types/product';
import { FireServiceService } from '../fire/fire-service.service';
import { User } from '../types/user';


@Injectable({
  providedIn: 'root'
})
export class ProductServicesService {

  userData: User|undefined

  productList:Product[]|undefined

  constructor(private fire: FireServiceService) { }
  
  addProductInBasket(product: Product) {
  
    const loggedUserId: string | undefined = (localStorage.getItem('user')?.split('"')[3])
    this.fire.getUserData().subscribe((data) => {
      this.userData = data.find(element => element['userId'] == loggedUserId)
    });

    let newData = this.userData!['basket']!.concat([product])
    this.fire.updateBasket(newData , this.userData!['id']!)
   }

}
