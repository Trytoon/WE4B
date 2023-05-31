import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {OfferListComponent} from "./components/offer-list/offer-list.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import { OfferDetailsComponent } from './components/offer-details/offer-details.component';
import { OfferAddComponent } from './components/offer-add/offer-add.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'offer-add', component: OfferAddComponent},
  { path: 'offer-list', component: OfferListComponent},
  { path: 'offer-list/:index', component: OfferDetailsComponent},
  { path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
