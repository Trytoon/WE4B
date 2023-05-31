import {Component, Input} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs";

@Component({
  selector: 'app-offer-add',
  templateUrl: './offer-add.component.html',
  styleUrls: ['./offer-add.component.css']
})
export class OfferAddComponent {
  addOfferForm: FormGroup;
  showError : boolean = false;
  @Input() errorMessage! : string;

  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient) {

    this.addOfferForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      // date: new FormControl('', [Validators.required]), // higgen field
      shippable: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      photos: new FormControl('', [Validators.nullValidator]),
      // seller: new FormControl('', [Validators.required]), // hidden field
      num_road: new FormControl('', [Validators.minLength(0)]),
      road: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      city: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      zip_code: new FormControl('', [Validators.minLength(0)]),
    });
  }

  onSubmit() {
    if (this.addOfferForm.valid) {
      //On recupere les champs du formulaire
      const usernameControl = this.addOfferForm.get('username');
      const emailControl = this.addOfferForm.get('email');
      const passwordControl = this.addOfferForm.get('password');
      const password2Control = this.addOfferForm.get('password2');

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
      if (this.addOfferForm.get('email')?.hasError('email')) {
        this.errorMessage = "Veuillez saisir une adresse email valide."
      } else if (this.addOfferForm.get('password')?.hasError('minlength')) {
        this.errorMessage = "Veuillez entrer un mot de passe de 8 caractères ou plus."
      } else {
        this.errorMessage = "Veuillez remplir le formulaire."
      }
    }
  }
}
