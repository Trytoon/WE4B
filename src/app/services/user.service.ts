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

  arrayuser:User[]=[];

  constructor(private http :HttpClient, private router:Router) {}

  // Vérifie si l'utilisateur est connecté
  user_logged(): boolean {
    return this.logged_user !== undefined;
  }

  // Définit les informations de l'utilisateur connecté
  set_user(id:number,username: string, firstname: string, lastname: string, email: string, regdate: Date, address: Address,password:string,picture:string): void {
    this.logged_user = new User(id,username, firstname, lastname, email, regdate ,address,password,picture);
  }

  // Déconnecte l'utilisateur
  logout(): void {
    this.logged_user = undefined;
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

    this.http.post<any>('http://localhost/projet/src/update.php', data)
      .pipe(
        tap(response => {
          if (response.success == "true") {
            if (response.id && this.logged_user) {
              this.logged_user.address = this.logged_user.address || {};
              this.logged_user.address.id = parseInt(response.id);
          }
            this.router.navigate(['/offer-list']);
          } 
        })
      )
      .subscribe();
  }
}
