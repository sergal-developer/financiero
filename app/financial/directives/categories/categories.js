export default () => {
    return {
        restrict: 'E',
        templateUrl: 'directives/itemTransaction/itemTransaction.html', 
        scope: {},
        link: function(scope) {},
        controller: itemTransactionDirective,
        controllerAs: 'vm',
        bindToController: true
    };
}

class itemTransactionDirective {
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

itemTransactionDirective.$inject = ['$timeout'];