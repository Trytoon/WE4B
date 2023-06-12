import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {OfferListComponent} from "./components/offer-list/offer-list.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {OfferAddComponent} from "./components/offer-add/offer-add.component";
import {OfferDetailsComponent} from "./components/offer-details/offer-details.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'offer-list', component: OfferListComponent},
  { path: 'add-offer', component: OfferAddComponent},
  { path: 'offer-list/:index', component: OfferDetailsComponent},
  { path: 'user-profile/:page', component: OfferListComponent},
  { path: 'user-profile', component: NavbarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
