import {Component, OnInit} from '@angular/core';
import {Offer} from "../../../classes/Offer";
import {OfferService} from "../../services/offer.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.css']
})
export class OfferListComponent implements OnInit {
  filteredOffers: Offer[] = [];
  displayFilterOption : boolean = false;

  //Pour réduire les requetes vers la BDD, on s'abonne en temps réél à ses changements:
  // 1) Recuperer via le backend toute la liste des offres selon le filtre
  // 2) Pour chaque offre filtrée, il recupere si le produit est liké ou pas par l'utilisateur connecté
  // 3) Il initialise l'offre et met à jour la propriété "liked"
  // 4) Cette propriété like est injectée de la liste d'offre vers les offres individuelles
  constructor(public service: OfferService, public router : Router, private activatedRoute: ActivatedRoute){

    this.activatedRoute.paramMap.subscribe(params => {
      const page = params.get('page');

      if (page === 'likes') {
        console.log('likes');
      } else if (page === 'myoffers') {
        console.log('myoffers');
        // Affichage de la liste des offres déposées
        // par l'utilisateur
      } else {
        this.displayFilterOption = true;
        // Affichage de la liste des offres dans la recherche principale
        this.service.filteredOffers.subscribe(offers => {
          this.filteredOffers = offers;
          this.service.getUserLikeStatut().subscribe(offreIds => {
            this.filteredOffers = this.filteredOffers.map(offer => ({
              ...offer,
              liked: offreIds.includes(offer.id.toString())
            }));
          });
        });
      }
    });
  }

  ngOnInit(): void {

  }
}

