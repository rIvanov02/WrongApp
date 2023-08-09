import { Injectable } from '@angular/core';
import { Firestore , collection , addDoc , collectionData,doc,updateDoc,getDoc } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import 'firebase/compat/firestore';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class FireServiceService {

  constructor(private firestore: Firestore, private firestore2: AngularFirestore ) { }
  //CRUD OPERATIONS
  
  getUserData() {
    const usersCollection = collection(this.firestore, "users")
    return collectionData(usersCollection, { idField: 'id' })
  }
  
  setUser(userId: string, username: string, email: string, phone: string) {
    const usersCollection = collection(this.firestore, "users")
    addDoc(usersCollection, {
      userId: userId,
      username: username,
      email: email,
      phone: phone,
      favorites: [],
      basket: [],
      orders: {},
    })
  }

  updateUserData(docId: string, newUsername: string, newEmail: string, newPhone: string) {
    const userDoc = doc(this.firestore, 'users', docId)
    const updatedUserData = {
      username: newUsername,
      email: newEmail,
      phone: newPhone,
    
    }
    updateDoc(userDoc, updatedUserData)
  }
  

  //Product operations
  getProducts() {
    const productsCollection = collection(this.firestore, "products");
    return collectionData(productsCollection)
  }
  
  
  //ADD AND REMOVE PRODUCT from favorites
  updateLikedProducts(newData: Array<Object>, docId: string) {
    
    const userDoc = doc(this.firestore, 'users', docId)
    
    updateDoc(userDoc, {
      favorites: newData
    })
  }

  updateBasket(newData: Array<Object>, docId: string) {
    
    const userDoc = doc(this.firestore, 'users', docId)
    
    updateDoc(userDoc, {
      basket: newData
    })

   
  }

  async updateOrders(newData: any, docId: string) {
  
    const userDoc = doc(this.firestore, 'users', docId)
    const docSnapshot =  await getDoc(userDoc);
    const currentOrders = docSnapshot!.data()!['orders']! || {};
    

    const orderId = Math.random().toString(26).slice()

        const updatedOrders = {
      ...currentOrders,
      [orderId]: newData,
    };

    updateDoc(userDoc, {
      orders:updatedOrders
    })
  }


}
