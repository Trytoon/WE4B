import {Injectable} from '@angular/core';
import {Offer} from "../../classes/Offer";
import {BehaviorSubject, map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Address} from "../../classes/Address";

@Injectable({
  providedIn: 'root'
})


export class OfferService {
  filteredOffers: BehaviorSubject<Offer[]> = new BehaviorSubject<Offer[]>([]);
  offerArray : Offer[] = [];

  constructor(public http: HttpClient) {
    this.applyFilters(null);
  }

  getOfferByIndex(idx : number) : Offer {
    return this.offerArray[idx];
  }

  applyFilters(filter: any): void {
    if (filter === null) {
      filter = { filter: null };
    }

    this.http.post<any>('http://localhost/WE4B/filter.php', filter).subscribe(response => {
      if (response.success === true && response.offers) {
        const offers = response.offers.map((offerData: any) => {

          const address = new Address (
            offerData.addressNumber,
            offerData.addressStreet,
            offerData.addressCity,
            offerData.addressZipCode
          );

          return new Offer(
            parseInt(offerData.id),
            offerData.titre,
            parseInt(offerData.nb_photo),
            parseInt(offerData.prix),
            offerData.detail,
            offerData.categorie,
            offerData.pseudo,
            new Date(),
            offerData.livrable === "1",
            address
          );
        });
        this.filteredOffers.next(offers);
      } else {
        this.filteredOffers.next([]);
      }
    });
  }

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
        pathsPictures.push(`src/assets/offerpictures/offer${offer.nb_pictures}/${j}.jpg`)
      }
    }
    return pathsPictures
  }
}

