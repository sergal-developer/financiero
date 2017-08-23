import { default as controllerModuleName } from './app.controllers';
// import { default as servicesModuleName } from './app.services';
import { default as directivesModuleName } from './app.directives';

var moduleName = 'financieroApp';

function config($routeprovider) {
	$routeprovider
		.when('/',  {
			templateUrl:'views/dashboard/dashboard.html',
			controller:'financiero.DashboardController',
			controllerAs:'vm'
		})
		// .when('/home',  {
		// 	templateUrl:'views/dashboard/dashboard.html',
		// 	controller:'financiero.DashboardController',
		// 	controllerAs:'vm'
		// })
		// .when('/budget-view',  {
		// 	templateUrl:'views/budget-view/budget-view.html',
		// 	controller:'financiero.BudgetViewController',
		// 	controllerAs:'vm'
		// })
		// .when('/category-admin',  {
		// 	templateUrl:'views/category-admin/category-admin.html',
		// 	controller:'financiero.CategoryAdminController',
		// 	controllerAs:'vm'
		// })
		// .when('/money-admin',  {
		// 	templateUrl:'views/money-admin/money-admin.html',
		// 	controller:'financiero.MoneyAdminController',
		// 	controllerAs:'vm'
		// })
		// .when('/users-admin',  {
		// 	templateUrl:'views/users-admin/users-admin.html',
		// 	controller:'financiero.UserAdminController',
		// 	controllerAs:'vm'
		// })
		.otherwise({redirectTo:'/'});
	// $locationProvider.html5Mode(true);
}

config.$inject = ['$routeProvider'];

var app = angular.module(moduleName, [
	'ngRoute', 
	'ngMessages',
	'ngMaterial',
	'ngAnimate',
	'ngAria',
	// servicesModuleName, 
	controllerModuleName,
	directivesModuleName,
	//modules chars
	// 'chartjs-directive'
]).config(config);

export default moduleName;