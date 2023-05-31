export class Offer {
  constructor(
    public index_offer : number,
    public title : string,
    public nb_pictures : number,
    public price : number,
    public description : string,
    public categorie : string,
    public seller : string,
    public post_date : Date,
    public shippable : boolean
  ){}
}
