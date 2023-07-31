import { Component, OnInit } from '@angular/core';
import { FireServiceService } from 'src/app/fire/fire-service.service';
import { UserServicesService } from 'src/app/user/user-services.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username:string|undefined
  isLoggedIn:boolean=false


  constructor(private userServices: UserServicesService , private fire:FireServiceService) {
    this.fire.getUserData().then((user) => { 
      this.username = user?.username
    })
   }
  
   
   onLogout(): void { 
     this.userServices.logout();
    }
    
    
  ngOnInit(): void {
    if (localStorage.getItem('user')) { 
      this.isLoggedIn=true
    }
  }
}
