import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { IBudget } from "src/app/common/models/interfaces";
import { Financial } from "src/app/common/services/financial";

@Component({
    selector: 'dashboard-view',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
  })
  export class DashboardComponent {
    title = 'financiero-ag';
    listBudgets: Array<IBudget> = [];
    balanceTotal: any;
    budgetTotal: any;
    entryTotal: any;


    constructor(
      private db: Financial) {}

    ngOnInit(): void {
      this.getdata();
    }

    getdata() {
      this.listBudgets = this.db.getBudgets();

      const stadistics = this.db.getTotalBalance(this.listBudgets);
      this.balanceTotal = this.db.toMoney(stadistics.total);
      this.budgetTotal = this.db.toMoney(stadistics.budget);
      this.entryTotal = this.db.toMoney(stadistics.entry);
    }

    delete(budget: any) {
      console.log('budget: ', budget);
      this.listBudgets = this.db.deleteBudget(budget);
      this.getdata();
    }


  }
  