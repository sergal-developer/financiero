import apiService from '../../resources/services/api';

class AdministratorViewController {
    constructor($timeout, $scope, $rootScope) {
        this.scope = $scope;
        this.rootScope = $rootScope;

        
        this.currencyEdit = false;
        this.currencyTemp = {
            name: "",
            prefix: "",
            symbol: ""
        }
        this.currencySelected = [];

    }

    toogleSelect(item, list) {
        var idx = list.indexOf(item);
        if (idx > -1) {
          list.splice(idx, 1);
        }
        else {
          list.push(item);
        }
    }

    exists(item, list) {
        return list.indexOf(item) > -1;
    };

    addCurrency() {
        this.createCurrency(this.currencyTemp);
    }

    deleteCurrencues() {
        console.log('this.currencySelected : ', this.currencySelected );

        if(this.currencySelected.length == 1) {
            this.delete(this.currencySelected[0]);
            this.currencySelected = []
        } else if(this.currencySelected.length > 1) {
            this.deleteBatch(this.currencySelected);
        }
    }

    _validate(object) {
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

    clean(object) {
        if(object) {
            for(var key in object) {
                object[key] = "";
            }
        }
        return object;  
    }

    createCurrency(data) {
        if(this._validate(data)) {
           apiService.call("/data/currency", "POST", data).then((res) => {
                if(res) {
                    this.clean(data);
                    this.updateSourceData();
                }
            });
        }
        else {
            console.log("error: ", data);
        }
    }

    delete(id) {
        if(id) {
            var url = "/data/currency/" + id;
            apiService.call(url, "DELETE").then((res) => {
                if(res) {
                    console.log('res: ', res);
                    this.updateSourceData();
                }
            });
        }
    }

    deleteBatch(array) {
        if(array.length) {
            var url = "/data/currency/" + encodeURI(JSON.stringify(array));
            // url = encodeURI(url);
            console.log('url: ', url);
            apiService.call(url, "DELETE").then((res) => {
                if(res) {
                    console.log('res: ', res);
                    this.updateSourceData();
                }
            });
        }
    }

    updateSourceData() {
        this.rootScope.data.currency = [];
        this.scope.$parent.vm.getData('currency');
    }

    toogleEditCurrency() {
        if(this.currencyEdit) {
            this.currencyEdit = false;
        } else {
            this.currencyEdit = true;
        }
    }
}

AdministratorViewController.$inject = ['$timeout', '$scope', '$rootScope'];

export default AdministratorViewController;