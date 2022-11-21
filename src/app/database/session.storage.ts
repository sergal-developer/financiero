export class StorageLocal {
    STORAGENAME: string = 'financiero';
    constructor() { }

    createTable(name: string) {
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
            this.saveStorage(storage);
            return true;
        } catch (error) {
            console.log('error: ', error);
            return false;
        }
    }

    saveData(table: string, data: any) {
        let storage = this.getStorage();
        if (storage) {
            if (!data.id) {
                data.id = this.uuidv4();
            }
            storage[table].documents.push(data);
            this.saveStorage(storage);
        } else {
            this.createTable(table);
            this.saveData(table, data);
        }
    }

    updateData(table: string, data: any) {
        let storage = this.getStorage();
        if (storage) {
            storage[table].documents = data;
            this.saveStorage(storage);
        } else {
            this.createTable(table);
            this.updateData(table, data);
        }
    }

    find(table: string, query: string) {
        let storage = this.getStorage();
        return storage[table].documents.filter((x: any) => x.description.includes(query));
    }

    viewDataBase() {
        return this.getStorage();
    }

    private getStorage() {
        const data = localStorage.getItem(this.STORAGENAME);
        return data ? JSON.parse(data) : null;
    }

    private saveStorage(data: any) {
        localStorage.setItem(this.STORAGENAME, JSON.stringify(data));
    }

    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }

    saveBudget(data: any) {
        const table = 'BUDGETS';
        this.saveData(table, data);
    }

    getBudgets() {
        const table = 'BUDGETS';
        const db = this.viewDataBase();
        return db[table].documents;
    }

    deleteBudget(budget: any) {
        const table = 'BUDGETS';
        const db = this.viewDataBase();
        db[table].documents = db[table].documents.filter((item: any) => item.id !== budget.id);
        this.updateData(table, db[table].documents);
        return this.getBudgets();
    }
}