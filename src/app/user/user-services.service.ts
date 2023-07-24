import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserServicesService {

  isLoggedIn = false;
  constructor(private firebase: AngularFireAuth , private router: Router) { }
  
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

  async register(email:string , password:string) { 
    try {
      await this.firebase.createUserWithEmailAndPassword(email, password)
        .then((res) => { 
          this.isLoggedIn = true;
          localStorage.setItem('user' , JSON.stringify(res.user));
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
