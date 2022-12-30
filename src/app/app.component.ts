import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CONTEXTNAME } from './common/globals/contextNames';
import { GlobalConstants } from './common/globals/globalConstants';
import { FinancialAPI } from './common/services/FinancialAPI';
import { FinancialService } from './common/services/FinancialService';
import { DashboardComponent } from './views/dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  //#region PROPERTIES
  @ViewChild(DashboardComponent) dashboard!: DashboardComponent;
  //#endregion

  //#region INTERNAL VARIABLES
  inputName = '';
  createPopup = false;

  page = '';
  pendingShopingList = false;
  //#endregion

  //#region LIFECICLE
  constructor(
    private _gc: GlobalConstants,
    private _router: Router,
    private API: FinancialAPI,
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
        this._gc.context = this.page === ''? this._gc.mainContext : this.page;

        this.checkPendingList();
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
    const urlArray = currentUrl.split('?');
    const url = urlArray[0];
    const urlParams = urlArray.length === 1 ? []
                      : urlArray.length > 1 ? urlArray[1].split('&') : [];
    const queryParams: any = {};
    urlParams.forEach((x) => {
      const keys = x.split('=');
      if (keys.length > 1) {
        queryParams[`${ keys[0] }`] = keys[1];
      }
    });

    this._router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this._router.navigate([url], { queryParams: queryParams });
    });
  }

  checkPendingList() {
    const SHOPPINGLIST = this.API.getAllBudgets(CONTEXTNAME.SHOPPING);
    this.pendingShopingList = SHOPPINGLIST.length ? true : false;
  }
  //#endregion
}
