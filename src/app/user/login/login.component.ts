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

  constructor( private userService: UserServicesService,) { }
  
  onLogin(form: NgForm) { 
    debugger
    const { email, password } = form.value

    if (form.invalid) { return }

      this.userService.logIn(email, password)

  }
}
