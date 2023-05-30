import {Component, Input, OnInit} from '@angular/core';
import {Offer} from "../../../classes/Offer";
import { OfferDetailService } from 'src/app/services/offer-detail.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {

  offer : Offer;
  constructor(service : OfferDetailService) {
    this.offer = service.getOffer();
  };
  
  ngOnInit(): void {};

}
