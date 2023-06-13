import { Component, OnInit, Input, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/classes/User';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() user!: User;

  verificationmdp: boolean = true

  password: string = ''
  confirmpassword: string = '';
  picture: string = "";
  finalpicture: string[] = [];



  constructor(public service: UserService, private router: Router,) {

    if (this.service.logged_user !== undefined) {
      this.user = this.service.logged_user;
    }
  }

  ngOnInit(): void {

  }

  onSubmit(): void {

    //Verification des mots de passe
    this.verificationmdp = true

    if (this.password != "" && this.confirmpassword != "") {

      if (this.password == this.confirmpassword) {
        if (this.password.length > 7) {
          this.user.password = this.password

        } else {
          window.alert("votre mot de passe doit faire au moins 8 caractères!")
          this.verificationmdp = false
        }
      }
      else {
        window.alert("vos deux mots de passe ne sont pas concordants!")
        this.verificationmdp = false
      }
    }

    if (this.user.nickname != "" && this.user.email != "" && this.verificationmdp == true) {

      //Pour updater l'image
      this.finalpicture = this.picture.split("\\", 3)
      this.picture = this.finalpicture[2];
      this.picture = "assets/profilpictures/" + this.picture

      if (this.picture != "assets/profilpictures/undefined") {
        this.user.picture = this.picture
      }

      this.service.modifyuser(this.user);
      this.router.navigate(['/profil']);

    }

    else {
      if (this.verificationmdp == true) {
        window.alert("vous n'avez pas rempli tous les champs")
      }

    }
  }
}