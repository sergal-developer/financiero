export default () => {
    return {
        restrict: 'E',
        templateUrl: 'directives/rootTopBar/rootTopBar.html', 
        scope: {
            user: '='
        },
        link: function(scope) {},
        controller: headerBarDirective,
        controllerAs: 'vm',
        bindToController: true
    };
}

class headerBarDirective {
    constructor($timeout, $scope) {
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

headerBarDirective.$inject = ['$timeout', '$scope'];