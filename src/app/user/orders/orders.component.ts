import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FireServiceService } from 'src/app/fire/fire-service.service';
import { Product } from 'src/app/types/product';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy {
  

  subscription: Subscription | undefined
  userData: User | undefined
  orders: { [key: string]: any[] } | undefined
  
  calculatePrice(order: Product[]) {
    let price=0
    for (const product of order) {
      price+=product.price!
    }
    return price.toFixed(2)
   }
  
  constructor(private fire: FireServiceService) {
   
   }

  ngOnInit(): void {
    const loggedUserId: string | undefined = (localStorage.getItem('user')?.split('"')[3])
    
    this.subscription = this.fire.getUserData().subscribe((data) => {
      this.userData = data.find(element => element['userId'] == loggedUserId)
      this.orders =this.userData!['orders']
      console.log(this.orders)
    });
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }
}
