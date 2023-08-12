import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireAuthModule } from '@angular/fire/compat/auth'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';
import { HomeComponent } from './home/home.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore,provideFirestore } from '@angular/fire/firestore';
import { environment } from './environment/environment.prod';
import { ProductModule } from './product/product.module';
import { FireServiceService } from './fire/fire-service.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BasketComponent } from './basket/basket.component';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BasketComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseDB),AngularFireAuthModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseDB)), provideFirestore(() => getFirestore()),
    CoreModule, UserModule, ProductModule, BrowserAnimationsModule,
    ToastrModule.forRoot(), 
    SharedModule,
    AppRoutingModule
  ],
  providers:[FireServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
