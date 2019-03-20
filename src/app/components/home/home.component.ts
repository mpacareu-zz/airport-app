import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { IAirports } from 'src/app/interfaces/airports.interface';
import { Autocomplete } from 'src/app/services/autocomplete.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  isLoading: boolean;
  isClicked: boolean;
  hasFligth: boolean;
  noFligthsMach: boolean;
  airportControl = new FormControl();
  iataControl = new FormControl();
  airports: IAirports[];
  airNames: string[];
  routes: string[];
  subscription: Subscription;
  currentClasses: {};
  currentMessage: string;

  constructor(

    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private _autompleteService: Autocomplete) {

    this.matIconRegistry
      .addSvgIcon('iata',
        this.domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/img/iata.svg')
      );
    this.matIconRegistry
      .addSvgIcon('departure',
        this.domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/img/departure.svg')
      );

    this.isLoading = false;
    this.isClicked = false;
    this.hasFligth = false;
    this.noFligthsMach = false;
    this.airNames = [];
    this.setCurrentClasses();
    this.setCurrentMessage();

  }

  // load the info from service
  loadData(query: string, departure?: string) {

    if (query.length > 2) {

      this.isLoading = true;
      this.hasFligth = false;
      this.noFligthsMach = false;
      this.airNames = [];

      this.subscription = this._autompleteService.getAirports(query, departure)

        .subscribe((airports) => {

          if (!airports || airports.length === 0) {
            this.airNames = [];
            if (departure !== undefined) {
              this.noFligthsMach = true;
              this.hasFligth = false;
            }
          } else {

            this.airNames = [];

            airports.map(air => {
              this.airNames.push(air.name);
            });

            if (departure !== undefined) {
              this.noFligthsMach = false;
              this.hasFligth = true;
            }

          }
          this.setCurrentClasses();
          this.setCurrentMessage();
          this.isLoading = false;
          this.isClicked = false;
        });

    } else {
      this.airNames = [];
      this.isLoading = false;
    }
    this.setCurrentClasses();
    this.setCurrentMessage();
    
  }

  getUnsubscribed() {
    if (this.isLoading) {
      this.subscription.unsubscribe();
    }
  }
  clicked(){
    this.isClicked = true;
  }

  setCurrentClasses() {
    this.currentClasses = {
      alert: true,
      'results': true,
      'alert-warning': this.noFligthsMach,
      'alert-primary': !this.hasFligth && !this.noFligthsMach,
      'alert-success': this.hasFligth
    }
  }

  setCurrentMessage() {
    if (this.noFligthsMach) {
      this.currentMessage = 'Too bad..!! This airport doesn´t flight to that destination! :(';
    } else if (!this.hasFligth && !this.noFligthsMach) {
      this.currentMessage = 'Very soon you will know, just type and wait a few seconds.! ;)';
    } else if (this.hasFligth) {
      this.currentMessage = 'Excellent..!! This Airport does flight there! :)';
    }
  }

}
