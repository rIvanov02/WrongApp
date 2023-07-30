import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { User } from '../types/user';
import { Firestore , collection , addDoc , collectionData, DocumentData,doc,updateDoc } from '@angular/fire/firestore';
import { getDocs } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {
  constructor(private firebase: AngularFireAuth, private router: Router, private firestore: Firestore) {
    
  }

  isLoggedIn = false;


  // USER OPERATIONS

  async logIn(email: string, password: string) { 
   try {
     await this.firebase.signInWithEmailAndPassword(email, password)
       .then((res) => { 
         this.isLoggedIn = true;
         localStorage.setItem('user' , JSON.stringify(res.user));
       })
     
     this.router.navigate(['']);
    
   } catch (error:any) {
     alert(error.message);
     this.router.navigate(['/login']);
   }
  }

  async register(username: string, email: string, phone: string, password: string) { 
    const usersCollection = collection(this.firestore, "users")
    try {
      
      await this.firebase.createUserWithEmailAndPassword(email, password)
        .then((res) => { 
          this.isLoggedIn = true;
          localStorage.setItem('user', JSON.stringify(res.user));
          addDoc(usersCollection, {
            userId: res.user?.uid,
            username: username, 
            email: email,
            phone: phone,
          })
        })
      this.router.navigate(['']);
      
    } catch (error:any) {
      alert(error.message)
      this.router.navigate(['/register'])
    }
  }

  async logout() { 
    await this.firebase.signOut();
    this.isLoggedIn = false;
    localStorage.removeItem('user');
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
}
