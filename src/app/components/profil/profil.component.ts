import { Component } from '@angular/core';
import {UserService} from "../../services/user.service";
import { User } from 'src/classes/User';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {
  userArray:User[]=[]

  constructor(private router:Router,public userService:UserService){

  }
  readMore(){
    this.router.navigate(['/','mesinformations'])
  }

}
