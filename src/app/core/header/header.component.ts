import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserServicesService } from 'src/app/user/user-services.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  get user() { 
    return this.userServices.user
  }

  constructor(private userServices: UserServicesService, private router: Router) { }
  
  get isLoggedIn(): boolean { 
    return this.userServices.isLoggedIn
  }

  onLogout(): void { 
    this.userServices.logout();
    this.router.navigate([''])
  }
}
