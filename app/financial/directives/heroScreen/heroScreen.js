export default () => {
    return {
        restrict: 'E',
        templateUrl: 'directives/heroScreen/heroScreen.html', 
        scope: {
            config: '=',
            data: '='
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
        // this.actualCurrency = this.currency;
        // this.budget = 0;
        // this.getBalance();
        // this.scope = $scope;
        // this.scope.$watch('transactions', () => {
        //     this.getBalance();
        // });
        this.getBalance();
    }

    getBalance() {
        this.balance = 0;
        if(this.data) {
            for(var i in this.data) {
                this.balance += this.data[i].value;
            }
        }
        this.balance = this.balance.toFixed(2);
    }
}

heroScreenDirective.$inject = ['$timeout', '$scope'];