import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/classes/User';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {
  userArray:User[]=[]

  constructor(service:UserService){

    this.userArray=service.getUsers()

  }

}
