import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserServicesService } from '../user-services.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router, private userService: UserServicesService,) { }
  
  onLogin(form:NgForm) { 
    if (form.invalid) { return }

    const { email, password } = form.value
    
    this.userService.logIn(email, password).then(() =>{
      this.router.navigate([''])
     }) 

  }
}
