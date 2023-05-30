import { Component } from '@angular/core';
import { OfferDetailService } from 'src/app/services/offer-detail.service';
import { Offer } from 'src/classes/Offer';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css']
})
export class OfferDetailsComponent {
    offer : Offer;

    constructor(service : OfferDetailService) {
      this.offer = service.getOffer()
    }
}
