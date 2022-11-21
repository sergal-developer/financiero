import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { StorageLocal } from "src/app/database/session.storage";

@Component({
    selector: 'dashboard-view',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
  })
  export class DashboardComponent {
    title = 'financiero-ag';
    budgets: Array<{ description: string, value: number, date: number}> = [];
    constructor(
      private db: StorageLocal,
      private _router: Router) {}

    ngOnInit(): void {
      this.budgets = this.db.getBudgets();
      console.log('this.budgets: ', this.budgets);
    }

    delete(budget: any) {
      console.log('budget: ', budget);
      this.budgets = this.db.deleteBudget(budget);
    }

    newBudget() {
      this._router.navigate( [`/budget`]);
    }
  }
  