import helper from '../../resources/services/helpers.js';
import TransactionServices from '../../resources/services/transaction-service.js';

class BudgetViewController {
    constructor($timeout, $scope, $rootScope) {
        this.scope = $scope;
        this.rootScope = $rootScope;
        this.helper = helper;

        // Transaction globals
        this.transactionEdit = false;
        this.transactionTemp = {
            description: "",
            value: "",
            update: "",
            idcurrency: 0,
            idwallet: 0,
            idcategory: 0,
            idplan: null,
            isbudget: false,
            ispaied: false,
        }
        console.log('this.rootScope.data: ', this.rootScope.data);
        this.transactionSelected = [];
        this.updateListTransactions();
    }

    updateListTransactions(next) {
        if(this.rootScope.data.transactions) {    
            
            var min = new Date();
            var max = new Date();

            var x = this.rootScope.data.transactions.filter((item) => {
                item.update = new Date(item.update)
                return item;
                // return new Date(item.update) <= max && new Date(item.update) >= min;
            });

            console.log('x: ', x);

            if(next) {
                next();
            }

        } else {
            // this.rootScope.data.transactionsFiltered = null;
        }
    }

    // # Transaction actions 
    updateTransactionSource() {
        this.isLoading = true;
        TransactionServices.getAll((d) => {
            this.rootScope.data.transactions = d;
            this.isLoading = false; 
            this.scope.$apply();
        });
    }

    createTransaction() {
        TransactionServices.create(this.transactionTemp, (d) => {
            helper.cleanObject(this.transactionTemp);
            this.updateTransactionSource();
        });
    }

    removeTransaction() {
        if(this.transactionSelected.length == 1) {
            TransactionServices.delete(this.transactionSelected[0], (d) => { 
                this.transactionSelected = []
                this.updateTransactionSource(); 
            });
        } else if(this.transactionSelected.length > 1) {
            TransactionServices.deleteBatch(this.transactionSelected, (d) => { 
                this.transactionSelected = []
                this.updateTransactionSource(); 
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

BudgetViewController.$inject = ['$timeout', '$scope', '$rootScope'];

export default BudgetViewController;