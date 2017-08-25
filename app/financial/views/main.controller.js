class MainController {
    constructor($timeout, $scope, $rootScope) {
        this.rootScope = $rootScope;
        this.scope = $scope;

        this.scope.test = "test";
        //Global Variables
        this.rootScope.Menu = { 
            lookPrincipal: false,
            addTransactionScreen: false, 
            userMenuStatus: false  
        }

        this.controllerTest = "test controller";    
        
    }

    openTransacionNew() {
        // if(this.rootScope.Menu.addTransactionScreen) {
        //     this.rootScope.Menu.addTransactionScreen = false;
        //     this.rootScope.Menu.lookPrincipal = false;
        // } else {
            this.rootScope.Menu.addTransactionScreen = true;
            this.rootScope.Menu.lookPrincipal = true;
        // }
    }

    closeTransactionScreen() {
        // if(this.rootScope.Menu.addTransactionScreen) {
        //     this.rootScope.Menu.addTransactionScreen = false;
        //     this.rootScope.Menu.lookPrincipal = false;
        // } else {
            this.rootScope.Menu.addTransactionScreen = false;
            this.rootScope.Menu.lookPrincipal = false;
        // }
    }
}

MainController.$inject = ['$timeout', '$scope', '$rootScope'];

export default MainController;