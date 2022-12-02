import { CurrencyPipe, DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";
import { Storage } from "src/app/database/session.storage";
import { IBudget } from "../models/interfaces";

@Injectable({
    providedIn: 'root'
})
export class Financial {
    budgetTable = 'BUDGETS';
    db = new Storage();

    constructor(
        private _currencyPipe: CurrencyPipe,
        private _datePipe: DatePipe) {}

    createTable(name: string) {
        try {
            let storage = this.db.get();
            if (storage) {
                storage[name] = {
                    documents: []
                }
            } else {
                storage = {};
                storage[name] = {
                    documents: []
                }
            }
            this.db.save(storage);
            return true;
        } catch (error) {
            return false;
        }
    }

    saveData(table: string, data: any) {
        let storage = this.db.get();
        if (storage) {
            if (!data.id) {
                data.id = this.uuidv4();
            }
            storage[this.budgetTable].documents.push(data);
            this.db.save(storage);
        } else {
            this.createTable(table);
            this.saveData(table, data);
        }
    }

    updateData(table: string, data: any) {
        let storage = this.db.get();
        if (storage) {
            storage[this.budgetTable].documents = data;
            this.db.save(storage);
        } else {
            this.createTable(table);
            this.updateData(table, data);
        }
    }

    find(table: string, query: string) {
        let storage = this.db.get();
        return storage[this.budgetTable].documents.filter((x: any) => x.description.includes(query));
    }

    saveBudget(data: IBudget) {
        const table = 'BUDGETS';
        this.saveData(table, data);
    }

    getBudgets(query?: { sdate: number, fdate: number }) {
        const db = this.db.get();
        let results: Array<IBudget> = db[this.budgetTable].documents;
        console.log('results: ', results);
        if (query) {
            results = results.filter((x) => { return x.date >= query.sdate && x.date <= query.fdate; });
        }
        return results;
    }

    deleteBudget(budget: IBudget) {
        const db = this.db.get();
        db[this.budgetTable].documents = db[this.budgetTable].documents.filter((item: any) => item.id !== budget.id);
        this.updateData(this.budgetTable, db[this.budgetTable].documents);
        return this.getBudgets();
    }

    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }

    getTotalBalance(list: Array<IBudget>): { total: number, budget: number, entry: number} {
        const result = {
            total: 0,
            budget: 0,
            entry: 0
        };
        const budgets = list.filter((x) => !x.entry);
        const entries = list.filter((x) => x.entry);
        budgets.forEach((x) => { result.budget += x.value});
        entries.forEach((x) => { result.entry += x.value});
        result.total = result.entry - result.budget;
        return result;
    }

    toMoney(value: number) {
        const result = this._currencyPipe.transform(value);
        return result;
    }

    toDate(value: Date, format = 'MM/d/yyyy') {
        return this._datePipe.transform(value, format);
    }

    toDateMiliseconds(value: number, format = 'MM/d/yyyy') {
        const _value = new Date(value);
        return this.toDate(_value, format);
    }
}