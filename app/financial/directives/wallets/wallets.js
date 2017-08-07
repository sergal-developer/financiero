import apiService from '../../resources/services/api';

export default () => {
    return {
        restrict: 'E',
        templateUrl: 'directives/wallets/wallets.html', 
        scope: {
            data: '=',
            currency: '=',
            users: '='
        },
        link: function(scope) {},
        controller: walletsDirective,
        controllerAs: 'vm',
        bindToController: true
    };
}

class walletsDirective {
    constructor($timeout, $scope) {
        this.scope = $scope;
        this.setupForm();
    }

    setupForm() {
        this.walletsTemp = {
            name: "", 
            balance: 0,
            idcurrency: 0,
            iduser: 0
        }
        this.walletsTempSelected = null;
    }

    selectItem(data) {
        this.walletsTemp = this.walletsTempSelected = angular.copy(data);
    }

    clean(object) {
        if(object) {
            for(var key in object) {
                object[key] = null;
            }
        }
        this.walletsTempSelected = null;
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
        console.log('data: ', data);
        if(this._validate(data)) {
            data.balance = Number(data.balance);
            data.idcurrency = Number(data.idcurrency);
            data.iduser = Number(data.iduser);
           apiService.call("/data/wallets", "POST", data).then((res) => {
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
            var url = "/data/wallets/" + object.id;
            apiService.call(url, "DELETE").then((res) => {
                if(res) {
                    this.updateSourceData();
                }
            });
        }
    }

    update(object) {
        if(object && object.id) {
            var url = "/data/wallets/" + object.id;
            apiService.call(url, "PUT", object).then((res) => {
                if(res) {
                    this.updateSourceData();
                }
            });
        }
    }

    updateSourceData() {
        this.scope.$parent.vm.getData("wallets")
    }

    
}

walletsDirective.$inject = ['$timeout', '$scope'];