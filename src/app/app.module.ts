import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireAuthModule } from '@angular/fire/compat/auth'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';
import { HomeComponent } from './home/home.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { environment } from './environment/environment.prod';
import { ProductModule } from './product/product.module';
import { UserServicesService } from './user/user-services.service';
import { ProductServicesService } from './product/product-services.service';
import { FireServiceService } from './fire/fire-service.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseDB),AngularFireAuthModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseDB)), provideFirestore(() => getFirestore()),
    CoreModule,UserModule,ProductModule
  ],
  providers:[FireServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
