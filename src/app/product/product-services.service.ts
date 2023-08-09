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
  
 

}
