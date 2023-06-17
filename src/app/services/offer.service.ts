/*
Module de gestion des offres.
Regroupe toutes les fonctions qui permettent de communiquer avec le back-end poru recuperer dans infos dur des offres
 */


import {Injectable} from '@angular/core';
import {Offer} from "../../classes/Offer";
import {BehaviorSubject, map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Address} from "../../classes/Address";

@Injectable({
  providedIn: 'root'
})


export class OfferService {

  //Ces objects sont obeservés pour permettre la programmation réctive
  filteredOffers: BehaviorSubject<Offer[]> = new BehaviorSubject<Offer[]>([]);

  constructor(public http: HttpClient) {}

  //Fonction d'application des filtres. Retourne le tableau des offres triées. Objet écouté par le OfferList component
  //A chaque fois qu'on veut afficher une liste de produit, le paramètre data change
  //Et indique au backend la bonne requete à effectuer
  applyFilters(filter: any): void {
    if (filter === null) {
      filter = { filter: null };
    }
    this.http.post<any>('http://localhost/we4b_jkimenau_echaussoy_tfridblatt/filter.php', filter).subscribe(response => {
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
        //On "publie" la valeur à tous les objets abonnés. Ici, la liste des offres filtrées
        this.filteredOffers.next(offers);
      } else {
        // En cas d'erreurs, la liste des offres triées est vide
        this.filteredOffers.next([]);
      }
    });
  }

  //Interroge la base de données et retourne une liste de toutes les catégories existantes sur le site.
  //On exploite cette liste dans des listes déroulantes ensuite
  getCategories(): Observable<{ id: string, name: string }[]> {
    return this.http.post<any>('http://localhost/we4b_jkimenau_echaussoy_tfridblatt/fetchCategories.php', null).pipe(
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

  //Recupere les infos d'une offre pour un ID donné
  getOfferDetails(id: number): Observable<any[]> {
    return this.http.post<any>('http://localhost/we4b_jkimenau_echaussoy_tfridblatt/fetchOffer.php', { id }).pipe(
      map(response => {
        if (response.success === true && response.offerdetail) {
          return [response.offerdetail];
        } else {
          return [];
        }
      })
    );
  }

  //Recupere les images d'une offre pour un ID donné? Il construit la chaine de caractères associant le chemin des images
  //et le dossier correspondant dans le serveur angular (dossier local dans notre exemple)
  getOfferPictures(offer : Offer): string[] {
    let pathsPictures: string[] = []

    if (offer) {

      if (offer.nb_pictures == 0) {
        pathsPictures.push(`assets/offerpictures/offerdefault/default.png`)
      } else {
        for (let j: number = 1; j <= offer.nb_pictures; j++) {
          pathsPictures.push(`assets/offerpictures/offer${offer.id}/${j}.jpg`)
        }
      }
    }
    return pathsPictures
  }
}



