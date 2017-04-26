import { default as controllerModuleName } from './app.controllers';
// import { default as servicesModuleName } from './app.services';
// import { default as directivesModuleName } from './app.directives';

var moduleName = 'happeningApp';

function config($routeprovider) {
    console.log('$routeprovider: ', $routeprovider);

	$routeprovider
		.when('/',  {
			templateUrl:'views/home/home.html',
			controller:'happening.homeController',
			controllerAs:'vm'
		})
		.when('/login',  {
			templateUrl:'views/login/login.html',
			controller:'happening.loginController',
			controllerAs:'vm'
		})
		.otherwise({redirectTo:'/'});
}

config.$inject = ['$routeProvider'];

var app = angular.module(moduleName, [
	'ngRoute', 
	'ngMessages',
	// servicesModuleName, 
	controllerModuleName
	// directivesModuleName
]).config(config);

export default moduleName;