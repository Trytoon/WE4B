import {Component, OnInit} from '@angular/core';
import {Offer} from "../../../classes/Offer";
import {OfferService} from "../../services/offer.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.css']
})
export class OfferListComponent implements OnInit {
  filteredOffers: Offer[] = [];
  mode : string = "filter";

  //Pour réduire les requetes vers la BDD, on s'abonne en temps réél à ses changements:
  // 1) Recuperer via le backend toute la liste des offres selon le filtre
  // 2) Pour chaque offre filtrée, il recupere si le produit est liké ou pas par l'utilisateur connecté
  // 3) Il initialise l'offre et met à jour la propriété "liked"
  // 4) Cette propriété like est injectée de la liste d'offre vers les offres individuelles
  constructor(public service: OfferService, public router : Router){

    //Affichage de la liste des offres dans la recherche principale
    if (this.mode == "filter") {
      this.service.filteredOffers.subscribe(offers => {
        this.filteredOffers = offers;
        this.service.getUserLikeStatut().subscribe(offreIds => {
          this.filteredOffers = this.filteredOffers.map(offer => ({
            ...offer, //copie en profondeur de l'offre
            liked: offreIds.includes(offer.id.toString())
          }));
        });
      });
      //Affichage des offres likés par l'utilisateur
    } else if (this.mode == "like") {
      console.log("lol")

    }
    //Affichage des offres postées par l'utilisateur
    else if (this.mode == "myoffers") {

    }
  }

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.displayMode();
    });
  }

  //Permet de chsoir en temps réél le mode d'affichage. On reutilise le meme composant dans plusieurs pages
  displayMode(): void {
    const url = this.router.url;
    if (url.includes('user/likes')) {
      this.mode = 'like';
    } else if (url.includes('user/myoffers')) {
      this.mode = 'myoffers';
    } else {
      this.mode = 'filter';
    }
  }
}

