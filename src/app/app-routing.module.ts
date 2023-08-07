import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BasketComponent } from './basket/basket.component';
import { AuthActivate } from './guards/guard.activate';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full', 
    component: HomeComponent
  },
  {
    path: ':userId/basket',
    component: BasketComponent,
    canActivate: [AuthActivate]
  }
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
