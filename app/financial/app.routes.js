function routesConfig($routeProvider, $locationProvider) {
	$routeProvider
		.when('/',  {
			templateUrl:'views/dashboard/dashboard.html',
			controller:'financiero.DashboardController',
			controllerAs:'vm'
		})
		.when('/home',  {
			templateUrl:'views/dashboard/dashboard.html',
			controller:'financiero.DashboardController',
			controllerAs:'vm'
		})
		.when('/budget-view',  {
			templateUrl:'views/budget-view/budget-view.html',
			controller:'financiero.BudgetViewController',
			controllerAs:'vm'
		})
		.when('/settings',  {
			templateUrl:'views/settings/settings.html',
			controller:'financiero.SettingsController',
			controllerAs:'vm'
		})
		.when('/admin',  {
			templateUrl:'views/administrator-view/administrator-view.html',
			controller:'financiero.AdministratorController',
			controllerAs:'vm'
		})
		.when('/error',  {
			templateUrl:'views/error/error.html',
			controller:'financiero.ErrorController',
			controllerAs:'vm'
		})
		.otherwise({redirectTo:'/error'});
		$locationProvider.hashPrefix("");
		$locationProvider.html5Mode(true);
}
routesConfig.$inject = ['$routeProvider', '$locationProvider'];

export default routesConfig;