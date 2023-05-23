import {Component, OnInit} from '@angular/core';
import {Offer} from "../../../classes/Offer";

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.css']
})
export class OfferListComponent implements OnInit {

  offerArray : Offer[] = [];
  constructor() {
    this.offerArray.push(new Offer("Vélo d'appartement très stylé",5,172,"test","Sport","test", new Date(), true));
    this.offerArray.push(new Offer("test",5,172,"test","test","test", new Date(), true));
    this.offerArray.push(new Offer("test",5,172,"test","test","test", new Date(), false));
    this.offerArray.push(new Offer("test",5,172,"test","test","test", new Date(), false));
  }
  ngOnInit(): void {
  }
}
