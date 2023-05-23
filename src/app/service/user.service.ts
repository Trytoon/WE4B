import { Injectable } from '@angular/core';
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
        "Thomas",
        "Thomas",
        "FRIDBLATT",
        "thomas.fridblatt@gmail.com",
        new Date("07/11/2017"), 
        new Address(66,"rue du chalet","reims","51100"))
        )

    return this.arrayuser;
  }
}
