import { Injectable } from '@angular/core';
import {User} from "../../classes/User";
import {Address} from "../../classes/Address";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  public logged_user?: User;
  constructor(public router : Router) {}

  // Vérifie si l'utilisateur est connecté
  user_logged(): boolean {
    return this.logged_user !== undefined;
  }

  // Définit les informations de l'utilisateur connecté
  set_user(username: string, firstname: string, lastname: string, email: string, regdate: Date, address: Address): void {
    this.logged_user = new User(username, firstname, lastname, email, regdate, address);
  }

  // Déconnecte l'utilisateur
  logout(): void {
    this.logged_user = undefined;
    this.router.navigate(['']);
  }
}
