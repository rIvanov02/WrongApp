import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireAuthModule } from '@angular/fire/compat/auth'
import { FormsModule } from '@angular/forms' 
import { ReactiveFormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from './environment/environment.prod';
import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';
import { UserRoutingModule } from './user/user-routing.module';
import { HomeComponent } from './home/home.component';
import { UserServicesService } from './user/user-services.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase), AngularFireAuthModule,
    CoreModule,
    UserModule, UserRoutingModule,FormsModule,ReactiveFormsModule
    
  ],
  providers: [UserServicesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
