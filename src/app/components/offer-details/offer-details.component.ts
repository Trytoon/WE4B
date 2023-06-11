import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfferService } from 'src/app/services/offer.service';
// import { OfferDetailService } from 'src/app/services/offer-detail.service';
import { UserService } from 'src/app/services/user.service';
import { Offer } from 'src/classes/Offer';
import { User } from 'src/classes/User';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css']
})
export class OfferDetailsComponent {
  offer_index : number;
  offerDetails : any[] = [];

  // constructor(serviceOffer : OfferDetailService, serviceUser : UserService) {
  //   this.offer = serviceOffer.getOffer();
  //   this.seller = serviceUser.getUser(); // il faudra recuperer l'utilisateur qui a poste l'offre
  // }

  constructor(private activatedRoute: ActivatedRoute, private serviceOffer: OfferService, serviceUser : UserService) {
    this.offer_index = parseInt(this.activatedRoute.snapshot.paramMap.get('index') || '0');

    this.serviceOffer.getOfferDetails(this.offer_index).subscribe(data => {
      this.offerDetails = data;
      // console.log(this.offerDetails);
    });
  }
}
