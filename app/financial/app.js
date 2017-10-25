/*************************************
 * # Dependences 
 * ***********************************/
import { default as controllerModuleName } from './app.controllers';
import { default as directivesModuleName } from './app.directives';
import { default as routesConfig } from './app.routes';

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

/*************************************
 * # Setup bootstrap 
 * ***********************************/
angular.bootstrap(document, [moduleName]);





