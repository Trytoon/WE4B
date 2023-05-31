import {Address} from "./Address";

export class User {
  constructor(public nickname : string,
              public first_name : string,
              public last_name : string,
              public email : string,
              public reg_date : Date,
              public address : Address) {}

  get userNickname() : string {
    return this.nickname;
  }

  get userFirst_name() : string {
    return this.first_name;
  }

  get userLast_name() : string {
    return this.last_name;
  }

  get userEmail() : string {
    return this.email;
  }

  get userReg_date() : Date {
    return this.reg_date;
  }

  get userAddress() : Address {
    return this.address
  }
}
