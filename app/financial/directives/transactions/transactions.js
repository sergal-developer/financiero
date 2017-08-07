import apiService from '../../resources/services/api';

export default () => {
    return {
        restrict: 'E',
        templateUrl: 'directives/transactions/transactions.html', 
        scope: {
            data: '=',
            currency: "=",
            users: "=",
            wallets: "=",
            categories: "="
        },
        link: function(scope) {},
        controller: transactionsDirective,
        controllerAs: 'vm',
        bindToController: true
    };
}

class transactionsDirective {
    constructor($timeout, $scope) {
        this.scope = $scope;
        this.setupForm();
    }

    setupForm() {
        this.transactionsTemp = {
            description: "", 
            value: 0, 
            update: "", 
            idcurrency: 0, 
            idwallet: 0, 
            idcategory: 0, 
            idplan: 0,
            isbudget: false
        }
        this.transactionsTempSelected = null;
    }

    selectItem(data) {
        this.transactionsTemp = this.transactionsTempSelected = angular.copy(data);
    }

    clean(object) {
        if(object) {
            for(var key in object) {
                object[key] = null;
            }
        }
        this.transactionsTempSelected = null;
        return object;  
    }

    _validate(object) {
        var valid = [];
        if(object) {
            for(var key in object) {
                if((object[key] != undefined && object[key] != null) 
                        && object[key] != "" || object[key] == false) 
                    valid.push(true);
                else 
                    valid.push(false);
            }
        }
        var y = valid.indexOf(false);
        return y == -1 ? true : false;
    }

    create(data) {
        data.update = new Date().toJSON();
        if(this._validate(data)) {
           apiService.call("/data/transactions", "POST", data).then((res) => {
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

    delete(object) {
        if(object && object.id) {
            var url = "/data/transactions/" + object.id;
            apiService.call(url, "DELETE").then((res) => {
                if(res) {
                    this.updateSourceData();
                }
            });
        }
    }

    update(object) {
        if(object && object.id) {
            var url = "/data/transactions/" + object.id;
            apiService.call(url, "PUT", object).then((res) => {
                if(res) {
                    this.updateSourceData();
                }
            });
        }
    }

    updateSourceData() {
        this.scope.$parent.vm.getData("transactions")
    }

    
}

transactionsDirective.$inject = ['$timeout', '$scope'];