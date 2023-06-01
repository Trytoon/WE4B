import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Address } from 'src/classes/Address';
import { User } from 'src/classes/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  arrayuser:User[]=[];

  constructor() { }

  getUsers():User[]{
    this.arrayuser.push(new User(
        0,
        "Thomas",
        "Thomas",
        "FRIDBLATT",
        "thomas.fridblatt@gmail.com",
        new Date("07/11/2017"), 
        new Address(66,"rue du chalet","reims","51100"),
        "testmdp")
        )

    return this.arrayuser;
  }


  modifyuser(user: User ): void {
    console.log("the new first name is ",user.first_name);
    console.log("the new last name is ",user.last_name);
    console.log("the new email is ",user.email);
    console.log("the new nickname is ",user.nickname);
    console.log("the new mdp is",user.password)


  }

  getuserByIndex(id : number): User{

    return this.arrayuser[id]
   }
}
