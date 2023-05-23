import { Component } from '@angular/core';
import { OfferService } from 'src/app/services/offer.service';
import { Offer } from 'src/classes/Offer';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css']
})
export class OfferDetailsComponent {
    offer : Offer;

    constructor(service : OfferService) {
      this.offer = service.getOffer()
    }
}
