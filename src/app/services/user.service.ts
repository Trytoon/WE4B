import { Injectable } from '@angular/core';
import { Address } from 'src/classes/Address';
import { User } from 'src/classes/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user : User;

  constructor() { 
    this.user = this.getUser();
  }

  getUser() : User {
    return new User('The Rock', 'John', 'Doe', 'john.doe@gmail.com', new Date('31/05/2023'), new Address(4, 'Privet Drive', 'Little Whinging', '04242'));
  }

}
