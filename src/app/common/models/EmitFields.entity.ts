export class EmitFields {
    id: any;
    isValid: Boolean;
    value: any;
    rawValue: any;
    constructor(id: any, isValid: Boolean, value: any, rawValue?: any) {
        this.id = id;
        this.isValid = isValid;
        this.value = value;
        this.rawValue = rawValue;
    }
}
