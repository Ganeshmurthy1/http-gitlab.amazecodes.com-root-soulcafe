'use strict';

/**
 * @ngdoc service
 * @name sassApp.Transporter
 * @description
 * # Transporter
 * Factory in the sassApp.
 */
angular.module('sassApp')
  .factory('Transporter', ['$http',  function($http) {
	  	
	  
	   
	    var dataFactory = {};
	    dataFactory.base_path = '/SASS/api/';
	    var urlBase = '/SASS/api/';
	    
	    //dataFactory.base_path = '/SASS/api/index.php/';
	   // var urlBase = '/SASS/api/index.php/';
	    
	    
	    dataFactory.get = function (path) {
	    	return $http.get(urlBase + path).then(function(response) {
            return response;
          });
	    };
	    
	    dataFactory.post = function (path, param) {
	    	return $http.post(urlBase + path , param).then(function(response) {
                return response;
            });
	    	
	    };
	    return dataFactory;
}]);
