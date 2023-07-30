import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms' 
import { ReactiveFormsModule} from '@angular/forms';
import { ProfileComponent } from './profile/profile.component'



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,RouterModule,FormsModule,ReactiveFormsModule
  ]
})
export class UserModule { }
