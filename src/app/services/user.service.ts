/*
Module de gestion de l'utilisateur.
Regroupe toutes les fonctions qui permettent de gerer l'authentification sur le site au niveau du client
Utilise le LocalStorage définit par Angular pour permettre de rester authentifié même en rechargeant la page
Equivalent de la serialisation dans Java
 */


import { Injectable } from '@angular/core';
import {User} from "../../classes/User";
import {Address} from "../../classes/Address";
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  public logged_user?: User;
  private loggedUserKey = 'loggedUser'

  // Charge les données de l'utilisateur connecté lors de l'initialisation du service
  constructor(private http :HttpClient, public router: Router) {
    this.loadLoggedUser();
  }

  // Vérifie si l'utilisateur est connecté
  user_logged(): boolean {
    return this.logged_user !== undefined;
  }

  // Définit les informations de l'utilisateur connecté
  set_user(id:number,username: string, firstname: string, lastname: string, email: string, regdate: Date, address: Address,password:string,picture:string): void {
    const user = new User(id,username, firstname, lastname, email, regdate ,address,password,picture);
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

  //Modifie les données de l'utilisateur dans la base de données
  modifyuser(user:User):void{

    const data = {
      username: user.nickname,
      password: user.password,
      lastname: user.last_name,
      firstname: user.first_name,
      email: user.email,
      id: user.id,
      streetnumber: user.address?.number,
      street: user.address?.street,
      zip: user.address?.zip_code,
      city: user.address?.city,
      adressid: user.address?.id,
      picture: user.picture


    };

    this.http.post<any>('http://localhost/we4b_jkimenau_echaussoy_tfridblatt/update.php', data)
      .pipe(
        tap(response => {
          if (response.success == "true") {
            if (response.id && this.logged_user) {
              this.logged_user.address = this.logged_user.address || {};
              this.logged_user.address.id = parseInt(response.id);
          }
            this.router.navigate(['/user-profile']);
          }
        })
      )
      .subscribe();
  }
}
