import apiService from '../../resources/services/api';

export default () => {
    return {
        restrict: 'E',
        templateUrl: 'directives/currency/currency.html', 
        scope: {},
        link: function(scope) {},
        controller: currencyDirective,
        controllerAs: 'vm',
        bindToController: true
    };
}

class currencyDirective {
    constructor($timeout) {
        this.currencyTemp = {
            name: "",
            prefix: "",
            symbol: "",
        }
        this.currencyTempSelected = null;
    }

    selectItem(data, scope) {
        if(scope) {
            switch(scope) {
                case "currency": 
                    this.currencyTempSelected = data;
                break;
                default:
                    console.log('data: ', data);
                break;
            }
        }
    }

    saveData(object, source) {
        if(this.validate(object)) {
            switch(source) {
                case 'currency': 
                    this.createCurrency(object);
                    return;
                default:
                break;
            }
        } else {
            console.log('Invalid Object: ', object);
        }
    }

    delete(object, source) {
        if(object) {
            this.deleteFromArray(source, object);
        }
    }

    deleteFromArray(source, object) {
        var item = source.indexOf(object);
        if (item !== -1) {
            source.splice(item, 1);
        }
        return source;
    }

    cleanData(object) {
        if(object) {
            for(var key in object) {
                object[key] = null;
            }
        }
        return object;  
    }

    validate(object) {
        var valid = [];
        if(object) {
            for(var key in object) {
                if((object[key] != undefined || object[key] != null) && object[key] != "") 
                    valid.push(true);
                else 
                    valid.push(false);
            }
        }
        var y = valid.indexOf(false);
        return y == -1 ? true : false;
    }

    getDatabase() {
        apiService.call("/database/sample.json").then((data) => {
            this.scope.data = data;
            this.scope.$apply();
        });
    }

    getCurrencies(callback) {
        apiService.call("/data/currency").then((data) => {
            if(data) {
                this.scope.data.currency = data;
                this.scope.$apply();
                if(callback)
                    callback();
            }
        });
    }

    createCurrency(data) {
        if(this.validate(data)) {
            apiService.call("/data/currency", "POST", data).then((res) => {
                if(res) {
                    this.cleanData(data);
                    this.getCurrencies();
                }
            });
            
        }
    }

    deleteCurrency(object) {
        if(object && object.id) {
            var url = "/data/currency/" + object.id;
            apiService.call(url, "DELETE").then((res) => {
                if(res) {
                    this.getCurrencies();
                }
            });
        }
    }
}

currencyDirective.$inject = ['$timeout'];