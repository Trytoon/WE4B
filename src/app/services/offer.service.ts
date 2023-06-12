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

  constructor(public http: HttpClient, public userService : UserService) {
    this.applyFilters(null);
  }

  //Fonction d'application des filtres. Retourne le tableau des offres triées. Objet écouté par le OfferList component
  applyFilters(filter: any): void {
    this.filteredOffers.next([]);
    if (filter === null) {
      filter = { filter: null };
    }
    this.http.post<any>('http://localhost/WE4B/filter.php', filter).subscribe(response => {
      if (response.success === true && response.offers) {
        const offers = response.offers.map((offerData: any) => {

          //Adresse de l'utilisateur
          const address = new Address (
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
            offerData.liked,
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


  //Pour un utilisateur donné, interroge la base de données et recupère tous les produits likés par l'utilisateur
  //Ecouté dans OfferComponentList puis réinjecté vers chaque produit
  getUserLikeStatut(): Observable<string[]> {
    if (this.userService.user_logged()) {
      const data = {
        username: this.userService.logged_user?.nickname,
      };

      return this.http.post<any>('http://localhost/WE4B/userLikeStatut.php', data)
        .pipe(
          map(response => {
            if (response.success === "true" && response.offreIds) {
              return response.offreIds;
            } else {
              return [];
            }
          })
        );
    } else {
      return of([]);
    }
  }

  getOfferDetails(id: number): Observable<any[]> {
    return this.http.post<any>('http://localhost/WE4B/fetchOffer.php', {id}).pipe(
      map(response => {
        if (response.success === true && response.offerdetail) {
          return [response.offerdetail];
        } else {
          return [];
        }
      })
    );
  }
}



