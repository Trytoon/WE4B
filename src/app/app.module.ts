import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { OfferComponent } from './components/offer/offer.component';
import { OfferListComponent } from './components/offer-list/offer-list.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfilComponent } from './components/profil/profil.component';
import { UserComponent } from './components/user/user.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, RouterLink,RouterOutlet } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";




@NgModule({
  declarations: [
    AppComponent,
    OfferComponent,
    OfferListComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    ProfilComponent,
    UserComponent,


    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterLink,
    RouterOutlet,
    AppRoutingModule,
    FormsModule

    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
