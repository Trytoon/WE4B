import { Component, OnInit } from '@angular/core';
import { Offer } from "../../../classes/Offer";
import { OfferService } from "../../services/offer.service";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.css']
})
export class OfferListComponent implements OnInit {
  filteredOffers: Offer[] = []; //Les offres filtrées en temps réél grace à OfferService

  textDisplay: string = ""; //Le titre à afficher
  displayFilterOption: boolean = false; //Pour afficher ou nom le formulaire de filtrage
  readyToBeDisplayed: boolean = false; //Pour gerer l'affichage. Une fois seulement que toutes les données ont été envoyées, ca s'affiche à l'écran
  offerCanBeRemoved: boolean = false; // Autorise ou non l'offre à s'enlever de la liste --> Utilisé pour disliker un produit réactivement

  constructor(
    public service: OfferService,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const page = params.get('page');

      //Page des likes de l'utilisateur
      if (page === 'likes') {
        this.offerCanBeRemoved = true;
        if (!this.userService.user_logged()) {
          this.router.navigate(['']);
        } else {
          const data = {
            likes: true,
            username: this.userService.logged_user?.nickname,
          };

          this.service.applyFilters(data);

          this.service.filteredOffers.subscribe(offers => {
            this.filteredOffers = offers;
            if (this.filteredOffers.length === 0) {
              this.textDisplay = "Vous n'avez liké aucune offre";
            } else {
              this.textDisplay = "Vos offres likées";
            }
            this.readyToBeDisplayed = true;
          });
        }

        //Page des offres de l'utilisateur
      } else if (page === 'myoffers') {
        if (!this.userService.user_logged()) {
          this.router.navigate(['']);
        } else {
          const data = {
            myoffers: true,
            username: this.userService.logged_user?.nickname,
          };

          this.service.applyFilters(data);

          this.service.filteredOffers.subscribe(offers => {
            this.filteredOffers = offers;
            if (this.filteredOffers.length === 0) {
              this.textDisplay = "Vous n'avez publié aucune offre";
            } else {
              this.textDisplay = "Vos offres publiées";
            }
            this.readyToBeDisplayed = true;
          });
        }
      } else {
        //Liste de toutes les offres

        this.displayFilterOption = true;

        const data = {
          username: this.userService.logged_user?.nickname,
        };

        this.service.applyFilters(data);

        this.service.filteredOffers.subscribe(offers => {
          this.filteredOffers = offers;
          this.readyToBeDisplayed = true;
        });
      }
    });
  }
}
