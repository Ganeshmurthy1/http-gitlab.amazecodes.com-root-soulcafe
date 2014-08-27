'use strict';

/**
 * @ngdoc service
 * @name sassApp.adminDiscussion
 * @description
 * # adminDiscussion
 * Factory in the sassApp.
 */
angular.module('sassApp')
  .factory('adminDiscussion', ['$http', 'localStorageService', function($http, localStorageService) {
	  	
	  
	    var urlBase = localStorageService.get('apiContext').base_path;
	    var dataFactory = {};
	    
	    dataFactory.addDiscussion = function (param) {
	    	// console.log(param);
	    	return $http.post(urlBase + 'admin_add_discussion', param).then(function(response) {
	    		//console.log(response);
                return response;
            });
	    	
	    };
	    
	    return dataFactory;
	}]);