import {Address} from "./Address";

export class User {
  constructor(
              public id:number,
              public nickname : string,
              public first_name : string,
              public last_name : string,
              public email : string,
              public reg_date : Date,
              public address : Address,
              public password : string) {}
}
