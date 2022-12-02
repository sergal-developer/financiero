import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  //#region PROPERTIES
  @ViewChild(DashboardComponent) dashboard!: DashboardComponent;
  //#endregion

  //#region INTERNAL VARIABLES
  inputName = '';
  createPopup = false;

  page = '';
  //#endregion

  //#region LIFECICLE
  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log('event: ', event);
        this.page = event.url;
        // if (params.module) {
        //   this.module = params.module;
        // } else {
        //   this.module = '';
        // }
      }
    });
  }
  //#endregion

  //#region EVENTS

  goProfile() { }

  goHome() {
    this._router.navigate(['/']);
  }

  createList() {
    this._router.navigate(['/shopping-list']);
  }

  goNewBudget() {
    this.createPopup = true;
    console.log('this.dashboard: ', this.dashboard);
  }

  goPreferences() {

  }

  action(event: any) {
    this.createPopup = false;
    if (event.action === 'save') {
      this.dashboard.ngOnInit();
    }
  }
  //#endregion
}
