import { Component } from '@angular/core';
import { FormBuilder,NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServicesService} from '../user-services.service'



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  form = this.fb.group({
    username: [''],
    email: [''],
    phone: [''],
    passGroup: this.fb.group({
      password: [''],
      rePassword: [''],
    })
  })


  constructor(private fb: FormBuilder, private router: Router, private userServices: UserServicesService) { }
  
   onRegister() { 
    if (this.form.invalid) { 
      return;
    }
    const { username, email, phone, passGroup: { password, rePassword } = {} } = this.form.value;

     this.userServices.register(email!, password!).then(() => { this.router.navigate([''])})
  }
}
