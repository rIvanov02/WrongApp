import { Injectable } from '@angular/core';
import { Firestore , collection , addDoc , collectionData, DocumentData,doc,updateDoc } from '@angular/fire/firestore';
import { getDocs } from 'firebase/firestore';
import { User } from '../types/user';
import { Product } from '../types/product';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FireServiceService {

  constructor(private firestore: Firestore, private firestore2: AngularFirestore) { }
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
      favorites: []
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
  addFavProduct(product: Object, userId: string) {
    const userRef = this.firestore2.collection('users').doc<User>(userId).ref;
    userRef.update({
      favorites: firebase.firestore.FieldValue.arrayUnion(product)
    })
  }

  removeFavProduct(product: Object, userId: string) {
    const userRef = this.firestore2.collection('users').doc<User>(userId).ref;
    userRef.update({
      favorites: firebase.firestore.FieldValue.arrayRemove(product)
    })
  }



}
