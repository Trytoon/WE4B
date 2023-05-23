import { Injectable } from '@angular/core';
import { Offer } from 'src/classes/Offer';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  offer : Offer;

  constructor(service : OfferService) { 
    this.offer = service.getOffer()
  }

  getOffer() : Offer {
    return new Offer('Vélo', 4, 400, 'Super vélo pour grand-mère', 'sport', 'John Doe', new Date('07/07/2023'), false);
  }
}
