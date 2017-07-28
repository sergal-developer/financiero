export default () => {
    return {
        restrict: 'E',
        templateUrl: 'directives/heroScreen/heroScreen.html', 
        scope: {
            currency: "=",
            transactions: "=",
            temporality: "=",
            currentTemporality: "=",
        },
        link: function(scope) {},
        controller: heroScreenDirective,
        controllerAs: 'vm',
        bindToController: true
    };
}

class heroScreenDirective {
    constructor($timeout, $scope) {
        this.balance = 0;
        this.actualCurrency = this.currency;
        this.budget = 0;
        this.getBalance();
        this.scope = $scope;
        this.scope.$watch('transactions', () => {
            this.getBalance();
        });
    }

    getBalance() {
        this.balance = 0;
        if(this.transactions) {
            for(var i in this.transactions) {
                this.balance += this.transactions[i].value;
            }
        }
        this.balance = this.balance.toFixed(2);
    }
}

heroScreenDirective.$inject = ['$timeout', '$scope'];