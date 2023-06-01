import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/classes/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {
  userArray:User[]=[]

  constructor(private router:Router,service:UserService){

    

    this.userArray=service.getUsers()


    


  }
  readMore(){
    this.router.navigate(['/','mesinformations',0])
  }
  

}
