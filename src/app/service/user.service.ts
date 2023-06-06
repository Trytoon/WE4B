import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Address } from 'src/classes/Address';
import { User } from 'src/classes/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public logged_user?: User;

  arrayuser:User[]=[];

  constructor(private http :HttpClient, private router:Router) { }


  modifyuser(user:User):void{

    const data = {
      username:user.nickname,
      password: user.password,
      lastname  :user.last_name,
      firstname:user.first_name,
      email:user.email,
      id:user.id,
      streetnumber:user.address.number,
      street:user.address.street,
      zip:user.address.zip_code,
      city:user.address.city,
      adressid:user.address.id,
      picture:user.picture


    };

    this.http.post<any>('http://localhost/src/projet/update.php', data)
      .pipe(
        tap(response => {
          if (response.success == "true") {
            if (response.user) {
              
                console.log("ameno")
            }
            this.router.navigate(['/offer-list']);
          } else {
            console.log("aie aie aie")

          }
        })
      )
      .subscribe();
  }

  getUsers():User[]{
    this.arrayuser.push(new User(
        0,
        "Thomas",
        "Thomas",
        "FRIDBLATT",
        "thomas.fridblatt@gmail.com",
        new Date("07/11/2017"), 
        new Address(1,66,"rue du chalet","reims","51100"),
        "testmdp",
        "assets/profilpictures/nouser.png")
        )

    return this.arrayuser;
  }


  getuser2(user: User ): void {
    console.log("the new first name is ",user.first_name);
    console.log("the new last name is ",user.last_name);
    console.log("the new email is ",user.email);
    console.log("the new nickname is ",user.nickname);
    console.log("the new mdp is",user.password);
    console.log("the new adress is the",user.address.number,"of the street",user.address.street);
    console.log("it takes place in ",user.address.city,"with a zip code of ",user.address.zip_code)


  }

  getuserByIndex(id : number): User{

    return this.arrayuser[id]
   }


   savePhoto(formData: FormData) {
    return this.http.post('api/savePhoto', formData);
  }


  user_logged(): boolean {
    return this.logged_user !== undefined;
  }

  // Définit les informations de l'utilisateur connecté
  set_user(id:number,username: string, firstname: string, lastname: string, email: string, regdate: Date, address: Address,password:string,picture:string): void {
    this.logged_user = new User(id,username, firstname, lastname, email, regdate, address,password,picture);
  }

  // Déconnecte l'utilisateur
  logout(): void {
    this.logged_user = undefined;
  }



}
