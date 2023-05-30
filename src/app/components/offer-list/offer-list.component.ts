import {Component, OnInit} from '@angular/core';
import {Offer} from "../../../classes/Offer";
import {OfferService} from "../../services/offer.service";

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.css']
})
export class OfferListComponent implements OnInit {

  offerArray : Offer[] = [];
  constructor(service : OfferService) {
    this.offerArray = service.getOffers();
  }
  ngOnInit(): void {
  }

}
