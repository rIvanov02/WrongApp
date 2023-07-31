import { Injectable } from '@angular/core';
import { Firestore , collection , addDoc , collectionData, DocumentData,doc,updateDoc } from '@angular/fire/firestore';
import { getDocs } from 'firebase/firestore';
import { User } from '../types/user';
import { Product } from '../types/product';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FireServiceService {

  constructor(private firestore: Firestore) {}
//CRUD OPERATIONS
  
  getUserData() {
    const usersCollection = collection(this.firestore, "users")
    return collectionData(usersCollection)
  }
  

updateUserData(userId:string , newUsername:string , newEmail:string , newPhone:string) { 
  const userDoc = doc(this.firestore, 'users', userId)
  const updatedUserData = {
    username: newUsername,
    email: newEmail, 
    phone:newPhone,
  }
  updateDoc(userDoc , updatedUserData)
}
  

  
getProducts() {
  const productsCollection = collection(this.firestore, "products");
  return collectionData(productsCollection)
}
  
setUser(userId:string , username:string , email:string , phone:string) { 
    const usersCollection = collection(this.firestore, "users")
     addDoc(usersCollection, {
            userId: userId,
            username: username, 
            email: email,
            phone: phone,
            favorites:[]
          })
}
  
  addFavPost(post: Object) { 
    const usersCollection = collection(this.firestore, "users")

    addDoc(usersCollection, {
      favorites:[post]
    })
  }


  removeFavPost(id:string , post:Object) { 
    const documentInstance = doc(this.firestore, 'users', id)
    
  }
  
}
