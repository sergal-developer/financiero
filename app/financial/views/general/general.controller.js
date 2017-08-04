import apiService from '../../resources/services/api';

class GeneralController {
    constructor($timeout, $scope, $rootScope) {
        this.scope = $scope;
        this.rootScope = $rootScope;

        this.scope.data = {
            currency: []
        };
        this.rootScope.global = {
        };
        
        //this.getDatabase();
        this.getCurrencies();
        this.log = "";

        this.currencyTemp = {
            name: "",
            prefix: "",
            symbol: "",
        }
        this.currencyTempSelected = null;

        this.userTemp = {
            username: "",
            password: "",
            givenname: "",
            middlename: "",
            familyname: "",
            email: "",
            gender: "",
            birthdate: ""
        }
        this.userTempSelected = angular.copy(this.userTemp);

        this.walletTemp = {
            name: "",
            balance: "",
            idcurrency: "",
            iduser: ""
        }
        this.walletTempSelected = angular.copy(this.walletTemp);

        this.typeTemp = {
            name: "",
            icon: "",
            isentry: ""
        }
        this.typeTempSelected = angular.copy(this.typeTemp);

        this.transactionTemp = {
            description: "",
            value: "",
            update: "",
            idcurrency: "",
            idwallet: "",
            idtype: "",
            idplan: "",
            isbudget: ""
        }
        this.transactionTempSelected = angular.copy(this.transactionTemp);
        
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

GeneralController.$inject = ['$timeout', '$scope', '$rootScope'];

export default GeneralController;