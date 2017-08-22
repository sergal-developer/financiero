import apiService from '../../resources/services/api';

class HomeController {
    constructor($timeout, $scope, $rootScope) {
        this.scope = $scope;
        this.scope.config = null;
        this.scope.current = null;
        this.scope.data = {
            currency: null,
            categories: null,
            users: null,
            wallets: null,
            transactions: null
        };

        this.rootScope = $rootScope;
        this.rootScope.menu = { 
            rootMenuStatus: false, 
            userMenuStatus: false  
        }
        this.rootScope.currentTemporality = 1;

        this.temporality = [
            { id: 1, name: "Monthly" },
            { id: 2, name: "Weekly" },
            { id: 3, name: "Annually" },
        ];

        this.transactionsFiltered = null;

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
                    this.updateTransactions();
                    this.scope.$apply();
                }
            });
            apiService.call("/data/config").then((data) => {
                if(data) {
                    this.scope.config = data;
                    console.log('this.scope.config: ', this.scope.config);
                    this.scope.config.temporality = { id: 1, name: "Monthly" };
                    this.scope.$apply();
                }
            });
        }

        
    }

    toogleRootMenu() {
        if(this.rootScope.menu.rootMenuStatus) {
            this.rootScope.menu.rootMenuStatus = false;
        } else{
            this.rootScope.menu.rootMenuStatus = true;
        }
    }

    toogleUserMenu() {
        if(this.rootScope.menu.userMenuStatus) {
            this.rootScope.menu.userMenuStatus = false;
        } else{
            this.rootScope.menu.userMenuStatus = true;
        }
    }

    updateTransactions() {
        if(this.scope.data.transactions) {
            var min = new Date();
            var max = new Date();
            var temporality = this.rootScope.currentTemporality;
            if(temporality) {        
                var d = temporality == 1 ? 7 : 
                            temporality == 2 ? 30 : 
                                temporality == 3 ? 365 : 7;

                min.setDate(max.getDate() - d);
            }

            this.transactionsFiltered = this.scope.data.transactions.filter((item) => {
                return new Date(item.update) <= max && new Date(item.update) >= min;
            });
        } else {
            this.transactionsFiltered = null;
        }
        console.log('this.transactionsFiltered: ', this.transactionsFiltered);
    }
}

HomeController.$inject = ['$timeout', '$scope', '$rootScope'];

export default HomeController;