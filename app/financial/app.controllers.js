// imports
import MainController from './views/main.controller';
import GeneralController from './views/general/general.controller';
import HomeController from './views/home/home.controller';

var moduleName = "financiero.controllers";

angular.module(moduleName, [])
    .controller("financiero.mainController", MainController)
    .controller("financiero.homeController", HomeController)
    .controller("financiero.generalController", GeneralController);

export default moduleName;

