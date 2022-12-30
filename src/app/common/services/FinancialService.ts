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

    private configStorage(context?: string) {
        context = context || this._gc.context;
        this.db = new Storage(context);
    }

    private getStorage(context?: string) {
        this.configStorage(context);
        let db = this.db.get();
        if (!db) {
            db = {
                name: this.db.CONTEXT,
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

    private saveData(table: string, data: any, context?: string) {
        let response = false;
        const db = this.getStorage(context);
        try {
            if (db) {
                if (!data.id) {
                    data.id = this.uuidv4();
                }
                db[table].documents.push(data);
                this.db.save(db, context);
                response = true;
            }
        } catch (error) {
            console.warn('saveData error: ', error);
            response = false;
        }

        return response;
    }

    private saveDataList(table: string, data: Array<any>, context?: string) {
        let response;
        const db = this.getStorage(context);
        try {
            if (db) {
                db[table].documents = data;
                this.db.save(db);
                response = this.getStorage(context);
            }
        } catch (error) {
            console.warn('saveData error: ', error);
            response = null;
        }

        return response;
    }

    private addDataList(table: string, data: Array<any>, context?: string) {
        let response;
        const db = this.getStorage(context);
        try {
            if (db) {
                data.forEach(item => {
                    if (!item.id) {
                        item.id = this.uuidv4();
                    }
                });
                db[table].documents.push(...data);
                this.db.save(db, context);
                response = this.getStorage(context);
                console.info(`save data in ${ context } context`)
            }
        } catch (error) {
            console.warn('saveData error: ', error);
            response = null;
        }

        return response;
    }

    private updateData(table: string, data: any, context?: string) {
        try {
            const db = this.getStorage(context);
            if (db) {
                if (data.id) {
                    db[table].documents = this.updateSelectiveData(data, db[table].documents);
                    this.db.save(db, context);
                    return true;
                }
            }
        } catch (error) {
            console.info(error);
        }
        return false;
    }

    private updateSelectiveData(data: any, list: Array<any>) {
        const id = data.id;
        const paramsToUpdate = Object.keys(data).filter(x => x !== 'id');
        const index = list.findIndex((i => i.id == id));
        if (index >= 0) {
            paramsToUpdate.forEach(field => {
                list[index][field] = data[field];
            });
        }
        return list;
      }

    private updateAllData(table: string, data: any) {
        const db = this.getStorage();
        if (db) {
            db[table].documents = data;
            this.db.save(db);
            return true;
        }

        return false;
    }

    private deleteStorage(context?: string) {
        this.configStorage(context);
        this.db.clear();
        return true;
    }

    private find(table: string, query: any, context?: string) {
        const db = this.getStorage(context);
        // get field for filter 
        let results: any = [];

        const fields = Object.keys(query);
        fields.forEach(field => {
            const records = db[table].documents.filter((x: any) => x[field] === query[field]);
            records.forEach((record: any) => {
                const checkItem = (item: any) => item.id === record.id;
                if (!results.some(checkItem)){
                    results.push(record);
                }
            });
        });
        
        return results;
    }

    existStorage(name: string) {
        const tempDB = new Storage(name);
        let db = tempDB.get();
        return db ? true : false;
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

    saveBudgetContext(data: IBudget, context: string): boolean {
        let res = this.saveData(this.budgetTable, data, context);
        if (!res) {
            this.createTable(this.budgetTable);
            res = this.saveData(this.budgetTable, data, context);
        }

        return res;
    }

    saveBudgetList(data: Array<IBudget>, context?: string) {
        let res = this.saveDataList(this.budgetTable, data, context);
        return res;
    }

    addBudgetList(data: Array<IBudget>, context?: string) {
        let res = this.addDataList(this.budgetTable, data, context);
        return res;
    }

    updateBudget(data: IBudget, context?: string): boolean {
        data.date = new Date().getTime();
        return this.updateData(this.budgetTable, data, context);
    }

    getBudgets(query?: IFilter | null, context?: string) {
        const db = this.getStorage(context);
        let results: Array<IBudget> = db[this.budgetTable].documents;
        if (query) {
            results = results.filter((x) => { return x.date! >= query.startDate && x.date! <= query.endDate; });
        }
        return results;
    }

    deleteBudget(budget: IBudget) {
        const db = this.getStorage();
        db[this.budgetTable].documents = db[this.budgetTable].documents.filter((item: any) => item.id !== budget.id);
        this.updateAllData(this.budgetTable, db[this.budgetTable].documents);
        return this.getBudgets();
    }

    deleteListStorage(context?: string) {
        this.deleteStorage(context);
    }
    //#endregion

    //#region FILTERS BUDGETS
    filterBudgets(filter: object, context?: string) {
        return this.find(this.budgetTable, filter, context);
    }
    //#endregion

    //#region CONVERTERS
    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }

    uuidList() {
        return 'list-xxxxxxxx-xxxx-4xxx'.replace(/[xy]/g, (c) => {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }
    //#endregion
}