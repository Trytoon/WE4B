import {Component, OnInit} from '@angular/core';
import {Offer} from "../../../classes/Offer";
import {OfferService} from "../../services/offer.service";
import {FilterService} from "../../services/filter.service";

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.css']
})
export class OfferListComponent implements OnInit {
  filteredOffers: Offer[] = [];

  constructor(public service: OfferService, private filterService: FilterService) {}

  ngOnInit(): void {
    this.filterService.getFilter().subscribe((filter: string) => {
      this.filteredOffers = this.service.filterOffers(filter);
    });
  }
}
