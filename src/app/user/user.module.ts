import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CoreModule } from '../core/core.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms' 
import { ReactiveFormsModule} from '@angular/forms'



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,CoreModule,RouterModule,FormsModule,ReactiveFormsModule
  ]
})
export class UserModule { }
