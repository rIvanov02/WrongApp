import { Injectable } from '@angular/core';
import { Firestore , collection , addDoc , collectionData, DocumentData,doc,updateDoc } from '@angular/fire/firestore';
import { getDocs } from 'firebase/firestore';
import { User } from '../types/user';
import { Product } from '../types/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FireServiceService {

  constructor(private firestore: Firestore) {
    this.getProducts()
  }
//CRUD OPERATIONS
async getUserData(): Promise< User | undefined>{
  const loggedUserId: string | undefined = (localStorage.getItem('user')?.split('"')[3])
  const usersCollection = collection(this.firestore, "users")
  const snapshot = await getDocs(usersCollection)
  const usersData = snapshot.docs.map(doc => doc.data() as User);
  const loggedUserData = usersData.find(element => element['userId'] == loggedUserId)
  const userData: User | undefined = {
    username: loggedUserData?.username,
    email: loggedUserData?.email,
    phone: loggedUserData?.phone,
    userId: loggedUserData?.userId
  }
  return userData
  
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
  
  productList!: Observable<any>
  
getProducts() {
  const productsCollection = collection(this.firestore, "products");
  this.productList = collectionData(productsCollection)
}
  
  setUser(userId:string , username:string , email:string , phone:string) { 
    const usersCollection = collection(this.firestore, "users")
     addDoc(usersCollection, {
            userId: userId,
            username: username, 
            email: email,
            phone: phone,
          })
  }
}
