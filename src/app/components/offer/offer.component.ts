import {Component, Input, OnInit} from '@angular/core';
import {Offer} from "../../../classes/Offer";
import { Router } from '@angular/router';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {

  @Input() offer! : Offer;
  constructor(private router : Router) {};
  
  ngOnInit(): void {};

  onClick(event : Event) : void {
    if ((event.target as HTMLElement).id == "like") {
      console.log("like !");
    } else {
      // Read more about the selected offer
      // this.router.navigate(['/offer'])  // old version
      this.router.navigate(['/', 'offer-list', this.offer.id])
    }

    //event.stopPropagation();
  }

}
