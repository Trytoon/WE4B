import {Address} from "./Address";

export class User {
  constructor(public nickname : string,
              public first_name : string,
              public last_name : string,
              public email : string,
              public reg_date : Date,
              public address : Address) {}
}
