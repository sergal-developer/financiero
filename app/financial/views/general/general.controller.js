import apiService from '../../resources/services/api';

class GeneralController {
    constructor($timeout, $scope, $rootScope) {
        this.scope = $scope;
        this.scope.data = {
            currency: null,
            categories: null,
            users: null,
            wallets: null,
            transactions: null
        };

        this.getData();
    }

    // New functions
    getData(source) {
        
        if(source) {
                apiService.call("/data/" + source).then((data) => {
                if(data) {
                    this.scope.data[source] = data;
                    this.scope.$apply();
                }
            });
        } else {
            apiService.call("/data/currency").then((data) => {
                if(data) {
                    this.scope.data.currency = data;
                    this.scope.$apply();
                }
            });
            apiService.call("/data/categories").then((data) => {
                if(data) {
                    this.scope.data.categories = data;
                    this.scope.$apply();
                }
            });
            apiService.call("/data/users").then((data) => {
                if(data) {
                    this.scope.data.users = data;
                    this.scope.$apply();
                }
            });
            apiService.call("/data/wallets").then((data) => {
                if(data) {
                    this.scope.data.wallets = data;
                    this.scope.$apply();
                }
            });
            apiService.call("/data/transactions").then((data) => {
                if(data) {
                    this.scope.data.transactions = data;
                    this.scope.$apply();
                }
            });
        }

        
    }
}

GeneralController.$inject = ['$timeout', '$scope', '$rootScope'];

export default GeneralController;