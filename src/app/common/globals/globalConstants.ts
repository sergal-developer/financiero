import { Injectable } from "@angular/core";
import { CONTEXTNAME } from "./contextNames";

@Injectable()
export class GlobalConstants {
    context = '';
    mainContext = CONTEXTNAME.GLOBAL;
    temporalContext = CONTEXTNAME.SHOPPING;

    constructor() {}
}
