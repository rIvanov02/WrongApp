import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductServicesService } from '../product-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FireServiceService } from 'src/app/fire/fire-service.service';
import { Product } from 'src/app/types/product';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/types/user';
@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent implements OnInit , OnDestroy {

  product: Product | undefined;
  subscription: Subscription | undefined
  userData:User|undefined
  
  constructor(private productService: ProductServicesService,
    private fire: FireServiceService, private activatedRoute: ActivatedRoute,
    private toastr: ToastrService ,private router:Router
  ) { }
  

  moveImage(index: number): void {
    const imgToShowcase = document.querySelector('.img-showcase');
    const imgToMove = document.querySelector(`.img-item:nth-child(${index + 1}) img`);
    
    if (imgToShowcase && imgToMove) {
      const clonedImg = imgToMove.cloneNode(true) as HTMLImageElement;
      imgToShowcase.insertBefore(clonedImg, imgToShowcase.firstChild);
    }
  }
  addInBasket(product: Product) {
    if (!this.userData) { 
      this.router.navigate(['/login'])
      return
    }
    try {
      let newData = this.userData!['basket']!.concat([product])
      this.fire.updateBasket(newData, this.userData!['id']!)

      this.toastr.success('Product added successfully')
    } catch (error) {
      this.toastr.error("Something went wrong")
    }
  }

  ngOnInit(): void {
   
    let productId = this.activatedRoute.snapshot.paramMap.get('docId');


    this.subscription = this.fire.getProducts().subscribe((product) => { 
      this.product = product.find((element) => element['docId'] == productId)
      
     this.product = product.find((element)=> element['docId']==productId)
     
   })
    
   const loggedUserId: string | undefined = (localStorage.getItem('user')?.split('"')[3])
   this.fire.getUserData().subscribe((data) => {
     this.userData = data.find(element => element['userId'] == loggedUserId)
   });
 }

  ngOnDestroy(): void {
    this.subscription!.unsubscribe();
  }
}
