import { Component } from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {
  constructor(public userService : UserService, public router : Router){
    if (!userService.user_logged()) {
      this.router.navigate([''])
    }
  }
}
