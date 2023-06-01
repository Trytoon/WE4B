import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Route } from '@angular/router';

import{ProfilComponent} from 'src/app/components/profil/profil.component';
import { OfferComponent } from './components/offer/offer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { OfferListComponent } from './components/offer-list/offer-list.component';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { User } from 'src/classes/User';

const routes:Routes=[
  {path:'profil',component:ProfilComponent},
  {path:'mesinformations/:id',component:UserComponent},
  {path:'footer',component:FooterComponent},
  {path:'offerlist',component:OfferListComponent},
  { path: "", redirectTo: "/profil", pathMatch: "full" },

]

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
