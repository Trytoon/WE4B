/*
  Cette classe gere l'observation du filtre. Il permet de faire en sorte que si l'utilisateur
  effectue une recherche, les resultats filtrés s'affichent
  C'est le principe de l'obervable
 */


import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filterSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  //Envoie une valeur qui correspond au filtre à tous les objets abonnés au filtre
  setFilter(filter: string): void {
    this.filterSubject.next(filter);
  }

  //Retourne le filtre
  getFilter(): Observable<string> {
    return this.filterSubject.asObservable();
  }

  //Envoie une valeur vide à tous les objets abonnés au filtre
  clearFilter() {
    this.filterSubject.next('');
  }
}
