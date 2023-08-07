import { Component, OnDestroy, OnInit } from '@angular/core';
import { FireServiceService } from '../fire/fire-service.service';
import { Product } from '../types/product';
import { Subscription } from 'rxjs';
import { User } from '../types/user';
import { ProductModule } from '../product/product.module';
import { DocumentData } from '@angular/fire/firestore';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit ,OnDestroy {

  products: Product[] | undefined
  subscription: Subscription | undefined
  userData: User | undefined
  price: number | undefined;

  constructor(private fire: FireServiceService) {
    
   }
  
  onDelete(product: Product) {
    const indexToRemove = this.products!
    .findIndex((item: DocumentData) => item === product);
  
    this.products!.splice(indexToRemove, 1);
    const newData = this.products
    this.fire.updateBasket(newData!,this.userData!.id!)
   }

 
  ngOnInit(): void {
    const loggedUserId: string | undefined = (localStorage.getItem('user')?.split('"')[3])
    let x:number=0
    this.subscription = this.fire.getUserData().subscribe((data) => {
      this.userData = data.find(element => element['userId'] == loggedUserId)
      this.products = this.userData!['basket']

      for (const item of this.products!) {
        x = x + Number(item.price!);
      }
      this.price=x
    });
    
    
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }
  
}
