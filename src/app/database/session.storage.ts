export class Storage {
    CONTEXT: string = 'financiero';
    constructor() { }

    get() {
        const data = localStorage.getItem(this.CONTEXT);
        return data ? JSON.parse(data) : null;
    }

    save(data: any) {
        localStorage.setItem(this.CONTEXT, JSON.stringify(data));
    }

    clear() {
        localStorage.removeItem(this.CONTEXT);
    }

    clearAll() {
        localStorage.clear();
    }
}