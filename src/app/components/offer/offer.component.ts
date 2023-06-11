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
  constructor(public userService: UserService, public router: Router, public http: HttpClient, public offerService : OfferService) {}

  ngOnInit(): void {}

  like(): void {
    if (this.userService.user_logged()) {
      const data = {
        username: this.userService.logged_user?.nickname,
        id_product: this.offer.id
      };

      this.http.post<any>('http://localhost/WE4B/likeProduct.php', data)
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

      this.http.post<any>('http://localhost/WE4B/dislikeProduct.php', data)
        .subscribe(response => {
          if (response.success == "true") {
            this.logged_user_liked = false;
          }
        });
    }
  }
}

