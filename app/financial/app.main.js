import { default as controllerModuleName } from './app.controllers';
// import { default as servicesModuleName } from './app.services';
import { default as directivesModuleName } from './app.directives';

var moduleName = 'financieroApp';

function config($routeprovider) {
	$routeprovider
		.when('/',  {
			templateUrl:'views/home/home.html',
			controller:'financiero.homeController',
			controllerAs:'vm'
		})
		// .when('/home',  {
		// 	templateUrl:'views/home/home.html',
		// 	controller:'financiero.homeController',
		// 	controllerAs:'vm'
		// })
		// .when('/login',  {
		// 	templateUrl:'views/login/login.html',
		// 	controller:'financiero.loginController',
		// 	controllerAs:'vm'
		// })
		// .when('/category',  {
		// 	templateUrl:'views/category/category.html',
		// 	controller:'financiero.categoryController',
		// 	controllerAs:'vm'
		// })
		.otherwise({redirectTo:'/'});
	//$locationProvider.html5Mode(true);
}

config.$inject = ['$routeProvider'];

var app = angular.module(moduleName, [
	'ngRoute', 
	'ngMessages',
	// servicesModuleName, 
	controllerModuleName,
	directivesModuleName,
	//modules chars
	// 'chartjs-directive'
]).config(config);

export default moduleName;