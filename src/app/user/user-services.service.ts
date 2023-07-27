import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { User } from '../types/user';
import { Firestore , collection , addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {
  constructor(private firebase: AngularFireAuth , private router: Router ,private firestore: Firestore ) { }

  isLoggedIn = false;
  user: User = {}

  
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
    this.user.username = username
    this.user.email = email
    this.user.phone = phone
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
      
    } catch (error:any) {
      alert(error.message)
    }
  }

  async logout() { 
    await this.firebase.signOut();
    this.isLoggedIn = false;
    localStorage.removeItem('user');
  }
}
