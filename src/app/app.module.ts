import { NgModule } from '@angular/core';
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
import { OfferDetailsComponent } from './components/offer-details/offer-details.component';
import { OfferAddComponent } from './components/offer-add/offer-add.component';
import { HomeComponent } from './components/home/home.component';
import { FilterComponent } from './components/filter/filter.component';


@NgModule({
  declarations: [
    AppComponent,
    OfferComponent,
    OfferListComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    OfferDetailsComponent,
    OfferAddComponent,
    HomeComponent,
    FilterComponent,
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
