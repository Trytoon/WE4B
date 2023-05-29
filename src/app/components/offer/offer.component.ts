import {Component, Input, OnInit} from '@angular/core';
import {Offer} from "../../../classes/Offer";
import { OfferService } from 'src/app/services/offer.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {

  offer : Offer;
  constructor(service : OfferService) {
    this.offer = service.getOffer();
  };
  
  ngOnInit(): void {};

}
