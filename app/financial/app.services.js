// imports
import apiService from './resources/services/api';

var moduleName = 'financiero.services';

angular.module(moduleName, [])
    .factory('getTypes', apiService.call());

export default moduleName;