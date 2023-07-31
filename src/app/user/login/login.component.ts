import { Component } from '@angular/core';
import { UserServicesService } from '../user-services.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor( private userService: UserServicesService,private router : Router) { }
  
  onLogin(form: NgForm) { 
    const { email, password } = form.value

    if (form.invalid) { return }

      this.userService.logIn(email, password)
      this.router.navigate(['']);
  }
}
