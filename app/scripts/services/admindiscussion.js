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
	    dataFactory.getAdminDiscussionTotal = function (param) {
	    	// console.log(param);
	    	return $http.post(urlBase + 'admin_get_discussion_total').then(function(response) {
	    		//console.log(response);
                return response;
            });	    	
	    };
	    dataFactory.getdiscussionTopicDetail = function (param) {
	    	// console.log(param);
	    	return $http.get(urlBase + 'admin_get_discussion_topic/' + param).then(function(response) {
	    		//console.log(response);
                return response;
            });	    	
	    };
	    
	    dataFactory.getAdminDiscussion = function (param) {
	    	// console.log(param);
	    	return $http.post(urlBase + 'admin_get_discussion', param).then(function(response) {
	    		//console.log(response);
                return response;
            });	    	
	    };
	    dataFactory.updatediscussionTopicDetail = function (param) {
	    	// console.log(param);
	    	return $http.post(urlBase + 'update_discussion_TopicDetail', param).then(function(response) {
	    		//console.log(response);
                return response;
            });	    	
	    };
	    dataFactory.adminDeleteDiscussion = function (param) {
	    	//console.log(param);
	    	var fbUrl = urlBase + 'admin_delete_discussion/' + param;
	        return $http.get(fbUrl);
	    };
	    dataFactory.adminActivateDiscussion = function (param) {
	    	//console.log(param);
	    	var fbUrl = urlBase + 'admin_activate_discussion/' + param;
	        return $http.get(fbUrl);
	    };
	    dataFactory.adminDeActivateDiscussion = function (param) {
	    	//console.log(param);
	    	var fbUrl = urlBase + 'admin_deactivate_discussion/' + param;
	        return $http.get(fbUrl);
	    };
	    
	    dataFactory.getAdminForumThis = function (param) {
	    	// console.log(param);
	    	return $http.get(urlBase + 'admin_get_topic_this/' + param).then(function(response) {
	    		//console.log(response);
                return response;
            });	    	
	    };
	    
	    dataFactory.getAdminTopicTotal = function (param) {
	    	// console.log(param);
	    	return $http.get(urlBase + 'admin_get_topic_total/' + param).then(function(response) {
	    		//console.log(response);
                return response;
            });	    	
	    };
	    
	    dataFactory.getAdminTopic = function (param) {
	    	// console.log(param);
	    	return $http.post(urlBase + 'admin_get_topic', param).then(function(response) {
	    		//console.log(response);
                return response;
            });	    	
	    };
	    
	    dataFactory.addTopic = function (param) {
	    	// console.log(param);
	    	return $http.post(urlBase + 'admin_add_topic', param).then(function(response) {
	    		//console.log(response);
                return response;
            });
	    	
	    };
	    
	    dataFactory.adminDeleteTopic = function (param) {
	    	//console.log(param);
	    	var fbUrl = urlBase + 'admin_delete_topic/' + param;
	        return $http.get(fbUrl);
	    };
	    dataFactory.adminActivateTopic = function (param) {
	    	//console.log(param);
	    	var fbUrl = urlBase + 'admin_activate_topic/' + param;
	        return $http.get(fbUrl);
	    };
	    dataFactory.adminDeActivateTopic = function (param) {
	    	//console.log(param);
	    	var fbUrl = urlBase + 'admin_deactivate_topic/' + param;
	        return $http.get(fbUrl);
	    };


	      dataFactory.adminAbuseList = function () {	
	      	var abuseListUrl = urlBase + 'adminAbuseList';
	        return $http.get(abuseListUrl);
	     	
            });	
	    };
	    
	    
	    return dataFactory;
	}]);