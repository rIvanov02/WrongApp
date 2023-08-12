import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthActivate } from '../guards/guard.activate';
import { OrdersComponent } from './orders/orders.component';
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: ':userId/profile',
    component: ProfileComponent,
    canActivate: [AuthActivate]
  },
  {
    path: ':userId/orders',
    component: OrdersComponent,
    canActivate: [AuthActivate],
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
