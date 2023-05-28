import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {OfferService} from "../../services/offer.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  searchForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.searchForm = this.formBuilder.group({
      filter: ['', Validators.required]
    });
  }

  onSubmit() {
    const offers = new OfferService();
    const filter = this.searchForm.get("filter");

    this.router.navigate(['/offer-list']);

    if (filter) {
      const filter_value = filter.value;
      offers.filterOffers(filter_value);
    }
  }
}
