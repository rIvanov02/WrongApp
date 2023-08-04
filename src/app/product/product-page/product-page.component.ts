import { Component, OnDestroy, OnInit } from '@angular/core';
import { DocumentData } from '@angular/fire/compat/firestore';
import { Observable, Subscription, findIndex } from 'rxjs';
import { FireServiceService } from 'src/app/fire/fire-service.service';
import { Product } from 'src/app/types/product';
import { User } from 'src/app/types/user';
import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PopUpDetailsComponent } from '../pop-up-details/pop-up-details.component';


@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit , OnDestroy {

  products: Observable<any> | undefined
  private subscription: Subscription | undefined
  userData: User | undefined
  isChecked: boolean =false
  


  constructor(private fire: FireServiceService , public dialog:MatDialog ) {}

  openDialog(product: Product) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.hasBackdrop = true;
    dialogConfig.backdropClass='backDrop'
    dialogConfig.autoFocus = true;
    dialogConfig.data = product;

    let dialogRef = this.dialog.open(PopUpDetailsComponent, dialogConfig)
  

   }
  
  onCheckboxChange(event: any, product: any, docId: string) {
    
    let newData = undefined
    if (event.target.checked) {
      newData = this.userData!['favorites']!.concat([product])
      
    } else { 
      const index = this.userData!['favorites']!.findIndex((element:DocumentData) =>element['docId']==product['docId'] )
      
      this.userData!['favorites']!.splice(index, 1)
      newData = this.userData!['favorites']!
      
    }
    this.fire.updateLikedProducts(newData, docId)
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
