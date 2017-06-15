// imports
import MainController from './views/main.controller';
import HomeController from './views/home/home.controller';
import LoginController from './views/login/login.controller';
import CategoryController from './views/category/category.controller';

var moduleName = "financiero.controllers";

angular.module(moduleName, [])
    .controller("financiero.mainController", MainController)
    .controller("financiero.homeController", HomeController)
    .controller("financiero.loginController", LoginController)
    .controller("financiero.categoryController", CategoryController);

export default moduleName;

