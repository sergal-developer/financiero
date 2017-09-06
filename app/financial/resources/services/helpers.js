class HelperService {
    constructor() {
        this.apiurl = "/data";
     }
    
    buildUrl(model, action) {
        action = action || "";
        return `${this.apiurl}/${model}/${action}`;
    }

    validateObject(object) {
        var valid = [];
        if(object) {
            for(var key in object) {
                if((object[key] != undefined || object[key] != null) && object[key] != "") {
                    valid.push(true);
                }
                else {
                    valid.push(false);
                }
            }
        }
        var y = valid.indexOf(false);
        return y == -1 ? true : false;
    }

    cleanObject(object) {
        if(object) {
            for(var key in object) {
                object[key] = null;
            }
        }
        return object;  
    }
}

export default new HelperService();