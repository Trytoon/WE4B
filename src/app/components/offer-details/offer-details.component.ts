import { Component } from '@angular/core';
import { OfferDetailService } from 'src/app/services/offer-detail.service';
import { UserService } from 'src/app/services/user.service';
import { Offer } from 'src/classes/Offer';
import { User } from 'src/classes/User';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css']
})
export class OfferDetailsComponent {
    offer : Offer;
    seller : User;

    constructor(serviceOffer : OfferDetailService, serviceUser : UserService) {
      this.offer = serviceOffer.getOffer();
      this.seller = serviceUser.getUser(); // il faudra recuperer l'utilisateur qui a poste l'offre
    }
}
