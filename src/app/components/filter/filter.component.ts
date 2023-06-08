import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {OfferService} from "../../services/offer.service";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {

  filterForm : FormGroup;

  categories: { id: string; name: string }[] = [];

  constructor(private formBuilder : FormBuilder, public offerService : OfferService) {
    this.filterForm = this.formBuilder.group({
      deps: new FormControl(),
      cats: new FormControl(),
      minPrice: new FormControl(),
      maxPrice: new FormControl(),
      productName: new FormControl(),
    });


    this.offerService.applyFilters(null)
    this.offerService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }



  onSubmit() {

    const productName = this.filterForm.get("productName")?.value;
    const categorie = this.filterForm.get("cats")?.value;
    const departement = this.filterForm.get("deps")?.value;
    const minPrice = this.filterForm.get("minPrice")?.value;
    const maxPrice = this.filterForm.get("maxPrice")?.value;

    const data = {
      productName: productName,
      minPrice : minPrice,
      maxPrice : maxPrice,
      categorie : categorie,
      departement: departement
    };

    this.offerService.applyFilters(data);
    this.offerService.getCategories()
  }
}
