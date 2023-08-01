import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FireServiceService } from 'src/app/fire/fire-service.service';
import { AuthActivate } from 'src/app/guards/guard.activate';
import { UserServicesService } from 'src/app/user/user-services.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy {

  username:string|undefined
  isLoggedIn:boolean|undefined
  private subscription: Subscription|undefined

  constructor(private userServices: UserServicesService, private fire: FireServiceService , private auth:AuthActivate) {
    
    
  }
  
   
   onLogout(): void { 
     this.userServices.logout();
    }
  ngOnInit(): void {
    localStorage.getItem('user')?this.isLoggedIn=true:this.isLoggedIn=false
    const loggedUserId: string | undefined = (localStorage.getItem('user')?.split('"')[3])

    this.subscription =this.fire.getUserData().subscribe((data) => { 
      this.username = data.find(element => element['userId'] == loggedUserId)!['username']
    })
  }

  ngOnDestroy(): void {
    this.subscription!.unsubscribe()
  }
  
}
