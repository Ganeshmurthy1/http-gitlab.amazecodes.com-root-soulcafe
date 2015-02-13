'use strict';
/**
 * @ngdoc service
 * @name acslSoulcafeApp.regService
 * @description
 * # regService
 * Factory in the acslSoulcafeApp.
 */
angular.module('sassApp')
  .factory('regService', ['Transporter', '$facebook', 'localStorageService', function(Transporter, $facebook, localStorageService) {
	   
	    localStorageService.set('apiContext', {
			 base_path: '/SASS/api/',
	    });	
//	    localStorageService.set('apiContext', {
//			 base_path: '/SASS/api/index.php/',
//	    });	
	    //var urlBase = localStorageService.get('apiContext').base_path;
	    var dataFactory = {};
	    
	    var accessLevels = routingConfig.accessLevels
        , userRoles = routingConfig.userRoles;
                 
        //console.log(currentUser);
	    dataFactory.authorize = function(accessLevel, role) {
	    	var currentUser = localStorageService.get('user') || { username: '', role: userRoles.public };
            if(role === undefined)
                role = currentUser.role;
            // console.log(accessLevel);
            // console.log(role);
            //if(accessLevel === undefined)
            //  accessLevel = {bitMask:1};
            return accessLevel.bitMask & role.bitMask;
        };
        
        dataFactory.isLoggedIn = function(user) {
            if(user === undefined)
                user = currentUser;
            return user.role.title == userRoles.user.title || user.role.title == userRoles.admin.title;
        };
	    dataFactory.getFbUserStatus = function (param) {
	    	//console.log(param);
	    	var fbUrl = 'users/' + param.id;
	        return Transporter.get(fbUrl);
	    };
	    dataFactory.registerUser = function (param) {
	    	//console.log(param);
	    	var data = 'fb_id=' + param.id;
	    	return Transporter.post('add_user', param).then(function(response) {
                return response;
            });	    	
	    };
	    dataFactory.getDiscussionListStatus = function () {
	    	return Transporter.get('get_DiscussionListStatus').then(function(response) {
                return response;
            });	    	
	    };
	    dataFactory.joinDiscussion = function (param) {
	    	//console.log(param);
	    	
	    	return Transporter.get('join_discussion/'+ param).then(function(response) {
                return response;
            });	    	
	    };
	    dataFactory.addLinkedinDataf = function (param) {
	    	//console.log(param);
	    	return Transporter.post('add_linkedinData', param).then(function(response) {
                return response;
            });	    	
	    };
	    dataFactory.VerifyMobile = function (param) {
	    	//console.log(param);
	    	return Transporter.post('verify', param).then(function(response) {
                return response;
            });
	    	
	    };
        dataFactory.updateUser = function (param) {
	    	//console.log(param);
	    	return Transporter.post('update_user', param).then(function(response) {
	    		//console.log(response);
                return response;
            });
	    	
	    };
	    dataFactory.getDiscussionDetails = function () {
	    	return Transporter.get('discussionAll').then(function(response) {
	    		//console.log(response);
                return response;
            });
	    	
	    };
		dataFactory.getFbFriendsCount = function () {
	    	return $facebook.api('/me/friends');
	    };
	    dataFactory.getUserDetails = function (uid) {
	    	// console.log(uid);
	    	var fbUrl = 'usersAll/' + uid;
	        return Transporter.get(fbUrl);
	    };
	    dataFactory.getLinkedinProffesionaldetails = function (uid) {
	    	// console.log(uid);
	    	var linUrl = 'getProffesionaldetails/' + uid;
	        return Transporter.get(linUrl);
	    };
	  dataFactory.getLinkedinUserDetails = function (uid) {
	    	//console.log(uid);
	    	var fbUrl = 'linkedinUsers/' + uid;
	        return Transporter.get(fbUrl);
	    };
	    dataFactory.getdiscussionTopicDetails = function (discussionid) {	     
	    	return Transporter.get('discussionTopicAll/'+discussionid).then(function(response) {	    		
                return response;
            });
	    	
	    };

	    //getdiscussionListTopicName

	     dataFactory.getdiscussionListTopicName = function (topicid) {	
	     	return Transporter.get('getdiscussionListTopicName/'+ topicid).then(function(response) {
                return response;
            });	
	    };

	      //getdiscussionTopicName

	     dataFactory.getdiscussionTopicName = function (topicid) {	
	     	return Transporter.get('getdiscussionTopicName/'+ topicid).then(function(response) {
                return response;
            });	
	    };



	      dataFactory.getdiscussionTopicComments = function (topic) {	     
	    	return Transporter.get('discussionTopicComments/'+topic).then(function(response) {	    		
                return response;
            });
	    	
	    };

	     dataFactory.setCommentsLike = function (commentId) {	     
	    	return Transporter.get('setCommentLikes/'+commentId).then(function(response) {	    		
                return response;
            });
	    	
	    };

	     dataFactory.saveComments = function (comment) {	
	     	return Transporter.post('saveComments', comment).then(function(response) {
                return response;
            });	
	    };
	    
  	 dataFactory.saveDiscussionBoardAbuse = function (param) {	
  	 		//console.log(param);
	     	return Transporter.post('saveDiscussionBoardAbuse', param).then(function(response) {
                return response;
            });	
	    };
	    

	      dataFactory.addTopic = function (param) {	
	     	return Transporter.post('add_topic', param).then(function(response) {
                return response;
            });	
	    };


	     dataFactory.deleteComment = function (param) {	
	     	return Transporter.get('deleteComment/'+ param).then(function(response) {
                return response;
            });	
	    };
	    dataFactory.getProfileDetail = function () {	
	     	return Transporter.get('get_Profile_Detail').then(function(response) {
                return response;
            });	
	    };
	    dataFactory.getEditProfileDetail = function () {	
	     	return Transporter.get('get_Edit_Profile_Detail').then(function(response) {
                return response;
            });	
	    };
	    dataFactory.getProfileDetailOther = function (id) {	
	     	return Transporter.get('get_Profile_Detail_Other/'+id).then(function(response) {
                return response;
            });	
	    };
	    dataFactory.updateProfileDetail = function (param) {
	    	//console.log(param);
	    	return Transporter.post('update_Profile_Detail', param).then(function(response) {
	    		// console.log(response);
                return response;
            });
	    	
	    };
	    dataFactory.addUserDiscussion = function (param) {
	    	// console.log(param);
	    	return Transporter.post('add_User_Discussion', param).then(function(response) {
	    		//console.log(response);
                return response;
            });
	    	
	    };
	    dataFactory.getTotalMembers = function (discussionid) {	     
	    	return Transporter.get('get_Total_Members/'+discussionid).then(function(response) {	    		
                return response;
            });
	    	
	    };
	    dataFactory.removeUser = function (discussionid) {	     
	    	return Transporter.get('remove_User/'+discussionid).then(function(response) {	    		
                return response;
            });
	    	
	    };
	    dataFactory.getTotalComments = function (discussionid) {	     
	    	return Transporter.get('get_Total_Comments/'+discussionid).then(function(response) {	    		
                return response;
            });
	    	
	    };
	    dataFactory.userJoined = function (discussionid) {	     
	    	return Transporter.get('user_Joined/'+discussionid).then(function(response) {	    		
                return response;
            });
	    	
	    };
	    dataFactory.insertRating = function (rating) {	     
	    	return Transporter.post('insert_Rating',rating).then(function(response) {	    		
                return response;
            });
	    	
	    };
	    dataFactory.getRating = function (topicid) {	
	     	return Transporter.get('get_Rating/'+ topicid).then(function(response) {
                return response;
            });	
	    };
	     dataFactory.getPicture = function (id) {	
	     	return Transporter.get('get_Picture/'+ id).then(function(response) {
                return response;
            });	
	    };
	    dataFactory.getProfilePictures = function (discussionid) {	     
	    	return Transporter.get('get_ProfilePictures/'+discussionid).then(function(response) {	    		
                return response;
            });
	    	
	    };
	    dataFactory.getPicturesComments = function (topicid) {	     
	    	return Transporter.get('get_PicturesComments/'+topicid).then(function(response) {	    		
                return response;
            });
	    	
	    };
	    dataFactory.getTotalMemberFromAllDiscussion = function () {	
	     	return Transporter.get('get_TotalMemberFromAllDiscussion').then(function(response) {
                return response;
            });	
	    };
	    dataFactory.getTotalNotification = function (param) {	
	     	return Transporter.get('get_Total_Notification/'+param).then(function(response) {
                return response;
            });	
	    };
	    dataFactory.getTotalSysMessage = function (param) {	
	     	return Transporter.get('get_total_sys_message/'+param).then(function(response) {
                return response;
            });	
	    };
	    dataFactory.getTotalMessage = function (param) {	
	     	return Transporter.get('get_total_message/'+param).then(function(response) {
                return response;
            });	
	    };
	    dataFactory.getTotalForumMessage = function (param) {	
	     	return Transporter.get('get_total_forum_message/'+param).then(function(response) {
                return response;
            });	
	    };
	    dataFactory.sysMarkMessage = function () {	
	     	return Transporter.get('sys_mark_message').then(function(response) {
                return response;
            });	
	    };
	    dataFactory.MarkMessage = function () {	
	     	return Transporter.get('mark_message').then(function(response) {
                return response;
            });	
	    };
	    dataFactory.forumMarkMessage = function () {	
	     	return Transporter.get('forum_mark_message').then(function(response) {
                return response;
            });	
	    };
	    
	    dataFactory.resendActCode = function (param) {
	    	//console.log(param);
	    	var data = 'fb_id=' + param.id;
	    	return Transporter.post('resend_code', param).then(function(response) {
                return response;
            });	    	
	    };
	    dataFactory.getRecomendations = function () {	
	     	return Transporter.get('get_Recomendations').then(function(response) {
                return response;
            });	
	    };
	    
	    dataFactory.getHomeData = function () {	
	     	return Transporter.get('get_home_data').then(function(response) {
                return response;
            });	
	    };
	    dataFactory.addContact = function (param) {	
	     	return Transporter.post('add_Contact_us', param).then(function(response) {
                return response;
            });	
	    };
	    dataFactory.getMyRecommendations = function () {	
	     	return Transporter.get('get_my_recommendation').then(function(response) {
                return response;
            });	
	    };
	    
	    return dataFactory;
	}]);
