import { CurrencyPipe, DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";
import { Storage } from "src/app/database/session.storage";
import { GlobalConstants } from "../globals/globalConstants";
import { IBudget, IFilter, IResponse } from "../models/interfaces";

@Injectable({
    providedIn: 'root'
})
export class FinancialService {
    budgetTable = 'BUDGETS';
    db = new Storage();

    constructor(
        private _gc: GlobalConstants) {
        }

    private configStorage() {
        this.db = new Storage(this._gc.context);
        console.info('context: ', this._gc.context);
    }

    private getStorage() {
        this.configStorage();
        let db = this.db.get();
        if (!db) {
            db = {
                [this.budgetTable]: {
                    documents: []
                }
            };
        }
        return db;
    }

    private createTable(name: string) {
        try {
            let storage = this.getStorage();
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

    private saveData(table: string, data: any) {
        let response = false;
        const db = this.getStorage();
        try {
            if (db) {
                if (!data.id) {
                    data.id = this.uuidv4();
                }
                db[table].documents.push(data);
                this.db.save(db);
                response = true;
            }
        } catch (error) {
            console.warn('saveData error: ', error);
            response = false;
        }

        return response;
    }

    private updateData(table: string, data: any) {
        const response: IResponse = { code: 200, data: data };
        const db = this.getStorage();
        if (db) {
            const index = db[table].documents.findIndex((x: any) => x.id === data.id);
            if (index !== -1) {
                db[table].documents[index] = data;
                this.db.save(db);
                return true;
            }
        }

        return false;
    }

    private find(table: string, query: string) {
        const db = this.getStorage();
        return db[table].documents.filter((x: any) => x.description.includes(query));
    }

    //#region CRUD BUDGETS
    saveBudget(data: IBudget): boolean {
        let res = this.saveData(this.budgetTable, data);
        if (!res) {
            this.createTable(this.budgetTable);
            res = this.saveData(this.budgetTable, data);
        }

        return res;
    }

    updateBudget(data: IBudget): boolean {
        return this.updateData(this.budgetTable, data);
    }

    getBudgets(query?: IFilter) {
        const db = this.getStorage();
        let results: Array<IBudget> = db[this.budgetTable].documents;
        if (query) {
            results = results.filter((x) => { return x.date! >= query.startDate && x.date! <= query.endDate; });
        }
        return results;
    }

    deleteBudget(budget: IBudget) {
        const db = this.getStorage();
        db[this.budgetTable].documents = db[this.budgetTable].documents.filter((item: any) => item.id !== budget.id);
        this.updateData(this.budgetTable, db[this.budgetTable].documents);
        return this.getBudgets();
    }

    //#endregion

    //#region CONVERTERS
    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }
    //#endregion
}