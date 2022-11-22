export class StorageLocal {
    STORAGENAME: string = 'financiero';
    constructor() { }

    get() {
        const data = localStorage.getItem(this.STORAGENAME);
        return data ? JSON.parse(data) : null;
    }

    save(data: any) {
        localStorage.setItem(this.STORAGENAME, JSON.stringify(data));
    }

    clear() {
        localStorage.removeItem(this.STORAGENAME);
    }

    clearAll() {
        localStorage.clear();
    }
}