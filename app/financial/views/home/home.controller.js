import apiService from '../../resources/services/api';

class HomeController {
    constructor($timeout, $scope, $rootScope) {
        this.scope = $scope;
        this.scope.config = {
            currency: null,
            user: null,
            wallet: null
        };
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
                    this.scope.config.currency = data[0];
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
                    this.scope.config.user = data[0];
                    this.scope.$apply();
                }
            });
            apiService.call("/data/wallets").then((data) => {
                if(data) {
                    this.scope.data.wallets = data;
                    this.scope.config.wallet = data[0];
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

HomeController.$inject = ['$timeout', '$scope', '$rootScope'];

export default HomeController;