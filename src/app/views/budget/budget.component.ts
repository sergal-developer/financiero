import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { IBudget } from "src/app/common/models/interfaces";
import { Financial } from "src/app/common/services/financial";

@Component({
    selector: 'budget-view',
    templateUrl: './budget.component.html',
    styleUrls: ['./budget.component.scss']
  })
  export class BudgetComponent implements OnInit {
    valueBudget = 0.00;
    description = 'Gasto';
    entry = false;
    autofocus = true;
    @Output() action = new EventEmitter();

    constructor(
      private db: Financial) {}

    ngOnInit() {}

    saveBudget() {
      const data: IBudget = {
        value: this.valueBudget,
        date: new Date().getTime(),
        description: this.description,
        entry: this.entry,
      }
      console.log('data: ', data);
      this.db.saveBudget(data);
      this.action.emit({ action: 'save' });
    }

    cancel() {
      this.valueBudget = 0;
      this.description = 'Gasto';
      this.action.emit({ action: 'close' });
    }
  }
