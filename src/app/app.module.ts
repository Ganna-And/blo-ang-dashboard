import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import {  AngularFirestoreModule } from '@angular/fire/compat/firestore';
import {FormsModule, ReactiveFormsModule} from'@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { environment } from 'environments/environment.prod';
import { CategoriesComponent } from './categories/categories.component';
import{ToastrModule} from'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AllPostComponent } from './posts/all-post/all-post.component';
import { NewPostComponent } from './posts/new-post/new-post.component';
import {AngularEditorModule} from'@kolkov/angular-editor'
import { HttpClientModule} from '@angular/common/http';
import{AngularFireStorageModule} from '@angular/fire/compat/storage';
import { LoginComponent } from './auth/login/login.component'
import {AngularFireAuthModule} from'@angular/fire/compat/auth';
import { SubscribersComponent } from './subscribers/subscribers.component'


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    CategoriesComponent,
    AllPostComponent,
    NewPostComponent,
    LoginComponent,
    SubscribersComponent
  ],
  imports: [
    BrowserModule,  
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AppRoutingModule,
    AngularFirestoreModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    AngularEditorModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    AngularFireAuthModule
    
  
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
