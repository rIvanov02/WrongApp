import { Component, OnDestroy, OnInit } from '@angular/core';
import { FireServiceService } from '../fire/fire-service.service';
import { Product } from '../types/product';
import { Subscription } from 'rxjs';
import { User } from '../types/user';
import { DocumentData } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit ,OnDestroy {

  products: Product[] | undefined
  subscription: Subscription | undefined
  userData: User | undefined
  price: number=0

  constructor(private fire: FireServiceService, private toaster: ToastrService) {}
  
  calculateTotalPrice() {
    this.price = 0; 
    if (this.products) {
      for (const item of this.products) {
        this.price += Number(item.price);
      }
    }
    return this.price.toFixed(2)
  }
  
  createOrdersList() {
   
   const newData =  this.products!

    const emptyBasket:Array<Object> =[]
    
    this.fire.updateOrders(newData, this.userData!['id']!);
    this.fire.updateBasket(emptyBasket , this.userData!['id']!)

  }
  
  onDelete(product: Product , products: Product[] | undefined) {
  
    const indexToRemove = this.products!
    .findIndex((item: DocumentData) => item === product);
  
    this.products!.splice(indexToRemove, 1);
    const newData = this.products
    this.fire.updateBasket(newData!, this.userData!.id!)
    this.calculateTotalPrice()
    this.toaster.success('Product removed successfully')
   }

 
  ngOnInit(): void {
    const loggedUserId: string | undefined = (localStorage.getItem('user')?.split('"')[3])
    
    this.subscription = this.fire.getUserData().subscribe((data) => {
      this.userData = data.find(element => element['userId'] == loggedUserId)
      this.products = this.userData!['basket']
    });
   
   
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }
  
}
