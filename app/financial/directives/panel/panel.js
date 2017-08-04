export default () => {
    return {
        restrict: 'E',
        templateUrl: 'directives/panel/panel.html', 
        scope: {},
        link: function(scope) {},
        controller: PanelController,
        controllerAs: 'vm',
        bindToController: true
    };
}

class PanelController {
    constructor($timeout) {
        //this.getTypes();     
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

PanelController.$inject = ['$timeout'];