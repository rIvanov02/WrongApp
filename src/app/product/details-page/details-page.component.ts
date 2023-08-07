import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductServicesService } from '../product-services.service';
import { ActivatedRoute } from '@angular/router';
import { FireServiceService } from 'src/app/fire/fire-service.service';
import { Product } from 'src/app/types/product';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent implements OnInit , OnDestroy {

  product: Product | undefined;
  subscription: Subscription|undefined
  
  constructor(private productService: ProductServicesService,
    private fire: FireServiceService, private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) { }
  
  
  images = {
    img: [
      'image1.jpg',
      'image2.jpg',
      'image3.jpg',
      'image4.jpg'
    ]
  };

  moveImage(index: number): void {
    const imgToShowcase = document.querySelector('.img-showcase');
    const imgToMove = document.querySelector(`.img-item:nth-child(${index + 1}) img`);
    
    if (imgToShowcase && imgToMove) {
      const clonedImg = imgToMove.cloneNode(true) as HTMLImageElement;
      imgToShowcase.insertBefore(clonedImg, imgToShowcase.firstChild);
    }
  }
  addToBasket(product: Product): void{ 
   
    try {
      this.productService.addProductInBasket(product)
      this.toastr.success('Product added successfully')
    } catch (error) {
      this.toastr.error('Something went wrong')
    }
  }

  ngOnInit(): void {
   
    let productId = this.activatedRoute.snapshot.paramMap.get('docId');

   this.subscription=this.fire.getProducts().subscribe((product) => { 
     this.product = product.find((element)=> element['docId']==productId)
     
   })
    
  }
  
  ngOnDestroy(): void {
    this.subscription!.unsubscribe();
  }
}
