export default () => {
    return {
        restrict: 'E',
        templateUrl: 'directives/collectionTransactions/collectionTransactions.html', 
        scope: {
            config: '=',
            data: '='
        },
        link: function(scope) {},
        controller: collectionTransactionsDirective,
        controllerAs: 'vm',
        bindToController: true
    };
}

class collectionTransactionsDirective {
    constructor($timeout, $scope) {
    }

}

collectionTransactionsDirective.$inject = ['$timeout', '$scope'];