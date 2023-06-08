import {Component} from '@angular/core';
import {Offer} from "../../../classes/Offer";
import {OfferService} from "../../services/offer.service";

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.css']
})
export class OfferListComponent {
  filteredOffers: Offer[] = [];

  constructor(public service: OfferService) {
    this.service.filteredOffers.subscribe(offers => {
      this.filteredOffers = offers;
    });
  }
}

