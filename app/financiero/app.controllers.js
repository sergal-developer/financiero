// imports
import MainController from './views/main.controller';
import HomeController from './views/home/home.controller';
import LoginController from './views/login/login.controller';

var moduleName = "happening.controllers";

angular.module(moduleName, [])
    .controller("happening.mainController", MainController)
    .controller("happening.homeController", HomeController)
    .controller("happening.loginController", LoginController);

export default moduleName;

