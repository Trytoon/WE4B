import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  searchForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, public userService : UserService) {
    this.searchForm = this.formBuilder.group({
      filter: ['']
    });
  }

  onSearch() {
    this.router.navigate(['/offer-list'])
  }
}
