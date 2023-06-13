/*
Module de gestion de l'utilisateur.
Regroupe toutes les fonctions qui permettent de gerer l'authentification sur le site au niveau du client
Utilise le LocalStorage définit par Angular pour permettre de rester authentifié même en rechargeant la page
Equivalent de la serialisation dans Java
 */


import { Injectable } from '@angular/core';
import {User} from "../../classes/User";
import {Address} from "../../classes/Address";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  public logged_user?: User;
  private loggedUserKey = 'loggedUser'

  // Charge les données de l'utilisateur connecté lors de l'initialisation du service
  constructor(public router: Router) {
    this.loadLoggedUser();
  }

  // Vérifie si l'utilisateur est connecté
  user_logged(): boolean {
    return this.logged_user !== undefined;
  }

  // Définit les informations de l'utilisateur connecté
  set_user(username: string, firstname: string, lastname: string, email: string, regdate: Date, address: Address): void {
    const user = new User(username, firstname, lastname, email, regdate, address);
    this.logged_user = user;
    this.saveLoggedUser();
  }

  // Déconnecte l'utilisateur
  logout(): void {
    this.logged_user = undefined;
    this.removeLoggedUser(); // Supprime les données de localStorage
    this.router.navigate(['']);
  }

  // Charge les données de l'utilisateur connecté depuis localStorage
  private loadLoggedUser(): void {
    const userJson = localStorage.getItem(this.loggedUserKey);
    if (userJson) {
      this.logged_user = JSON.parse(userJson);
    }
  }

  // Enregistre les données de l'utilisateur connecté dans localStorage
  private saveLoggedUser(): void {
    if (this.logged_user) {
      const userJson = JSON.stringify(this.logged_user);
      localStorage.setItem(this.loggedUserKey, userJson);
    }
  }

  // Supprime les données de l'utilisateur connecté de localStorage
  private removeLoggedUser(): void {
    localStorage.removeItem(this.loggedUserKey);
  }
}
