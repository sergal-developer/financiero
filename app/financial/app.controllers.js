// imports
import MainController from './views/main.controller.js';
import BudgetViewController from './views/budget-view/budget-view.controller.js';
import CategoryAdminController from './views/category-admin/category-admin.controller.js';
import DashboardController from './views/dashboard/dashboard.controller.js';
import ErrorController from './views/error/error.controller.js';
import MoneyAdminController from './views/money-admin/money-admin.controller.js';
import UserAdminController from './views/users-admin/users-admin.controller.js';
import SettingsController from './views/settings/settings.controller.js';
import AdministratorController from './views/administrator-view/administrator-view.controller.js';

var moduleName = "financiero.controllers";

angular.module(moduleName, [])
    .controller("financiero.MainController", MainController)
    .controller("financiero.BudgetViewController", BudgetViewController)
    .controller("financiero.DashboardController", DashboardController)
    .controller("financiero.ErrorController", ErrorController)
    .controller("financiero.SettingsController", SettingsController)
    .controller("financiero.AdministratorController", AdministratorController);

export default moduleName;

