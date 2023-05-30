import { Injectable } from '@angular/core';
import {Offer} from "../../classes/Offer";

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  offerArray : Offer[] = [];
  constructor() {
    this.offerArray.push(new Offer("Velo",5,172,"test","Sport","test", new Date(), true));
    this.offerArray.push(new Offer("Tele",5,172,"test","test","test", new Date(), true));
    this.offerArray.push(new Offer("Table",5,172,"test","test","test", new Date(), false));
    this.offerArray.push(new Offer("Ordinateur",5,172,"test","test","test", new Date(), false));
  }

  getOffers() : Offer[] {
    return this.offerArray
  }

  filterOffers(filter: string): void {
    this.offerArray = this.offerArray.filter((offer: Offer) => {
      // Vérifier si l'offre correspond au filtre
      return (
        offer.title.toLowerCase().includes(filter.toLowerCase()) ||
        offer.categorie.toLowerCase().includes(filter.toLowerCase())
      );
    });
  }
}
