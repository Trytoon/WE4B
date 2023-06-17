/*
Contient un formulaire réactif et controlé par Angular
Ajoute un produit dans le BDD et par conséquent dans la liste des produits affichés
 */


import {Component, Input} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs";
import {OfferService} from "../../services/offer.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-offer-add',
  templateUrl: './offer-add.component.html',
  styleUrls: ['./offer-add.component.css']
})
export class OfferAddComponent {
  addOfferForm: FormGroup; //Forumlaire d'ajout des offres
  showError : boolean = false; //Pour afficher une erreur en cas de besoin

  //La liste de catégories dans la liste déroulantes. ID correspond à l'ID dans la BDD pour pouvoir filtrer
  //name est le nom de la catégorie affiché à l'écran
  categories: { id: string; name: string }[] = [];

  @Input() errorMessage! : string; //Le message d'erreur

  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient, public offerService : OfferService, public userService :UserService) {

    if (!this.userService.user_logged()) {
      this.router.navigate(['']);
    }

    //Champs des formulaires réactifs
    this.addOfferForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      shippable: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      // photos: new FormControl('', [Validators.nullValidator]),
      num_road: new FormControl('', [Validators.minLength(0)]),
      road: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      city: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      zip_code: new FormControl('', [Validators.minLength(5)]),
    });

    //Recupre la liste des catégories en fonctions de la bdd et en temps réél
    this.offerService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  onSubmit() {
    if (this.addOfferForm.valid) {

      if (isNaN(Number(this.addOfferForm.get('zip_code')?.value))) {
        this.showError = true;
        this.errorMessage = "Le code postal doit être numérique!";

      } else {
        //Initilisation des données à envoyer à PHP
        const data = {
          title : this.addOfferForm.get('title')?.value,
          description : this.addOfferForm.get('description')?.value,
          price : this.addOfferForm.get('price')?.value,
          shippable : this.addOfferForm.get('shippable')?.value,
          category : this.addOfferForm.get('category')?.value,
          num_road : this.addOfferForm.get('num_road')?.value,
          road : this.addOfferForm.get('road')?.value,
          city : this.addOfferForm.get('city')?.value,
          zip_code : this.addOfferForm.get('zip_code')?.value,
          username : this.userService.logged_user?.nickname
        }

        //Envoie de toutes les données de la nouvelle offre au backend
        this.http.post<any>('http://localhost/we4b_jkimenau_echaussoy_tfridblatt/addProduct.php', data)
          .pipe(
            tap(response => {
              if (response.success == "true") {
                this.router.navigate(['']);
              } else {
                this.showError = true;
                this.errorMessage = "Erreur lors de l'ajout du produit !"
              }
            })
          )
          .subscribe();
      }
      //Gestion des messages d'erreurs
    } else {
      this.showError = true;
      if (this.addOfferForm.get('zip_code')?.hasError('minlength')) {
        this.errorMessage = "Le code postal doit possèder 5 chiffres !"
      } else {
        this.errorMessage = "Veuillez remplir tout le formulaire."
      }
    }
  }
}
