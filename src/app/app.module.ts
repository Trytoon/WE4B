import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { OfferComponent } from './components/offer/offer.component';
import { OfferListComponent } from './components/offer-list/offer-list.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink, RouterOutlet} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { ProfilComponent } from './components/profil/profil.component';
import { UserComponent } from './components/user/user.component';
import { User } from 'src/classes/User';







@NgModule({
  declarations: [
    AppComponent,
    OfferComponent,
    OfferListComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    ProfilComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterModule,
    RouterLink,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
