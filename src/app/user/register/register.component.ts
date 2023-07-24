import { Component } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServicesService } from '../user-services.service'
import { matchPassValidator } from 'src/app/validators/match-passwords-validator';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


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


  constructor(private fb: FormBuilder, private router: Router, private userServices: UserServicesService) { }
  onRegister() {
     
    const { username, email, phone, passGroup: { password, rePassword } = {} } = this.form.value;
    if (this.form.invalid) {
      if (password !== rePassword) {
        alert("Passwords do not match");
      }
      return;
    }

    
    this.userServices.register(email!, password!).then(()=>this.router.navigate(['']));
  
    
  }
}
