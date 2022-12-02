import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { GlobalConstants } from './common/globals/globalConstants';
import { FinancialService } from './common/services/FinancialService';
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
    private _gc: GlobalConstants,
    private _router: Router,
    private db: FinancialService
    ) { }


  ngOnInit(): void {
    this._router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
    };

    this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this._router.navigated = false;
        window.scrollTo(0, 0);

        this.page = event.url.replace('/', '');
        this._gc.context = this.page === ''? 'global' : this.page;
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
  }

  goPreferences() {

  }

  action(event: any) {
    this.createPopup = false;
    if (event.action === 'save') {
      this.reloadCurrentRoute();
    }
  }

  reloadCurrentRoute() {
    const currentUrl = this._router.url;
    this._router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this._router.navigate([currentUrl]);
    });
  }
  //#endregion
}
