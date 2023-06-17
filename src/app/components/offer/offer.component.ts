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
  @Input() offer!: Offer; // L'offre à afficher
  @Input() logged_user_liked! : boolean; // Gere l'affichage du bouton like/dislinke en fonction de si l'utilisateur a liké ou non le produit

  @Input() canBeRemovedFromList! : boolean; //Pour savoir s'il peut disparaitre une fois à l'ecran. Pour disliker un produit
  constructor(public userService: UserService, public router: Router, public http: HttpClient, public offerService : OfferService) {}

  ngOnInit(): void {}

  // Pour liker un produit. Modifie le statut de like logged_user_liked si l'utilisateur avait retiré son like précédent
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

  // Pour disliker un produit. Modifie le statut de like logged_user_liked si l'utilisateur avait liké précédemment
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
    //Le bouton like / dislike ne doit pas activer la route !
    const target = event.target as HTMLElement;
    if (target.tagName !== 'BUTTON') {
      this.router.navigate(['/', 'offer-list', this.offer.id])
    }
  }

  //Retire le produit de la liste affichée à l'écran.
  //Comme l'affichage est réactif, il disparait en temps réél de la liste d'offres affichée à l'écran !
  //Pour démontrer la réactivité lors de la page de son profil et de ses likes. Disliker un produit le retire
  //instantanément de la liste des likes aux yeux de l'utilisateur
  removeFromList() : void {
    this.offer.liked = false;
    const currentOffers = this.offerService.filteredOffers.getValue();
    const updatedOffers = currentOffers.filter(offer => offer.id !== this.offer.id);
    this.offerService.filteredOffers.next(updatedOffers);
  }
}

