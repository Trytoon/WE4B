import { Component } from '@angular/core';
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

  showErrorPasswords = false;
  showErrorEmpty: boolean = false;
  showErrorData : boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient) {

    this.registerForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      email: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      password : new FormControl('', [Validators.required, Validators.maxLength(100)]),
      password2: new FormControl('', [Validators.required, Validators.maxLength(100)])
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

        if (password === password2) {
          const data = {
            username: username,
            email : email,
            password: password
          };

          this.http.post<any>('http://localhost/WE4B/register.php', data)
            .pipe(
              tap(response => {
                if (response.success == "true") {
                  this.router.navigate(['/login']);
                } else {
                  this.showErrorEmpty = false;
                  this.showErrorPasswords = false;
                  this.showErrorData = true;
                }
              })
            )
            .subscribe();
        } else {
          this.showErrorData = false;
          this.showErrorEmpty = false;
          this.showErrorPasswords = true;
        }
      } else {
        this.showErrorPasswords = false;
        this.showErrorData = false;
        this.showErrorEmpty = true;
      }
    }
  }
}
