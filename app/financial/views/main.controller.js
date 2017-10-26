import apiService from '../../resources/services/api.js';
import helper from '../../resources/services/helpers.js';
import CurrencyServices from '../../resources/services/currency-service.js';
import WalletServices from '../../resources/services/wallet-service.js';
import CategoryServices from '../../resources/services/category-service.js';
import TransactionServices from '../../resources/services/transaction-service.js';

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
                users: 1,
                wallets: 1,
                temporality: 1,
            }
        };

        // Functions
        this.rootScope.$on("updateTransactions", this.updateTransactions);

        this.getData();


        // Separar estas funciones en nuevas directivas 
        // $root.data.defaults.wallets
        // $root.data.defaults.currency
        this.transactionTemp = {
            description: "",
            value: "",
            update: Date(),
            idcurrency: this.rootScope.data.defaults.currency,
            idwallet: this.rootScope.data.defaults.wallets,
            idcategory: 0,
            idplan: null,
            isbudget: false,
            ispaied: true,
        }
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

        this.transactionTemp = {
            description: "",
            value: "",
            update: Date(),
            idcurrency: this.rootScope.data.defaults.currency,
            idwallet: this.rootScope.data.defaults.wallets,
            idcategory: 0,
            idplan: null,
            isbudget: false,
            ispaied: true,
        }
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
            CurrencyServices.getAll((data) => {
                this.rootScope.data.currency = data;
                this.rootScope.$apply();
            });

            CategoryServices.getAll((data) => {
                this.rootScope.data.categories = data;
                this.rootScope.$apply();
            });

            apiService.call("/data/users").then((data) => {
                if(data) {
                    this.rootScope.data.users = data;
                    this.rootScope.$apply();
                }
            });

            WalletServices.getAll((data) => {
                this.rootScope.data.wallets = data;
                this.rootScope.$apply();
            });
            
            apiService.call("/data/config").then((data) => {
                if(data) {
                    this.rootScope.data.config = data;
                    this.rootScope.$apply();
                }
            });

            TransactionServices.getAll((data) => {
                this.rootScope.data.transactions = data;
                this.updateTransactions();
                this.rootScope.$apply();
                this.rootScope.Status.dataLoaded = true;
            })
            
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

    // separar un una directiva nueva
    selectCategory(object, list) {
        console.log('object: ', this.transactionTemp);
        list.forEach(function(l) {
            l.active = false;
        }, this);
        
        this.transactionTemp.idcategory = object.id;
        object.active = true; 
        
    }

    createTransaction() {
        TransactionServices.create(this.transactionTemp, (d) => {
            this.updateTransactionSource();
            // helper.cleanObject(this.transactionTemp);
            this.closeTransactionScreen();
        });
    }

    updateTransactionSource() {
        this.isLoading = true;
        TransactionServices.getAll((d) => {
            this.rootScope.data.transactions = d;
            this.isLoading = false; 
            this.scope.$apply();
        });
    }
}

MainController.$inject = ['$timeout', '$scope', '$rootScope'];

export default MainController;