import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, findIndex } from 'rxjs';
import { FireServiceService } from 'src/app/fire/fire-service.service';
import { Product } from 'src/app/types/product';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit , OnDestroy {

  products: Observable<any> | undefined
  private subscription: Subscription | undefined
  userData: User | undefined
  isChecked:boolean=true


  constructor(private fire: FireServiceService) {}

  
  onCheckboxChange(event:any , product:any , docId:string) {
    
    if (event.target.checked) {
      const newData = this.userData!['favorites']!.concat([product])
      this.fire.updateLikedProducts(newData,docId)
    } else { 
      if (this.userData!['favorites']!.length<=1) { 
        this.userData!['favorites']!.splice(0,1)
      }
      const index = this.userData!['favorites']!.indexOf(product)
      const newData = this.userData!['favorites']!.splice(index,1)
      this.fire.updateLikedProducts(newData, docId)
    }

  }
  



  ngOnInit(): void {
    this.products = this.fire.getProducts();

    const loggedUserId: string | undefined = (localStorage.getItem('user')?.split('"')[3])
      this.subscription = this.fire.getUserData().subscribe((data) => {
        this.userData = data.find(element => element['userId'] == loggedUserId)
        
      });
    
  }


  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }
}
