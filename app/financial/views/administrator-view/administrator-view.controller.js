import helper from '../../resources/services/helpers';
import CurrencyServices from '../../resources/services/currency-service';
import WalletServices from '../../resources/services/wallet-service';
import CategoryServices from '../../resources/services/category-service';

class AdministratorViewController {
    constructor($timeout, $scope, $rootScope) {
        this.scope = $scope;
        this.rootScope = $rootScope;

        // Currency globals
        this.currencyEdit = false;
        this.currencyTemp = {
            name: "",
            prefix: "",
            symbol: ""
        }
        this.currencySelected = [];

        // Walleet Globals
        this.walletEdit = false;
        this.walletTemp = {
            name: "",
            balance: "0.00",
            idcurrency: 1,
            iduser: 1,
        }
        this.walletSelected = [];

        // Category Globals
        this.categoryEdit = false;
        this.categoryTemp = {
            name: "",
            icon: "",
            isentry: false,
        }
        this.categorySelected = [];

        this.isLoading = false;

    }

    // # currency actions 
    updateCurrencySource() {
        this.isLoading = true;
        CurrencyServices.getAll((d) => {
            this.rootScope.data.currency = d;
            this.isLoading = false; 
            this.scope.$apply();
        });
    }

    createCurrency() {
        CurrencyServices.create(this.currencyTemp, (d) => {
            helper.cleanObject(this.currencyTemp);
            this.updateCurrencySource();
        });
    }

    removeCurrency() {
        if(this.currencySelected.length == 1) {
            CurrencyServices.delete(this.currencySelected[0], (d) => { 
                this.currencySelected = []
                this.updateCurrencySource(); 
            });
        } else if(this.currencySelected.length > 1) {
            CurrencyServices.deleteBatch(this.currencySelected, (d) => { 
                this.currencySelected = []
                this.updateCurrencySource(); 
            });
        }
    }
    
    defaultCurrency() {
        // es necesario elimiar el valor predeterminado en todos los campos
        if(this.currencySelected.length == 1) {
            var update = this.rootScope.data.currency.filter((item) => {
                return item.id == this.currencySelected[0];
            })[0];
            update.isdefault = true;
            CurrencyServices.update(update, (d) => { 
                this.currencySelected = []
                this.updateCurrencySource(); 
            });
        }
    }

    // # wallet actions
    updateWalletSource() {
        this.isLoading = true;
        WalletServices.getAll((d) => {
            this.rootScope.data.wallets = d;
            this.isLoading = false; 
            this.scope.$apply();
        });
    }

    createWallet() {
        WalletServices.create(this.walletTemp, (d) => {
            helper.cleanObject(this.walletTemp);
            this.updateWalletSource();
        });
    }

    removeWallet() {
        if(this.walletSelected.length == 1) {
            WalletServices.delete(this.walletSelected[0], (d) => { 
                this.walletSelected = []
                this.updateWalletSource(); 
            });
        } else if(this.walletSelected.length > 1) {
            WalletServices.deleteBatch(this.walletSelected, (d) => { 
                this.walletSelected = []
                this.updateWalletSource(); 
            });
        }
    }
    
    defaultWallet() {
        // es necesario elimiar el valor predeterminado en todos los campos
        if(this.walletSelected.length == 1) {
            var update = this.rootScope.data.wallets.filter((item) => {
                return item.id == this.walletSelected[0];
            })[0];
            update.isdefault = true;
            WalletServices.update(update, (d) => { 
                this.walletSelected = []
                this.updateWalletSource(); 
            });
        }
    }

    // # Category actions
    updateCategorySource() {
        this.isLoading = true;
        CategoryServices.getAll((d) => {
            this.rootScope.data.categories = d;
            this.isLoading = false; 
            this.scope.$apply();
        });
    }

    createCategory() {
        CategoryServices.create(this.categoryTemp, (d) => {
            helper.cleanObject(this.categoryTemp);
            this.updateCategorySource();
        });
    }

    removeCategory() {
        if(this.categorySelected.length == 1) {
            CategoryServices.delete(this.categorySelected[0], (d) => { 
                this.categorySelected = []
                this.updateCategorySource(); 
            });
        } else if(this.categorySelected.length > 1) {
            CategoryServices.deleteBatch(this.categorySelected, (d) => { 
                this.categorySelected = []
                this.updateCategorySource(); 
            });
        }
    }
    
    defaultCategory() {
        // es necesario elimiar el valor predeterminado en todos los campos
        if(this.categorySelected.length == 1) {
            var update = this.rootScope.data.categories.filter((item) => {
                return item.id == this.categorySelected[0];
            })[0];
            update.isdefault = true;
            CategoryServices.update(update, (d) => { 
                this.categorySelected = []
                this.updateCategorySource(); 
            });
        }
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
}

AdministratorViewController.$inject = ['$timeout', '$scope', '$rootScope'];

export default AdministratorViewController;