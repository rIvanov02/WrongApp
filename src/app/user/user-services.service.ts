import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FireServiceService } from '../fire/fire-service.service';


@Injectable({
  providedIn: 'root'
})
export class UserServicesService {
  constructor(private firebase: AngularFireAuth, private router: Router , private fire:FireServiceService) {
    
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
       location.reload();
   } catch (error:any) {
     alert(error.message);
     this.router.navigate(['/login']);
    }
  }

  async register(username: string, email: string, phone: string, password: string) { 
    
    try {
      
      await this.firebase.createUserWithEmailAndPassword(email, password)
        .then((res) => { 

          this.fire.setUser(res.user?.uid!, username , email , phone)
         
        })
      this.router.navigate(['/login']);
      
    } catch (error:any) {
      alert(error.message)
      this.router.navigate(['/register'])
    }
  }

  async logout() { 
    await this.firebase.signOut();
    this.isLoggedIn = false;
    localStorage.removeItem('user');
    this.router.navigate([''])
    location.reload();
  }


  
}
