import apiService from '../../resources/services/api';

export default () => {
    return {
        restrict: 'E',
        templateUrl: 'directives/currency/currency.html', 
        scope: {
            data: '=',
        },
        link: function(scope) {},
        controller: currencyDirective,
        controllerAs: 'vm',
        bindToController: true
    };
}

class currencyDirective {
    constructor($timeout, $scope) {
        this.scope = $scope;
        this.setupForm();
    }

    setupForm() {
        this.currencyTemp = {
            name: "",
            prefix: "",
            symbol: "",
        }
        this.currencyTempSelected = null;
    }

    selectItem(data) {
        this.currencyTemp = this.currencyTempSelected = angular.copy(data);
    }

    clean(object) {
        if(object) {
            for(var key in object) {
                object[key] = null;
            }
        }

        this.currencyTempSelected = null;
        return object;  
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

    create(data) {
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

    delete(object) {
        if(object && object.id) {
            var url = "/data/currency/" + object.id;
            apiService.call(url, "DELETE").then((res) => {
                if(res) {
                    this.updateSourceData();
                }
            });
        }
    }

    update(object) {
        if(object && object.id) {
            var url = "/data/currency/" + object.id;
            apiService.call(url, "PUT", object).then((res) => {
                if(res) {
                    this.updateSourceData();
                }
            });
        }
    }

    updateSourceData() {
        this.scope.$parent.vm.getData("currency")
    }

    
}

currencyDirective.$inject = ['$timeout', '$scope'];