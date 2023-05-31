import { Injectable } from '@angular/core';
import {Offer} from "../../classes/Offer";

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  offerArray : Offer[] = [];
  constructor() {
    this.offerArray.push(new Offer(1, "Velo electrique", 3, 699, "Super vélo électrique tout neuf", "Sport", "Marie Jean", new Date("12/05/2023"), true));
    this.offerArray.push(new Offer(2, "Tele",  4, 1273, "Tele plama 4K 8000x8000 pixel", "High tech", "Trytoon", new Date("26/05/2023"), true));
    this.offerArray.push(new Offer(3, "Table", 2, 20, "table 5m par 2m","Mobilier", "Tatsuya", new Date("28/05/2023"), false));
    this.offerArray.push(new Offer(4, "Ordinateur", 5,  100,"Ordinateur Acer avec batterie défctueuse","High tech","Thomas", new Date("31/05/2023"), false));
    this.offerArray.push(new Offer(5, "Livre", 1, 10, "Livre d'aventure captivant", "Littérature", "Sophie",new Date("27/05/2023"), true));
    this.offerArray.push(new Offer(6, "Chaise", 3, 50, "Chaise confortable en bois", "Mobilier", "Alexandre", new Date("26/05/2023"), false));
    this.offerArray.push(new Offer(7, "Montre", 1, 250, "Montre élégante et fonctionnelle", "Accessoires", "Sophie", new Date("29/05/2023"), true));
    this.offerArray.push(new Offer(8, "Sac à dos", 2, 80, "Sac à dos spacieux et résistant", "Accessoires", "Thomas", new Date("30/05/2023"), false));
    this.offerArray.push(new Offer(9, "Téléphone", 3, 999, "Téléphone dernier cri avec des fonctionnalités avancées", "High tech", "Emma", new Date("01/06/2023"), true));
    this.offerArray.push(new Offer(10, "Canapé", 4, 500, "Canapé confortable et moderne pour votre salon", "Mobilier", "Lucas", new Date("02/06/2023"), false));
    this.offerArray.push(new Offer(11, "Appareil photo", 2, 800, "Appareil photo professionnel pour des clichés de qualité", "High tech", "Sophie", new Date("03/06/2023"), true));
    this.offerArray.push(new Offer(12, "Robe", 1, 50, "Robe élégante pour toutes les occasions", "Vêtements", "Isabelle", new Date("04/06/2023"), true));
    this.offerArray.push(new Offer(13, "Enceinte Bluetooth", 1, 120, "Enceinte portable avec une qualité audio exceptionnelle", "High tech", "Thomas", new Date("05/06/2023"), true));
    this.offerArray.push(new Offer(14, "Bague en argent", 1, 80, "Bague en argent sterling avec un design unique", "Accessoires", "Sophie", new Date("06/06/2023"), false));
    this.offerArray.push(new Offer(15, "Tapis de yoga", 1, 40, "Tapis de yoga antidérapant et confortable", "Sport", "Alexandre", new Date("07/06/2023"), true));

  }

  getOffers() : Offer[] {
    return this.offerArray
  }

  getOfferByIndex(idx : number) : Offer {
    return this.offerArray[idx];
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
