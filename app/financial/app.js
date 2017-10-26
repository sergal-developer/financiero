/*************************************
 * # Dependences 
 * ***********************************/
import controllerModuleName from './app.controllers.js';
import directivesModuleName from './app.directives.js';
import routesConfig from './app.routes.js';

/*************************************
 * # Config Module 
 * ***********************************/
var moduleName = 'financieroApp';
var app = angular.module(moduleName, [
			'ngRoute', 
			'ngMessages',
			'ngMaterial',
			'ngAnimate',
			'ngAria',
			controllerModuleName,
			directivesModuleName,
		]).config(routesConfig);






