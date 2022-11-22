export interface IBudget {
    value: number;
    date: number;
    description: string;
    entry: boolean
    id?: string;
    dateFormated?: string;
    valueFormated?: string;
}