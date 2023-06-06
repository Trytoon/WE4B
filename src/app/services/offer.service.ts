import { Injectable } from '@angular/core';
import {Offer} from "../../classes/Offer";

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  offerArray : Offer[] = [];
  constructor() {
    this.offerArray.push(new Offer("Velo",5,172,"test","Sport","test", new Date(), true));
    this.offerArray.push(new Offer("Tele",5,172,"test","Sport","test", new Date(), true));
    this.offerArray.push(new Offer("Television",5,172,"test","informatique","test", new Date(), false));
    this.offerArray.push(new Offer("Ordinateur",5,172,"test","informatique","test", new Date(), false));
    this.offerArray.push(new Offer("velociraprto",5,172,"test","test","test", new Date(), false));
    this.offerArray.push(new Offer("ecran",5,172,"test","informatique","test", new Date(), false));
    this.offerArray.push(new Offer("Ordinateur",5,172,"test","test","test", new Date(), false));
    this.offerArray.push(new Offer("Ordinateur",5,172,"test","test","test", new Date(), false));
    this.offerArray.push(new Offer("Ordinateur",5,172,"test","test","test", new Date(), false));
    this.offerArray.push(new Offer("Ordinateur",5,172,"test","test","test", new Date(), false));
    this.offerArray.push(new Offer("Ordinateur",5,172,"test","test","test", new Date(), false));
    this.offerArray.push(new Offer("Ordinateur",5,172,"test","test","test", new Date(), false));
    this.offerArray.push(new Offer("Ordinateur",5,172,"test","test","test", new Date(), false));
    this.offerArray.push(new Offer("Ordinateur",5,172,"test","test","test", new Date(), false));
    this.offerArray.push(new Offer("Ordinateur",5,172,"test","test","test", new Date(), false));
    this.offerArray.push(new Offer("Ordinateur",5,172,"test","test","test", new Date(), false));
  }

  getOffers() : Offer[] {
    return this.offerArray
  }

  filterOffers(filter: string): Offer[] {

    if (filter === '') {
      return this.offerArray;
    } else {
      return this.offerArray.filter((offer: Offer) => {
        return (
          offer.title.toLowerCase().includes(filter.toLowerCase()) ||
          offer.categorie.toLowerCase().includes(filter.toLowerCase())
        );
      });
    }
  }
}
