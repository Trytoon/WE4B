/*
Contient un formulaire réactif et controlé par Angular
 */

import {Component, Input} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  showError : boolean = false;
  @Input() errorMessage! : string;

  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient) {

    //Creation du formulaire avec les validators poru controler les données lors de la soumission
    this.registerForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl('', [Validators.required, Validators.minLength(8)]),
      password2: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      //On recupere les champs du formulaire
      const usernameControl = this.registerForm.get('username');
      const emailControl = this.registerForm.get('email');
      const passwordControl = this.registerForm.get('password');
      const password2Control = this.registerForm.get('password2');

      //Si ces champs sont définis, alors on regarde leur valeur
      if (usernameControl && passwordControl && emailControl && password2Control) {
        const username = usernameControl.value;
        const email = emailControl.value;
        const password = passwordControl.value;
        const password2 = password2Control.value;

        //Les données qu'on envoie au backend sont dans l'object "data"
        if (password === password2) {
          const data = {
            username: username,
            email : email,
            password: password
          };

          //Requete POST PHP
          this.http.post<any>('http://localhost/we4b_jkimenau_echaussoy_tfridblatt/register.php', data)
            .pipe(
              tap(response => {
                if (response.success == "true") {
                  this.router.navigate(['/login']);
                } else {
                  this.showError = true;
                  this.errorMessage = "Un autre utilisateur possède deja le même pseudo ou email !"
                }
              })
            )
            .subscribe();
        } else {
          this.showError = true;
          this.errorMessage = "Les deux mots de passe fournis sont différents !"
        }
      }
    } else {
      this.showError = true;
      if (this.registerForm.get('email')?.hasError('email')) {
        this.errorMessage = "Veuillez saisir une adresse email valide."
      } else if (this.registerForm.get('password')?.hasError('minlength')) {
        this.errorMessage = "Veuillez entrer un mot de passe de 8 caractères ou plus."
      } else {
        this.errorMessage = "Veuillez remplir le formulaire."
      }
    }
  }
}
