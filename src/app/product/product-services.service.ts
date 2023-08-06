import { Injectable } from '@angular/core';
import { Product } from '../types/product';


@Injectable({
  providedIn: 'root'
})
export class ProductServicesService {

  

  productList:Product[]|undefined

  constructor() {}

   
}
