import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {OfferListComponent} from "./components/offer-list/offer-list.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import { ProfilComponent } from './components/profil/profil.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'offer-list', component: OfferListComponent },
  { path: '', component: NavbarComponent },
  { path:'profil',component:ProfilComponent },
  { path:'mesinformations',component:UserComponent },


];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ],


})
export class AppRoutingModule { }
