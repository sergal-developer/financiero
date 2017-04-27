// imports
import MainController from './views/main.controller';
import HomeController from './views/home/home.controller';
import LoginController from './views/login/login.controller';

var moduleName = "financiero.controllers";

angular.module(moduleName, [])
    .controller("financiero.mainController", MainController)
    .controller("financiero.homeController", HomeController)
    .controller("financiero.loginController", LoginController);

export default moduleName;

