// imports
import MainController from './views/main.controller';
import GeneralController from './views/general/general.controller';

var moduleName = "financiero.controllers";

angular.module(moduleName, [])
    .controller("financiero.mainController", MainController)
    .controller("financiero.generalController", GeneralController);

export default moduleName;

