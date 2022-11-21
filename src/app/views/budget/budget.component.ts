import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { StorageLocal } from "src/app/database/session.storage";

@Component({
    selector: 'budget-view',
    templateUrl: './budget.component.html',
    styleUrls: ['./budget.component.scss']
  })
  export class BudgetComponent implements OnInit {
    valueBudget = 0;
    description = 'Gasto';

    constructor(
      private db: StorageLocal,
      private _router: Router) {}

    ngOnInit() {}

    saveBudget() {
      const data = {
        value: this.valueBudget,
        date: new Date().getTime(),
        description: this.description,
      }
      this.db.saveBudget(data);
      console.log(this.db.viewDataBase());
      this._router.navigate( [`/dashboard`]);
    }

    cancel() {
      this.valueBudget = 0;
      this.description = 'Gasto';
      this._router.navigate( [`/dashboard`]);
    }
  }
