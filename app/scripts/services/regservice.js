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
			 base_path: '/Soulcafe/api/',
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
	    	console.log(param);
	    	var data = 'fb_id=' + param.id;
	    	return $http.post(urlBase + 'add_user', param).then(function(response) {
                return response;
            });	    	
	    };
	    dataFactory.getDiscussionListStatus = function () {
	    	return $http.get(urlBase + 'get_DiscussionListStatus').then(function(response) {
                return response;
            });	    	
	    };
	    dataFactory.joinDiscussion = function (param) {
	    	//console.log(param);
	    	
	    	return $http.get(urlBase + 'join_discussion/'+ param).then(function(response) {
                return response;
            });	    	
	    };
	    dataFactory.addLinkedinDataf = function (param) {
	    	//console.log(param);
	    	return $http.post(urlBase + 'add_linkedinData', param).then(function(response) {
                return response;
            });	    	
	    };
	    dataFactory.VerifyMobile = function (param) {
	    	//console.log(param);
	    	return $http.post(urlBase + 'verify', param).then(function(response) {
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
	    dataFactory.getLinkedinProffesionaldetails = function (uid) {
	    	// console.log(uid);
	    	var linUrl = urlBase + 'getProffesionaldetails/' + uid;
	        return $http.get(linUrl);
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
	    

	      dataFactory.addTopic = function (param) {	
	     	return $http.post(urlBase + 'add_topic', param).then(function(response) {
                return response;
            });	
	    };


	     dataFactory.deleteComment = function (param) {	
	     	return $http.get(urlBase + 'deleteComment/'+ param).then(function(response) {
                return response;
            });	
	    };
	    dataFactory.getProfileDetail = function () {	
	     	return $http.get(urlBase + 'get_Profile_Detail').then(function(response) {
                return response;
            });	
	    };
	    dataFactory.updateProfileDetail = function (param) {
	    	console.log(param);
	    	return $http.post(urlBase + 'update_Profile_Detail', param).then(function(response) {
	    		// console.log(response);
                return response;
            });
	    	
	    };
	    dataFactory.addUserDiscussion = function (param) {
	    	// console.log(param);
	    	return $http.post(urlBase + 'add_User_Discussion', param).then(function(response) {
	    		//console.log(response);
                return response;
            });
	    	
	    };
	    dataFactory.getTotalMembers = function (discussionid) {	     
	    	return $http.get(urlBase + 'get_Total_Members/'+discussionid).then(function(response) {	    		
                return response;
            });
	    	
	    };
	    dataFactory.removeUser = function (discussionid) {	     
	    	return $http.get(urlBase + 'remove_User/'+discussionid).then(function(response) {	    		
                return response;
            });
	    	
	    };
	    dataFactory.getTotalComments = function (discussionid) {	     
	    	return $http.get(urlBase + 'get_Total_Comments/'+discussionid).then(function(response) {	    		
                return response;
            });
	    	
	    };
	    dataFactory.userJoined = function (discussionid) {	     
	    	return $http.get(urlBase + 'user_Joined/'+discussionid).then(function(response) {	    		
                return response;
            });
	    	
	    };
	    dataFactory.updateRating = function (rating) {	     
	    	return $http.post(urlBase + 'update_Rating',rating).then(function(response) {	    		
                return response;
            });
	    	
	    };
	    dataFactory.getRating = function (topicid) {	
	     	return $http.get(urlBase + 'get_Rating/'+ topicid).then(function(response) {
                return response;
            });	
	    };
	     dataFactory.getPicture = function () {	
	     	return $http.get(urlBase + 'get_Picture').then(function(response) {
                return response;
            });	
	    };
	    dataFactory.getProfilePictures = function (discussionid) {	     
	    	return $http.get(urlBase + 'get_ProfilePictures/'+discussionid).then(function(response) {	    		
                return response;
            });
	    	
	    };
	    dataFactory.getPicturesComments = function (topicid) {	     
	    	return $http.get(urlBase + 'get_PicturesComments/'+topicid).then(function(response) {	    		
                return response;
            });
	    	
	    };
	    
	    return dataFactory;
	}]);