export default () => {
    return {
        restrict: 'E',
        templateUrl: 'directives/collectionTransactions/collectionTransactions.html', 
        scope: {},
        link: function(scope) {},
        controller: collectionTransactionsDirective,
        controllerAs: 'vm',
        bindToController: true
    };
}

class collectionTransactionsDirective {
    constructor($timeout) {
        this.screenSize = "small";
    }

    getTypes() {
        apiService.call('types', 'GET', null).then((data) => {
            console.log("data: ", data);
        })
    }

    changeSize() {
        if(this.screenSize === "small") {
            this.screenSize = "medium";
        } else if(this.screenSize === "medium") {
            this.screenSize = "big";
        } else if(this.screenSize === "big") {
            this.screenSize = "small";
        }

        console.log(this.screenSize);
    }

}

collectionTransactionsDirective.$inject = ['$timeout'];