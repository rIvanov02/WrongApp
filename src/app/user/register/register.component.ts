import { Component } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { UserServicesService } from '../user-services.service'
import { matchPassValidator } from 'src/app/validators/match-passwords-validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  constructor(private fb: FormBuilder, private userServices: UserServicesService , private router:Router) { }
    
  form = this.fb.group({
    username: ['' , [Validators.required , Validators.minLength(5)]],
    email: ['' , [Validators.required ]],
    phone: [''],
    passGroup: this.fb.group({
      password: ['' , [Validators.required]],
      rePassword: ['', [Validators.required]],
    },
      {
        validators:[matchPassValidator('password','rePassword')]
      }
    )
  })

  onRegister() {
     
    const { username, email, phone, passGroup: { password, rePassword } = {} } = this.form.value;
    if (this.form.invalid) {
      if (password !== rePassword) {
        alert("Passwords do not match");
      }
      return;
    }
    this.userServices.register(username!, email!, phone!, password!)
  }
}
