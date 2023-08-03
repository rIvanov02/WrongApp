import { Component, OnDestroy, OnInit } from '@angular/core';
import { DocumentData } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';
import { FireServiceService } from 'src/app/fire/fire-service.service';
import { Product } from 'src/app/types/product';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.css']
})
export class FavoritesPageComponent implements OnInit , OnDestroy {


  private subscription: Subscription | undefined
  likedProducts:[]|undefined
  userData:User|undefined
  
  constructor(private fire: FireServiceService) { }


  removeFavorite( id: string) { 
    
    const indexToRemove = this.userData!['favorites']!
      .findIndex((product: DocumentData) => product['docId'] === id);
    
      this.userData!.favorites!.splice(indexToRemove, 1);
       const newData= this.userData!.favorites!
      this.fire.updateLikedProducts(newData, this.userData!['id']!)
    
  }
  
  ngOnInit(): void {
    const loggedUserId: string | undefined = (localStorage.getItem('user')?.split('"')[3])
    this.subscription = this.fire.getUserData().subscribe((data) => { 
      this.userData = data.find(element => element['userId'] == loggedUserId)
      this.likedProducts = data.find(element => element['userId'] == loggedUserId)!['favorites']
    })
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
