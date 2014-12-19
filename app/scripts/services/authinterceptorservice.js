'use strict';

/**
 * @ngdoc service
 * @name sassApp.authInterceptorService
 * @description
 * # authInterceptorService
 * Factory in the sassApp.
 */
angular.module('sassApp')
  .factory('authInterceptorService', ['$q', '$location', 'localStorageService', function ($q, $location, localStorageService) {

	    var authInterceptorServiceFactory = {};

	    var _request = function (config) {

	        config.headers = config.headers || {};

	        var authData = localStorageService.get('authorizationData');
	        if (authData) {
	            config.headers.authorization = 'Bearer ' + authData.token + ' user_id ' + authData.user_id;
	        }

	        return config;
	    }

	    var _responseError = function (rejection) {
	        if (rejection.status === 401) {
	            $location.path('/');
	        }
	        if (rejection.status === 500) {
	            $location.path('/page-error');
	        }
	        return $q.reject(rejection);
	    }

	    authInterceptorServiceFactory.request = _request;
	    authInterceptorServiceFactory.responseError = _responseError;

	    return authInterceptorServiceFactory;
	}]);