import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FireServiceService } from 'src/app/fire/fire-service.service';
import { UserServicesService } from 'src/app/user/user-services.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy {

  username:string|undefined
  isLoggedIn:boolean=false
  private subscription: Subscription|undefined

  constructor(private userServices: UserServicesService, private fire: FireServiceService) {
    
    
  }
  
   
   onLogout(): void { 
     this.userServices.logout();
    }
  ngOnInit(): void {
    if (localStorage.getItem('user')) { 
      this.isLoggedIn=true
    }

    const loggedUserId: string | undefined = (localStorage.getItem('user')?.split('"')[3])
    this.subscription =this.fire.getUserData().subscribe((data) => { 
      this.username = data.find(element => element['userId'] == loggedUserId)!['username']
    })
  }

  ngOnDestroy(): void {
    this.subscription!.unsubscribe()
  }
  
}
