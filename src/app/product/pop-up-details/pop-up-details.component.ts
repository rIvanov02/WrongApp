import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/types/product';
import { ViewEncapsulation } from '@angular/core';
import { ProductServicesService } from '../product-services.service';
import { ToastrService } from 'ngx-toastr';
import { AuthActivate } from 'src/app/guards/guard.activate';
import { Router } from '@angular/router';
import { FireServiceService } from 'src/app/fire/fire-service.service';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-pop-up-details',
  templateUrl: './pop-up-details.component.html',
  styleUrls: ['./pop-up-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PopUpDetailsComponent implements OnInit , OnDestroy {
  [x: string]: any;

  product: Product | undefined;
  selectedIndex = 0;
  indicators = true;
  controls = true;
  userData: User | undefined

  constructor(@Inject(MAT_DIALOG_DATA) public data: Product,
    public dialogRef: MatDialogRef<PopUpDetailsComponent>,
    private fire: FireServiceService,
    private toaster: ToastrService, private router: Router
  ) {
    this.product = data
  }

  addInBasket(product: Product) {
    if (!this.userData) { 
      this.close()
      this.router.navigate(['/login'])
      return
    }
    try {
      let newData = this.userData!['basket']!.concat([product])
      this.fire.updateBasket(newData, this.userData!['id']!)

      this.toaster.success('Product added successfully')
    } catch (error) {
      this.toaster.error("Something went wrong")
    }
  }

  close() {
    this.dialogRef.close()
  }

  onPrevClick() {
    if (this.selectedIndex === 0) {
      this.selectedIndex = this.product!['img']!.length - 1;
    } else {
      this.selectedIndex--;
    }

  }

  onNextClick() {
    if (this.selectedIndex === this.product!['img']!.length - 1) {
      this.selectedIndex = 0
    } else {
      this.selectedIndex++;
    }
  }


  ngOnInit(): void {

    const loggedUserId: string | undefined = (localStorage.getItem('user')?.split('"')[3])
    this.fire.getUserData().subscribe((data) => {
      this.userData = data.find(element => element['userId'] == loggedUserId)
    });
  }

  ngOnDestroy(): void {
    
  }
}
