import {Address} from "./Address";

export class Offer {
  constructor(
              public id : number,
              public title : string,
              public nb_pictures : number,
              public price : number,
              public description : string,
              public categorie : string,
              public seller : string,
              public post_date : Date,
              public shippable : boolean,
              public liked : boolean,
              public address : Address){}
}
