import { Offer } from "./Offer";
import { User } from "./User";

export class OfferDetails {
  public offer: Offer;
  public seller: User;

  constructor(
    offer: Offer,
    seller: User,

  ) {
    this.offer = offer;
    this.seller = seller;
  }
}
