import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { IBudget } from "src/app/common/models/interfaces";
import { FinancialAPI } from "src/app/common/services/FinancialAPI";
import { FinancialService } from "src/app/common/services/FinancialService";

@Component({
    selector: 'budget-view',
    templateUrl: './budget.component.html',
    styleUrls: ['./budget.component.scss'],
    encapsulation: ViewEncapsulation.None
  })
  export class BudgetComponent implements OnInit {
    valueBudget = null;
    description = null;
    descriptionPlaceHolder = 'Gasto';
    entry = false;
    autofocus = true;
    @Output() action = new EventEmitter();

    constructor(
      private API: FinancialAPI) {}

    ngOnInit() {}

    saveBudget() {
      let description = this.entry ? 'ingreso' : 'gasto';
      const data: IBudget = {
        value: this.valueBudget || 0,
        description: this.description || description,
        entry: this.entry,
      }

      this.API.saveBudget(data);
      this.action.emit({ action: 'save' });
    }

    cancel() {
      this.valueBudget = null;
      this.description = null;
      this.action.emit({ action: 'close' });
    }

    changeEntry(event: any) {
      this.descriptionPlaceHolder = this.entry ? 'Ingreso' : 'Gasto';
    }
  }
