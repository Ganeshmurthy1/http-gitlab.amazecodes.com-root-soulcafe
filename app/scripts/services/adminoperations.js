'use strict';

/**
 * @ngdoc service
 * @name sassApp.adminOperations
 * @description
 * # adminOperations
 * Factory in the sassApp.
 */
angular.module('sassApp')
  .factory('adminOperations', ['$http', 'localStorageService', function($http, localStorageService) {
	  	
	  
	    var urlBase = localStorageService.get('apiContext').base_path;
	    var dataFactory = {};
	    dataFactory.signIn = function (param) {
	    	// console.log(param);
	    	return $http.post(urlBase + 'admin_login', param).then(function(response) {
	    		//console.log(response);
                return response;
            });	    	
	    };
	    dataFactory.adminGetAllUsers = function () {	
	      	return $http.get(urlBase + 'admin_get_all_users').then(function(response) {
	    		//console.log(response);
                return response;
            });	 
	      };
	    dataFactory.adminGetBlockedUsers = function () {	
		      	return $http.get(urlBase + 'admin_get_blocked_users').then(function(response) {
		    		//console.log(response);
	                return response;
	            });	 
		  };
		 dataFactory.adminActivateUser = function (param) {
		    	//console.log(param);
		    	var fbUrl = urlBase + 'admin_activate_user/' + param;
		        return $http.get(fbUrl);
		  };
		  dataFactory.admindeActivateUser = function (param) {
		    	//console.log(param);
		    	var fbUrl = urlBase + 'admin_deactivate_user/' + param;
		        return $http.get(fbUrl);
		  };
		  
		  dataFactory.adminGetAllMessage = function () {	
		      	return $http.get(urlBase + 'admin_get_all_message').then(function(response) {
		    		//console.log(response);
	                return response;
	            });	 
		      };
	      dataFactory.getMyMessage = function () {	
		      	return $http.get(urlBase + 'get_my_message').then(function(response) {
		    		//console.log(response);
	                return response;
	            });	 
		  };
		  dataFactory.getPictureAndName = function (id) {	
		     	return $http.get(urlBase + 'get_picture_name/'+ id).then(function(response) {
	                return response;
	            });	
		    };
	     dataFactory.sentMessage = function (comment) {	
	     	return $http.post(urlBase + 'sent_message', comment).then(function(response) {
                return response;
            });	
	    };
	    dataFactory.getAllForum = function () {	
	      	return $http.get(urlBase + 'get_all_forum').then(function(response) {
	    		//console.log(response);
                return response;
            });	 
	      };
	      dataFactory.addAdmin = function (param) {
		    	// console.log(param);
		    	return $http.post(urlBase + 'admin_add_admin', param).then(function(response) {
		    		//console.log(response);
	                return response;
	            });
		};
		dataFactory.getAllAdmins = function () {	
	      	return $http.get(urlBase + 'get_all_admins').then(function(response) {
	    		//console.log(response);
                return response;
            });	 
	    };
		dataFactory.adminGetMyForums = function () {	
		      	return $http.get(urlBase + 'admin_get_my_forums').then(function(response) {
		    		//console.log(response);
	                return response;
	            });	 
		};
		dataFactory.activateUser = function (id) {	
		     	return $http.get(urlBase + 'activate_user/'+ id).then(function(response) {
	                return response;
	            });	
		};
		dataFactory.deactivateUser = function (id) {	
		     	return $http.get(urlBase + 'deactivate_user/'+ id).then(function(response) {
	                return response;
	            });	
		};
		dataFactory.getAdminData = function (id) {	
		     	return $http.get(urlBase + 'get_admin_data/'+ id).then(function(response) {
	                return response;
	            });	
		};
		dataFactory.updateAdminData = function (param) {
		    	// console.log(param);
		    	return $http.post(urlBase + 'update_admin_data', param).then(function(response) {
		    		//console.log(response);
	                return response;
	            });
		};
		dataFactory.viewProfileData = function (id) {	
		     	return $http.get(urlBase + 'view_profile_data/'+ id).then(function(response) {
	                return response;
	            });	
		};
		dataFactory.userActivate = function (id) {	
		     	return $http.get(urlBase + 'user_activate/'+ id).then(function(response) {
	                return response;
	            });	
		};
		dataFactory.userDeactivate = function (id) {	
		     	return $http.get(urlBase + 'user_deactivate/'+ id).then(function(response) {
	                return response;
	            });	
		};
	    return dataFactory;
	}]);


