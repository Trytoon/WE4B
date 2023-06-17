/*
Conposant utilisé pour la modification des informations du profil de l'utilisateur
Recupere les données actuelles de l'utilisateur
Le formulaire n'est pas réactif contrairement aux autres.
Le data binding se fait via les [(ngModel)].
 */


import { Component, OnInit, Input, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/classes/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  @Input() user!: User; //L'utilisateur actuel
  oldpassword: string = ''; //L'ancien mot de passe
  password: string = ''; //Le nouveau mot de passe
  confirmpassword: string = ''; //La confirmation du nouveau mot de passe
  picture: string = ''; //L'image

  constructor(public service: UserService, private router: Router) {
    //On redirige vers la page d'accueil si personne n'est connecté
    if (this.service.logged_user !== undefined) {
      this.user = this.service.logged_user;
    } else {
      this.router.navigate(['']);
    }
  }


  /*

  Vérifie que les données sont correctes. Si elles ne le sont pas, l'utilisateur est alerté.
      Les alertes se font si:
      - un des champs mot de passe est entré, mais pas l'autre
      - les 2 champs de mot de passe sont remplis mais différents
      - un des champs de l'adresse est rempli mais pas les autres
      - un des champs du nom/prénom est rempli mais pas l'autre

      Les alertes ne sont font pas si:
      - tous les champs de l'adresse sont laissés vide
      - et / ou tous les champs du password sont laissés vides
      - et / ou tous les champs du nom et prénom sont vides

      Si il n'y a aucune alerte, alors on peut submit le formulaire ET modifier les informations de @Input() user!: User;
   */
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


