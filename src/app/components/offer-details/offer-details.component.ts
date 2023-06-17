import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfferService } from 'src/app/services/offer.service';
// import { OfferDetailService } from 'src/app/services/offer-detail.service';
import { UserService } from 'src/app/services/user.service';
import { Offer } from 'src/classes/Offer';
import { OfferDetails } from 'src/classes/OfferDetails';
import { User } from 'src/classes/User';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css']
})
export class OfferDetailsComponent {
  offer_index : number;
  offerDetails !: OfferDetails;

  pathsPictures : string[] = []

  constructor(private activatedRoute: ActivatedRoute, private serviceOffer: OfferService, serviceUser : UserService) {
    this.offer_index = parseInt(this.activatedRoute.snapshot.paramMap.get('index') || '0');

    this.serviceOffer.getOfferDetails(this.offer_index).subscribe(data => {
      this.offerDetails = data[0];

      this.pathsPictures = serviceOffer.getOfferPictures(this.offerDetails.offer)
    });
  }
}
