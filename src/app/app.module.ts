import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { OfferComponent } from './components/offer/offer.component';
import { OfferListComponent } from './components/offer-list/offer-list.component';

@NgModule({
  declarations: [
    AppComponent,
    OfferComponent,
    OfferListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
