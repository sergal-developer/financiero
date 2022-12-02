export interface IBudget {
    value: number;
    date: number;
    description: string;
    entry: boolean
    id?: string;
    dateFormated?: any;
    valueFormated?: any;
    index?: number;
    details?: boolean;

    // events
    _editMode?: boolean;
}