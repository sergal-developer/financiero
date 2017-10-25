export default () => {
    return {
        restrict: 'E',
        templateUrl: 'directives/heroScreen/heroScreen.html', 
        scope: {
            config: '=',
            temporality: '=',
            currentTemporality: '=',
            data: '='
        },
        link: function(scope) {},
        controller: heroScreenDirective,
        controllerAs: 'vm',
        bindToController: true
    };
}

class heroScreenDirective {
    constructor($timeout, $scope, $rootScope) {
        this.scope = $scope;
        this.rootScope = $rootScope;
        this.balance = 0;
        
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

    changeTemporality(data) {
        console.log('this.currentTemporality-root: ', this.scope.$parent.vm);
        this.scope.$parent.vm.updateTransactions();
        this.getBalance();
    }
}

heroScreenDirective.$inject = ['$timeout', '$scope', '$rootScope'];