/*
Contient un formulaire réactif et controlé par Angular
Explications dans le composant Register
 */


import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from "rxjs";
import { UserService } from 'src/app/services/user.service';
import { Address } from "../../../classes/Address";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  rememberMe: boolean = false;
  showError : boolean = false;
  @Input() errorMessage! : string;

  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient, private userService : UserService) {

    this.loginForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      //On recupere les champs du formulaire
      const usernameControl = this.loginForm.get('username');
      const passwordControl = this.loginForm.get('password');

      //Si ces champs sont définis, alors on regarde leur valeur
      if (usernameControl && passwordControl) {
        const username = usernameControl.value;
        const password = passwordControl.value;

        const data = {
          username: username,
          password: password
        };

        this.http.post<any>('http://localhost/we4b_jkimenau_echaussoy_tfridblatt/login.php', data)
          .pipe(
            tap(response => {
              if (response.success == "true") {
                let address;
                if (response.adresse) {
                    address = new Address(
                        parseInt(response.adresse.id),
                        response.adresse.numero,
                        response.adresse.nom_rue,
                        response.adresse.nom_ville,
                        response.adresse.cp
                    );
                } else {
                    address = new Address(-1, "", "", "", "");
                }

                this.userService.set_user(
                    response.user.id,
                    response.user.pseudo,
                    response.user.prenom,
                    response.user.nom,
                    response.user.email,
                    new Date(),
                    address,
                    response.user.password,
                    response.user.picture
                );
                // console.log(this.userService.logged_user)

                this.router.navigate(['/offer-list']);
              } else {
                this.showError = true;
                this.errorMessage = "Mauvais nom d'utilisateur ou mot de passe.";
              }
            })
          )
          .subscribe();


      }
    } else {
      this.showError = true;
      this.errorMessage = "Veuillez remplir le formulaire !";
    }
  }

}
