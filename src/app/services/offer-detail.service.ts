import { Injectable } from '@angular/core';
import { Offer } from 'src/classes/Offer';

@Injectable({
  providedIn: 'root'
})
export class OfferDetailService {

  offer : Offer;

  constructor() { 
    this.offer = this.getOffer()
  }

  getOffer() : Offer {
    return new Offer('Vélo', 4, 400, 'Super vélo pour grand-mère', 'sport', 'John Doe', new Date('07/07/2023'), false);
  }
}
