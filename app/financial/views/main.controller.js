import apiService from '../../resources/services/api';

class MainController {
    constructor($timeout, $scope, $rootScope) {
        this.rootScope = $rootScope;
        this.scope = $scope;

        //Global Variables
        this.rootScope.Menu = { 
            lookPrincipal: false,
            addTransactionScreen: false, 
            userMenuStatus: false ,  
        }

        this.rootScope.Status = { 
            dataLoaded: false
        }

        this.rootScope.data = {
            currency: null,
            categories: null,
            users: null,
            wallets: null,
            transactions: null,
            transactionsFiltered: null,
            config: null,
            defaults: {
                currency: 1,
                categories: 1,
                users: 0,
                wallets: 0,
                temporality: 1,
            }
        };

        // Functions
        this.rootScope.$on("updateTransactions", this.updateTransactions);

        this.getData();
    }

    openTransacionNew() {
        // if(this.rootScope.Menu.addTransactionScreen) {
        //     this.rootScope.Menu.addTransactionScreen = false;
        //     this.rootScope.Menu.lookPrincipal = false;
        // } else {
            this.rootScope.Menu.addTransactionScreen = true;
            this.rootScope.Menu.lookPrincipal = true;
        // }
    }

    closeTransactionScreen() {
        // if(this.rootScope.Menu.addTransactionScreen) {
        //     this.rootScope.Menu.addTransactionScreen = false;
        //     this.rootScope.Menu.lookPrincipal = false;
        // } else {
            this.rootScope.Menu.addTransactionScreen = false;
            this.rootScope.Menu.lookPrincipal = false;
        // }
    }

    getData(source) {
        if(source) {
                apiService.call("/data/" + source).then((data) => {
                if(data) {
                    this.rootScope.data[source] = data;
                    this.rootScope.$apply();
                }
            });
        } else {
            apiService.call("/data/currency").then((data) => {
                if(data) {
                    this.rootScope.data.currency = data;
                    this.rootScope.$apply();
                }
            });
            apiService.call("/data/categories").then((data) => {
                if(data) {
                    this.rootScope.data.categories = data;
                    this.rootScope.$apply();
                }
            });
            apiService.call("/data/users").then((data) => {
                if(data) {
                    this.rootScope.data.users = data;
                    this.rootScope.$apply();
                }
            });
            apiService.call("/data/wallets").then((data) => {
                if(data) {
                    this.rootScope.data.wallets = data;
                    this.rootScope.$apply();
                }
            });
            apiService.call("/data/config").then((data) => {
                if(data) {
                    this.rootScope.data.config = data;
                    this.rootScope.$apply();
                }
            });

            apiService.call("/data/transactions").then((data) => {
                if(data) {
                    this.rootScope.data.transactions = data;
                    this.updateTransactions();
                    this.rootScope.$apply();
                    this.rootScope.Status.dataLoaded = true;
                    console.log('this.rootScope: ', this.rootScope.data);


                }
            });
            
        }
    }

    updateTransactions(next) {
        if(this.rootScope.data.transactions) {    
            var min = new Date();
            var max = new Date();

            var temporality = this.rootScope.data.defaults.temporality;
            if(temporality) {        
                var d = temporality == 1 ? 7 : 
                            temporality == 2 ? 30 : 
                                temporality == 3 ? 365 : 7;

                min.setDate(max.getDate() - d);
            }

            this.rootScope.data.transactionsFiltered = this.rootScope.data.transactions.filter((item) => {
                return new Date(item.update) <= max && new Date(item.update) >= min;
            });

            if(next) {
                next();
            }

        } else {
            this.rootScope.data.transactionsFiltered = null;
        }
    }
}

MainController.$inject = ['$timeout', '$scope', '$rootScope'];

export default MainController;