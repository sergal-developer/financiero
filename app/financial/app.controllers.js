// imports
import MainController from './views/main.controller';
// import GeneralController from './views/general/general.controller';
// import HomeController from './views/home/home.controller';

import BudgetViewController from './views/budget-view/budget-view.controller';
import CategoryAdminController from './views/category-admin/category-admin.controller';
import DashboardController from './views/dashboard/dashboard.controller';
import MoneyAdminController from './views/money-admin/money-admin.controller';
import UserAdminController from './views/users-admin/users-admin.controller';

var moduleName = "financiero.controllers";

angular.module(moduleName, [])
    .controller("financiero.mainController", MainController)
    .controller("financiero.BudgetViewController", BudgetViewController)
    .controller("financiero.CategoryAdminController", CategoryAdminController)
    .controller("financiero.DashboardController", DashboardController)
    .controller("financiero.MoneyAdminController", MoneyAdminController)
    .controller("financiero.UserAdminController", UserAdminController);

export default moduleName;

