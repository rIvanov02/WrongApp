import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {

  isLoggedIn = false;
  constructor(private firebase: AngularFireAuth) { }
  
  async logIn(email: string, password: string) { 
    await this.firebase.signInWithEmailAndPassword(email, password)
      .then((res) => { 
        this.isLoggedIn = true;
        localStorage.setItem('user' , JSON.stringify(res.user));
      })
  }

  async register(email:string , password:string) { 
    
    await this.firebase.createUserWithEmailAndPassword(email, password)
      .then((res) => { 
        this.isLoggedIn = true;
        localStorage.setItem('user' , JSON.stringify(res.user));
      })
  }

  async logout() { 
    await this.firebase.signOut();
    this.isLoggedIn = false;
    localStorage.removeItem('user');
  }
}
