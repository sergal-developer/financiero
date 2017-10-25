import api from './api';
import helper from './helpers';

class TransactionService {
    constructor() {
        this.modelName = "transactions";
    }

    validate(response) {
        if(!response) {
            console.warn("Please define function next");
            return null;
        }
        return true;
    }

    getAll(next) {    
        if(!this.validate(next)) 
            return null;
        
        api.call(helper.buildUrl(this.modelName)).then((data) => {
            if(data) {
                next(data);
            } else {
                next(null);
            }
        });
    }

    search(options, next) {
        if(!this.validate(next)) 
            return null;

        if(options.id) {
            api.call(helper.buildUrl(this.modelName, options.id)).then((data) => {
                if(data) {
                    next(data);
                }
            });
        } else if(options.name) {
            api.call(helper.buildUrl(this.modelName, "name/" + options.name)).then((data) => {
                if(data) {
                    next(data);
                }
            });
        } else {
            api.call(helper.buildUrl(this.modelName)).then((data) => {
                if(data) {
                    next(data);
                } else {
                    next(null);
                }
            });
        }
    }

    create(item, next) {
        if(!this.validate(next)) 
            return null;

        if(helper.validateObject(item)) {
            api.call(helper.buildUrl(this.modelName), "POST", item).then((res) => {
                 if(res) {
                    next(res);
                 }
             });
         }
         else {
             console.log("error: ", item);
             next(null);
         }
    }

    update(object, next) {
        if(!this.validate(next)) 
            return null;

        if(object && object.id) {
            api.call(helper.buildUrl(this.modelName, object.id), "PUT", object).then((res) => {
                if(res) {
                    next(res);
                }
            });
        }
    }

    delete(id, next) {
        if(!this.validate(next)) 
            return null;
        
        if(id) {
            api.call(helper.buildUrl(this.modelName, id), "DELETE").then((res) => {
                if(res) {
                    next(res);
                }
            });
        }
    }

    deleteBatch(array, next) {
        if(!this.validate(next)) 
            return null;
        
        if(array.length) {
            api.call(helper.buildUrl(this.modelName, "batch/" + JSON.stringify(array)), "DELETE").then((res) => {
                if(res) {
                    next(res);
                }
            });
        }
    }
}

export default new TransactionService();