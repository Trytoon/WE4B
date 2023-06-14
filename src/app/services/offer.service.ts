/*
Module de gestion des offres.
Regroupe toutes les fonctions qui permettent de communiquer avec le back-end poru recuperer dans infos dur des offres
 */


import {Injectable} from '@angular/core';
import {Offer} from "../../classes/Offer";
import {BehaviorSubject, map, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Address} from "../../classes/Address";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})


export class OfferService {

  //Ces objects sont obeservés pour permettre la programmation réctive
  filteredOffers: BehaviorSubject<Offer[]> = new BehaviorSubject<Offer[]>([]);
  offerArray : Offer[] = [];

  constructor(public http: HttpClient, public userService : UserService) {}

  getOfferByIndex(idx : number) : Offer {
    return this.offerArray[idx];
  }

  //Fonction d'application des filtres. Retourne le tableau des offres triées. Objet écouté par le OfferList component
  applyFilters(filter: any): void {
    //this.filteredOffers.next([]);
    if (filter === null) {
      filter = { filter: null };
    }
    this.http.post<any>('http://localhost/WE4B/filter.php', filter).subscribe(response => {
      if (response.success === true && response.offers) {
        const offers = response.offers.map((offerData: any) => {

          //Adresse de l'utilisateur
          const address = new Address (
            offerData.addressId,
            offerData.addressNumber,
            offerData.addressStreet,
            offerData.addressCity,
            offerData.addressZipCode
          );

          //Instanciation de l'offre avec l'adresse précédente
          return new Offer(
            parseInt(offerData.id),
            offerData.titre,
            parseInt(offerData.nb_photo),
            parseInt(offerData.prix),
            offerData.detail,
            offerData.categorie,
            offerData.pseudo,
            new Date(offerData.date),
            offerData.livrable === "1",
            offerData.liked === "1",
            address
          );
        });
        this.filteredOffers.next(offers);
      } else {
        this.filteredOffers.next([]);
      }
    });
  }

  //Interroge la base de données et retourne une liste de toutes les catégories existantes sur le site.
  //On exploite cette liste dans des listes déroulantes ensuite
  getCategories(): Observable<{ id: string, name: string }[]> {
    return this.http.post<any>('http://localhost/WE4B/fetchCategories.php', null).pipe(
      map(response => {
        if (response.success === true && response.categories) {
          return response.categories.map((category: any) => {
            return { id: category.id, name: category.nom };
          });
        } else {
          return [];
        }
      })
    );
  }

  getOfferDetails(id: number): Observable<any[]> {
    return this.http.post<any>('http://localhost/WE4B/fetchOffer.php', { id }).pipe(
      map(response => {
        if (response.success === true && response.offerdetail) {
          return [response.offerdetail];
        } else {
          return [];
        }
      })
    );
  }

  getOfferPictures(offer : Offer): string[] {
    // const offerWithId : Offer | undefined = this.offerArray.find(offer => offer.id === idOffer);
    let pathsPictures: string[] = []

    if (offer) {
      for (let j : number = 1; j <= (offer.nb_pictures as number); j++) {
        console.log('adding path')
        pathsPictures.push(`src/assets/offerpictures/offer${offer.id}/${j}.jpg`)
      }
    }
    return pathsPictures
  }
}



