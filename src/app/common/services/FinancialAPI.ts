import { CurrencyPipe, DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";
import { IBudget, IFilter, IResponse } from "../models/interfaces";
import { FinancialService } from "./FinancialService";

@Injectable({
    providedIn: 'root'
})
export class FinancialAPI {
    constructor(
        private _db: FinancialService,
        private _currencyPipe: CurrencyPipe,
        private _datePipe: DatePipe) {
    }

    //#region API BUDGETS 
    saveBudget(budget: IBudget) {
        const data: IBudget = {
            value: budget.value,
            date: new Date().getTime(),
            description: budget.description,
            entry: budget.entry,
        }

        return this._db.saveBudget(data);
    }

    deleteBudget(budget: IBudget) {
      return this._db.deleteBudget(budget);
    }

    updateBudget(budget: IBudget) {
      const data: IBudget = {
        id: budget.id,
        value: budget.value,
        date: new Date().getTime(),
        description: budget.description,
        entry: budget.entry,
      };

      return this._db.updateBudget(data);
    }

    getBudgetsFiltered(query: IFilter) {
        let list = this._db.getBudgets(query);
        return this.convertItems(list);
    }

    getFullBalance(budgets: Array<IBudget>): { 
        total: number, budget: number, entry: number,
        totalFormat: string, budgetFormat: string, entryFormat: string } {

        const response = { total: 0, budget: 0, entry: 0, totalFormat: '', budgetFormat: '', entryFormat: '' };
        const stadistics = this.getTotalBalance(budgets);
        response.total = stadistics.total;
        response.totalFormat = this.toMoney(stadistics.total);
        response.budget = stadistics.budget;
        response.budgetFormat = this.toMoney(stadistics.total);
        response.entry = stadistics.entry;
        response.entryFormat = this.toMoney(stadistics.total);

        return response;
    }
    //#endregion API BUDGETS

    //#region CONVERTERS
    getTotalBalance(list: Array<IBudget>): { total: number, budget: number, entry: number } {
        const result = {
            total: 0,
            budget: 0,
            entry: 0
        };
        const budgets = list.filter((x) => !x.entry);
        const entries = list.filter((x) => x.entry);
        budgets.forEach((x) => { result.budget += x.value });
        entries.forEach((x) => { result.entry += x.value });
        result.total = result.entry - result.budget;
        return result;
    }

    toMoney(value: number) {
        const result = this._currencyPipe.transform(value);
        return result!;
    }

    toDate(value: Date, format = 'MM/d/yyyy') {
        return this._datePipe.transform(value, format);
    }

    toDateMiliseconds(value: number, format = 'MM/d/yyyy') {
        const _value = new Date(value);
        return this.toDate(_value, format);
    }

    convertItems(list: Array<IBudget>) {
        list.forEach((x, index) => {
            x.dateFormated = this.toDateMiliseconds(x.date!);
            x.valueFormated = this.toMoney(x.value!);
            x.index = index;
        })
        return list;
    }

    getMonthName(month: number) {
        const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
        return months[month];
    }

    //#endregion

}