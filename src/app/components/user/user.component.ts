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
  oldpassword: string = '';
  password: string = '';
  confirmpassword: string = '';
  picture: string = '';

  constructor(public service: UserService, private router: Router) {
    if (this.service.logged_user !== undefined) {
      this.user = this.service.logged_user;
    } else {
      this.router.navigate(['']);
    }
  }

  ngOnInit(): void {}

  onSubmit(): void {
    // Vérification des mots de passe
    if (this.oldpassword !== "" || this.password !== "" || this.confirmpassword !== "") {
      if (this.oldpassword === this.user.password) {
        if (this.password === "" || this.confirmpassword === "") {
          window.alert("Veuillez remplir les deux champs de mot de passe.");
          return;
        }
  
        if (this.password !== this.confirmpassword) {
          window.alert("Les deux champs du nouveau mot de passe ne sont pas identiques.");
          return;
        }
  
        if (this.password.length < 8) {
          window.alert("Votre mot de passe doit comporter au moins 8 caractères.");
          return;
        }
  
        this.user.password = this.password;
      } else {
        window.alert("Ancien mot de passe incorrect.");
          return;
      }
    }

    // Vérification des champs d'adresse
    if (this.user.address.number !== "" || this.user.address.street !== "" || this.user.address.city !== "" || this.user.address.zip_code !== "") {
      if (this.user.address.number === "" || this.user.address.street === "" || this.user.address.city === "" || this.user.address.zip_code === "") {
        window.alert("Veuillez remplir tous les champs de l'adresse.");
        return;
      }
    }

    // Vérification des champs de nom et prénom
    if (this.user.first_name === "" || this.user.last_name === "") {
      window.alert("Veuillez remplir tous les champs du nom et du prénom.");
      return;
    }

    // Traitement de l'image
    if (this.picture !== "") {
      const pictureName = this.picture.split("\\").pop() || "";
      this.user.picture = "assets/profilpictures/" + pictureName;
    }

    // Modifier les informations de l'utilisateur
    this.service.modifyuser(this.user);
  }

}


