'use strict';

/**
 * @ngdoc service
 * @name acslSoulcafeApp.regService
 * @description
 * # regService
 * Factory in the acslSoulcafeApp.
 */
angular.module('sassApp')
  .factory('regService', ['$http', '$facebook', function($http, $facebook) {

	    var urlBase = '/Soulcafe/api/';
	    var dataFactory = {};

	    dataFactory.getChannelList = function () {
	        return $http.get(urlBase);
	    };
	    dataFactory.getFbUserStatus = function (param) {
	    	console.log(param);
	    	var fbUrl = urlBase + 'users/' + param.id;
	        return $http.get(fbUrl);
	    };
	    dataFactory.registerUser = function (param) {
	    	//console.log(param);
	    	var data = 'fb_id=' + param.id;
	    	return $http.post(urlBase + 'add_user', param).then(function(response) {
                return response;
            });
	    	
	    };
	    dataFactory.VerifyMobile = function (param) {
	    	//console.log(param);
	    	return $http.post(urlBase + 'verify', param).then(function(response) {
                return response;
            });
	    	
	    };
	    dataFactory.addEducationData = function (param) {
	    	// console.log(param);
	    	return $http.post(urlBase + 'add_education', param).then(function(response) {
	    		console.log(response);
                return response;
            });
	    	
	    };
	    dataFactory.addContactData = function (param) {
	    	// console.log(param);
	    	return $http.post(urlBase + 'add_contact', param).then(function(response) {
	    		console.log(response);
                return response;
            });
	    	
	    };
	    dataFactory.addCurrentPositionData = function (param) {
	    	// console.log(param);
	    	return $http.post(urlBase + 'add_currentposition', param).then(function(response) {
	    		console.log(response);
                return response;
            });
	    	
	    };
	    dataFactory.addPastPositionData = function (param) {
	    	// console.log(param);
	    	return $http.post(urlBase + 'add_pastposition', param).then(function(response) {
	    		console.log(response);
                return response;
            });
         };
        dataFactory.updateUser = function (param) {
	    	console.log(param);
	    	return $http.post(urlBase + 'update_user', param).then(function(response) {
	    		console.log(response);
                return response;
            });
	    	
	    };
		dataFactory.getFbFriendsCount = function () {
	    	return $facebook.api('/me/friends');
	    };
	    dataFactory.getUserDetails = function (uid) {
	    	console.log(uid);
	    	var fbUrl = urlBase + 'usersAll/' + uid;
	        return $http.get(fbUrl);
	    };
	    return dataFactory;
	}]);
