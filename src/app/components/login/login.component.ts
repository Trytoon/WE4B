import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {tap} from "rxjs";
import {UserService} from "../../services/user.service";
import {Address} from "../../../classes/Address";

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

    this.userService.logout();
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

        //todo: Si la case rester connecté est cochée, demander au serveur backend de setup des cookies
        if (this.rememberMe) {
          console.log("Alors comme ca tu veux qu'on se souvienne de toi ?")
        }

        const data = {
          username: username,
          password: password
        };

        this.http.post<any>('http://localhost/WE4B/login.php', data)
          .pipe(
            tap(response => {
              if (response.success == "true") {
                if (response.user) {
                  this.userService.set_user(
                      response.user.pseudo,
                      response.user.prenom,
                      response.user.nom,
                      response.user.email,
                      new Date(),
                      new Address(12, "rue du chene", "Strasbourg", "67000")
                  )
                }
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
