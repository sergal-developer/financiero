import { Component, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CONTEXTNAME } from "src/app/common/globals/contextNames";
import { GlobalConstants } from "src/app/common/globals/globalConstants";
import { IBudget, IFilter } from "src/app/common/models/interfaces";
import { FinancialAPI } from "src/app/common/services/FinancialAPI";

@Component({
    selector: 'shoppinglist-view',
    templateUrl: './shoppingList.component.html',
    styleUrls: ['./shoppingList.scss'],
    encapsulation: ViewEncapsulation.None
  })
  export class ShoppingListComponent {
    listBudgets: Array<IBudget> = [];
    balanceTotal: any;
    budgetTotal: any;
    entryTotal: any;
    stadistics: any;

    startDate = new Date;
    startDateFormat: any;
    endDate = new Date;
    endDateFormat: any;
    monthsSelected: any;
    popupDate = false;

    modal = {
      showModal: false,
      title: 'Update Dates',
      showFooter: false,
      showHeader: true,
      showClose: false,
      fx: 'fx-super-scaled',
      loading: false,
      modalClass: '',
      size: 'full'
    };

    isList = false;
    budgetGlobal: any = null;

    //#region PERMISSIONS
    get canSaveGlobal() {
      return !this.isList && this.listBudgets.length;
    }
    //#endregion

    constructor(
      private _gc: GlobalConstants,
      private API: FinancialAPI,
      private router: Router,
      private activatedRoute: ActivatedRoute) {}

    ngOnInit(): void {
      const context = this.activatedRoute.snapshot.queryParams.name;
      this.isList = false;
      if (context) {
        this._gc.context = context;
        this.isList = true;
      }

      this.checkExistStorage();
    }

    checkExistStorage() {
      if ( this.API.existStorage(this._gc.context)) {
      }
      this.getData();
    }

    firstInitDates() {
      const now = new Date();
      this.startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      this.endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      this.startDateFormat = this.startDate.toISOString().split('T')[0];
      this.endDateFormat = this.endDate.toISOString().split('T')[0];
      this.getDates();
      this.getData();
    }

    getData() {
      this.listBudgets = this.API.getAllBudgetsFormated();

      this.stadistics = this.API.getFullBalance(this.listBudgets);
      this.balanceTotal = this.stadistics.totalFormat;
      this.budgetTotal = this.stadistics.budgetFormat;
      this.entryTotal = this.stadistics.entryFormat;

      if ( this.isList) {
        const budgetsGlobal = this.API.searchBudgetContext({ linkList: this._gc.context });
        this.budgetGlobal = budgetsGlobal[0];
        if (budgetsGlobal.length && this.budgetGlobal.value !== this.stadistics.budget) {
  
          this.budgetGlobal.value = this.stadistics.budget;
          this.API.updateBudget(this.budgetGlobal, CONTEXTNAME.GLOBAL);
        }
      }
    }

    delete(budget: IBudget) {
      this.listBudgets = this.API.deleteBudget(budget);
      this.getData();
    }

    edit(budget: IBudget) {
      if (this.API.updateBudget(budget)) {
        this.getData();
      }
    }

    updateRange() {
      this.startDate = new Date(this.startDateFormat);
      this.endDate = new Date(this.endDateFormat);
      this.startDateFormat = this.startDate.toISOString().split('T')[0];
      this.endDateFormat = this.endDate.toISOString().split('T')[0];
      
      this.getDates();
      this.getData();
      this.modal.showModal = false;
    }

    openDate() {
      this.modal.showModal = true;
    }

    onAfterAction(event?: any) {
      if (event.action === 'DELETE') {
        this.delete(event.data);
      }

      if (event.action === 'EDIT') {
        this.edit(event.data);
      }
    }

    addGeneralBudget() {
      this.getData();
      const budgets = this.API.getAllBudgets();
      const storage = this.API.saveNewDataList(budgets);
      if (storage) {
        this.API.addBudgetToContext(budgets, storage.name);
        this.API.deleteStorage(CONTEXTNAME.SHOPPING);
        this.gotoHome();
      }
    }
    gotoHome() {
      this.router.navigate(['/']);
    }

    //#region CONVERTERS
    getDates() {
      let range = '';
      if (!this.endDate) {
        range = this.API.getMonthName(this.startDate.getMonth());
      } else if (this.endDate && this.startDate) {
        const start = this.API.getMonthName(this.startDate.getMonth());
        const end = this.API.getMonthName(this.endDate.getMonth());
        range = start === end ? `${ start }` : `${ start } - ${ end }`;
      }

      this.monthsSelected = range;
    }
    //#endregion
  }
  