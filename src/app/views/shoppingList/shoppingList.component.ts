import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { IBudget } from "src/app/common/models/interfaces";
import { Financial } from "src/app/common/services/financial";

@Component({
    selector: 'shoppinglist-view',
    templateUrl: './shoppingList.component.html',
    styleUrls: ['./shoppingList.scss']
  })
  export class ShoppingListComponent {
    listBudgets: Array<IBudget> = [];
    balanceTotal: any;
    budgetTotal: any;
    entryTotal: any;

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

    constructor(
      private db: Financial) {}

    ngOnInit(): void {
      this.firstInitDates();
    }

    getData() {
      const query = { sdate: this.startDate.getTime(), fdate: this.endDate.getTime() };
      this.listBudgets = this.db.getBudgets(query);

      const stadistics = this.db.getTotalBalance(this.listBudgets);
      this.balanceTotal = this.db.toMoney(stadistics.total);
      this.budgetTotal = this.db.toMoney(stadistics.budget);
      this.entryTotal = this.db.toMoney(stadistics.entry);

      this.listBudgets = this.convertItems(this.listBudgets);
    }

    delete(budget: IBudget) {
      console.log('budget: ', budget);
      this.listBudgets = this.db.deleteBudget(budget);
      this.getData();
    }

    edit(budget: IBudget) {
      console.log('budget: ', budget);
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
      console.log('event: ', event);
    }

    showDetails(item: IBudget) {
      item.details = !item.details;
    }


    //#region CONVERTERS
    firstInitDates() {
      const now = new Date();
      this.startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      this.endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      this.startDateFormat = this.startDate.toISOString().split('T')[0];
      this.endDateFormat = this.endDate.toISOString().split('T')[0];
      this.getDates();
      this.getData();
    }

    getDates() {
      let range = '';
      if (!this.endDate) {
        range = this.getMonthName(this.startDate.getMonth());
      } else if (this.endDate && this.startDate) {
        const start = this.getMonthName(this.startDate.getMonth());
        const end = this.getMonthName(this.endDate.getMonth());
        range = start === end ? `${ start }` : `${ start } - ${ end }`;
      }

      this.monthsSelected = range;
    }


    getMonthName(month: number) {
      const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
      return months[month];
    }

    convertItems(list: Array<IBudget>) {
      list.forEach((x, index) => {
        x.dateFormated = this.db.toDateMiliseconds(x.date);
        x.valueFormated = this.db.toMoney(x.value);
        x.index = index;
      })
      return list;
    }
    //#endregion


  }
  