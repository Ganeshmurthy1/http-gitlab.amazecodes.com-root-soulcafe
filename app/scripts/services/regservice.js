'use strict';
/**
 * @ngdoc service
 * @name acslSoulcafeApp.regService
 * @description
 * # regService
 * Factory in the acslSoulcafeApp.
 */
angular.module('sassApp')
  .factory('regService', ['$http', '$facebook', 'localStorageService', function($http, $facebook, localStorageService) {
	   
	    localStorageService.set('apiContext', {
			 base_path: '/SASS/api/',
	    });	  
	    var urlBase = localStorageService.get('apiContext').base_path;
	    var dataFactory = {};
	    
	    var accessLevels = routingConfig.accessLevels
        , userRoles = routingConfig.userRoles;
                 
        //console.log(currentUser);
	    dataFactory.authorize = function(accessLevel, role) {
	    	var currentUser = localStorageService.get('user') || { username: '', role: userRoles.public };
            if(role === undefined)
                role = currentUser.role;
            console.log(accessLevel);
            console.log(role);
            return accessLevel.bitMask & role.bitMask;
        };
        
        dataFactory.isLoggedIn = function(user) {
            if(user === undefined)
                user = currentUser;
            return user.role.title == userRoles.user.title || user.role.title == userRoles.admin.title;
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
	    dataFactory.getDiscussionDetails = function () {
	    	return $http.get(urlBase + 'discussionAll').then(function(response) {
	    		console.log(response);
                return response;
            });
	    	
	    };
		dataFactory.getFbFriendsCount = function () {
	    	return $facebook.api('/me/friends');
	    };
	    dataFactory.getUserDetails = function (uid) {
	    	// console.log(uid);
	    	var fbUrl = urlBase + 'usersAll/' + uid;
	        return $http.get(fbUrl);
	    };
	    dataFactory.getLinkedinUserDetails = function (uid) {
	    	console.log(uid);
	    	var fbUrl = urlBase + 'linkedinUsers/' + uid;
	        return $http.get(fbUrl);
	    };

	      dataFactory.getdiscussionTopicDetails = function (discussionid) {	     
	    	return $http.get(urlBase + 'discussionTopicAll/'+discussionid).then(function(response) {	    		
                return response;
            });
	    	
	    };

	    //getdiscussionListTopicName

	     dataFactory.getdiscussionListTopicName = function (topicid) {	
	     	return $http.get(urlBase + 'getdiscussionListTopicName/'+ topicid).then(function(response) {
                return response;
            });	
	    };

	      //getdiscussionTopicName

	     dataFactory.getdiscussionTopicName = function (topicid) {	

	     	console.log("Toic id",topicid);
	     	return $http.get(urlBase + 'getdiscussionTopicName/'+ topicid).then(function(response) {
                return response;
            });	
	    };



	      dataFactory.getdiscussionTopicComments = function (topic) {	     
	    	return $http.get(urlBase + 'discussionTopicComments/'+topic).then(function(response) {	    		
                return response;
            });
	    	
	    };

	     dataFactory.setCommentsLike = function (commentId) {	     
	    	return $http.get(urlBase + 'setCommentLikes/'+commentId).then(function(response) {	    		
                return response;
            });
	    	
	    };

	     dataFactory.saveComments = function (comment) {	
	     	return $http.post(urlBase + 'saveComments', comment).then(function(response) {
                return response;
            });	
	    };
	    
  	
  	 dataFactory.saveDiscussionboardAbuse = function (param) {	
	     	return $http.get(urlBase + 'saveDiscussionboardabuse/'+ param).then(function(response) {
                return response;
            });	
	    };
	    



	    // setCommentLikes/:commentId

	    return dataFactory;
	}]);