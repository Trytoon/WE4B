import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NavigationEnd, Router} from "@angular/router";
import {OfferService} from "../../services/offer.service";
import {FilterService} from "../../services/filter.service";
import {filter} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  searchForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private filterService: FilterService) {
    this.searchForm = this.formBuilder.group({
      filter: ['']
    });

    //Souscris en temps réél au changement de valeur de la search bar
    this.searchForm.get('filter')?.valueChanges.subscribe((value: string) => {
      if (!value) {
        this.filterService.clearFilter();
      }
    });
  }

  onSearch() {
    this.router.navigate(['/offer-list'])
    const filter = this.searchForm.get('filter')?.value;
    if (filter) {
      this.filterService.setFilter(filter);
    }else {
      this.filterService.clearFilter();
    }
  }
}
