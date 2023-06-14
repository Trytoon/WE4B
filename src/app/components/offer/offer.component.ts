/*
Module d'affichage des offres
Gere l'afficgahe des produits sous forme de liste et le systeme de like
A partir de ce composant sont affichés les infos principales du produit
Et le bouton like qui permet de liker un produit dans le backend
 */

import {Component, Input, OnInit} from '@angular/core';
import {Offer} from "../../../classes/Offer";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {OfferService} from "../../services/offer.service";

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {
  @Input() offer!: Offer;
  @Input() logged_user_liked! : boolean;

  @Input() canBeRemovedFromList! : boolean; //Pour savoir s'il peut disparaitre une fois à l'ecran. Pour disliker un produit
  constructor(public userService: UserService, public router: Router, public http: HttpClient, public offerService : OfferService) {}

  ngOnInit(): void {}

  like(): void {
    if (this.userService.user_logged()) {
      const data = {
        username: this.userService.logged_user?.nickname,
        id_product: this.offer.id
      };

      this.http.post<any>('http://localhost/we4b_jkimenau_echaussoy_tfridblatt/likeProduct.php', data)
        .subscribe(response => {
          if (response.success == "true") {
            this.logged_user_liked = true;
          }
        });
    }
  }

  //Permet de liker un produit
  dislike(): void {
    if (this.userService.user_logged()) {
      const data = {
        username: this.userService.logged_user?.nickname,
        id_product: this.offer.id
      };

      this.http.post<any>('http://localhost/we4b_jkimenau_echaussoy_tfridblatt/dislikeProduct.php', data)
        .subscribe(response => {
          if (response.success == "true") {
            this.logged_user_liked = false;
          }
        });
    }
  }

  //Pour afficher les details d'un produit
  onClick(event : Event) : void {

    //Il faut verifie si l'utilisateur a cliqué sur le bouton sur la carte ou sur la carte elle même.
    //Le bouton like / dislike ne soit pas activer la route !
    const target = event.target as HTMLElement;
    if (target.tagName !== 'BUTTON') {
      this.router.navigate(['/', 'offer-list', this.offer.id])
    }
  }

  removeFromList() : void {
    this.offer.liked = false;
    const currentOffers = this.offerService.filteredOffers.getValue();
    const updatedOffers = currentOffers.filter(offer => offer.id !== this.offer.id);
    this.offerService.filteredOffers.next(updatedOffers);
  }
}

