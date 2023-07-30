import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserServicesService } from 'src/app/user/user-services.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  username:string|undefined

  constructor(private userServices: UserServicesService, private router: Router) {
    this.userServices.getUserData().then((user) => { 
      this.username = user?.username
    })
    console.log(this.username)
   }
  
  get isLoggedIn(): boolean { 
    return this.userServices.isLoggedIn
  }

  onLogout(): void { 
    this.userServices.logout();
    this.router.navigate([''])
  }
}
