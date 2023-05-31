import { Injectable } from '@angular/core';
import {Offer} from "../../classes/Offer";

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  offerArray : Offer[] = [];
  constructor() {
    this.offerArray.push(new Offer(1, "Velo electrique", 3, 699, "Super vélo électrique tout neuf", "Sport", "Marie Jean", new Date(), true));
    this.offerArray.push(new Offer(2, "Tele",  4, 1273, "Tele plama 4K 8000x8000 pixel", "High tech", "Trytoon", new Date(), true));
    this.offerArray.push(new Offer(3, "Table", 2, 20, "table 5m par 2m","Mobilier", "Tatsuya", new Date(), false));
    this.offerArray.push(new Offer(4, "Ordinateur", 5,  100,"Ordinateur Acer avec batterie défctueuse","High tech","Thomas", new Date(), false));
  }

  getOffers() : Offer[] {
    return this.offerArray
  }

  getOfferByIndex(idx : number) : Offer {
    return this.offerArray[idx];
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
