import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { IBudget } from "src/app/common/models/interfaces";
import { FinancialService } from "src/app/common/services/FinancialService";

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
      private db: FinancialService) {}

    ngOnInit() {}

    saveBudget() {
      const data: IBudget = {
        value: this.valueBudget,
        description: this.description,
        entry: this.entry,
      }

      this.db.saveBudget(data);
      this.action.emit({ action: 'save' });
    }

    cancel() {
      this.valueBudget = 0;
      this.description = 'Gasto';
      this.action.emit({ action: 'close' });
    }
  }
