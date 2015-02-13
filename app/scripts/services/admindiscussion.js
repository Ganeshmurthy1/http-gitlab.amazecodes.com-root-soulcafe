'use strict';

/**
 * @ngdoc service
 * @name sassApp.adminDiscussion
 * @description
 * # adminDiscussion
 * Factory in the sassApp.
 */
angular.module('sassApp')
  .factory('adminDiscussion', ['Transporter', 'localStorageService', 'FileUploader', function(Transporter, localStorageService, FileUploader ) {
	  	
	  
	   // var urlBase = localStorageService.get('apiContext').base_path;
	    var dataFactory = {};
	    
	    dataFactory.setUploader = function () {
	    	// console.log(param);
	    	return new FileUploader({
	            url: '/SASS/api/image_upload'
	        });
	    	
	    };	    
	    dataFactory.setUploader = function () {
	    	// console.log(param);
	    	return new FileUploader({
	            url: '/SASS/api/image_upload',
	        });
	    	
	    };
	    
	    dataFactory.addDiscussion = function (param) {
	    	// console.log(param);
	    	return Transporter.post('admin_add_discussion', param).then(function(response) {
	    		//console.log(response);
                return response;
            });
	    	
	    };
	    dataFactory.getAdminDiscussionTotal = function (param) {
	    	// console.log(param);
	    	return Transporter.post('admin_get_discussion_total').then(function(response) {
	    		//console.log(response);
                return response;
            });	    	
	    };
	    dataFactory.getdiscussionTopicDetail = function (param) {
	    	// console.log(param);
	    	return Transporter.get('admin_get_discussion_topic/' + param).then(function(response) {
	    		//console.log(response);
                return response;
            });	    	
	    };
	    
	    dataFactory.getAdminDiscussion = function (param) {
	    	// console.log(param);
	    	return Transporter.post('admin_get_discussion', param).then(function(response) {
	    		//console.log(response);
                return response;
            });	    	
	    };
	    dataFactory.updatediscussionTopicDetail = function (param) {
	    	// console.log(param);
	    	return Transporter.post('update_discussion_TopicDetail', param).then(function(response) {
	    		//console.log(response);
                return response;
            });	    	
	    };
	    dataFactory.adminDeleteDiscussion = function (param) {
	    	//console.log(param);
	    	var fbUrl = 'admin_delete_discussion/' + param;
	        return Transporter.get(fbUrl);
	    };
	    dataFactory.adminActivateDiscussion = function (param) {
	    	//console.log(param);
	    	var fbUrl = 'admin_activate_discussion/' + param;
	        return Transporter.get(fbUrl);
	    };
	    dataFactory.adminDeActivateDiscussion = function (param) {
	    	//console.log(param);
	    	var fbUrl = 'admin_deactivate_discussion/' + param;
	        return Transporter.get(fbUrl);
	    };
	    
	    dataFactory.getAdminForumThis = function (param) {
	    	// console.log(param);
	    	return Transporter.get('admin_get_topic_this/' + param).then(function(response) {
	    		//console.log(response);
                return response;
            });	    	
	    };
	    
	    dataFactory.getAdminTopicTotal = function (param) {
	    	// console.log(param);
	    	return Transporter.get('admin_get_topic_total/' + param).then(function(response) {
	    		//console.log(response);
                return response;
            });	    	
	    };
	    
	    dataFactory.getAdminTopic = function (param) {
	    	// console.log(param);
	    	return Transporter.post('admin_get_topic', param).then(function(response) {
	    		//console.log(response);
                return response;
            });	    	
	    };
	    
	    dataFactory.addTopic = function (param) {
	    	// console.log(param);
	    	return Transporter.post('admin_add_topic', param).then(function(response) {
	    		//console.log(response);
                return response;
            });
	    	
	    };
	    
	    dataFactory.adminDeleteTopic = function (param) {
	    	//console.log(param);
	    	var fbUrl = 'admin_delete_topic/' + param;
	        return Transporter.get(fbUrl);
	    };
	    dataFactory.adminActivateTopic = function (param) {
	    	//console.log(param);
	    	var fbUrl = 'admin_activate_topic/' + param;
	        return Transporter.get(fbUrl);
	    };
	    dataFactory.adminDeActivateTopic = function (param) {
	    	//console.log(param);
	    	var fbUrl = 'admin_deactivate_topic/' + param;
	        return Transporter.get(fbUrl);
	    };
	    dataFactory.adminAbuseList = function () {	
	      	return Transporter.get('adminAbuseList').then(function(response) {
	    		//console.log(response);
                return response;
            });	 
	 
	    };
	    dataFactory.updateAppropriate = function (param) {
	    	// console.log(param);
	    	return Transporter.get('update_Appropriate/'+ param).then(function(response) {
	    		//console.log(response);
                return response;
            });	    	
	    };
	    dataFactory.updateInAppropriate = function (param) {
	    	// console.log(param);
	    	return Transporter.get('update_InAppropriate/'+ param).then(function(response) {
	    		//console.log(response);
                return response;
            });	    	
	    };
	    dataFactory.getforum = function (discussionid) {	     
	    	return Transporter.get('get_forum/'+discussionid).then(function(response) {	    		
                return response;
            });
	    	
	    };
	    dataFactory.editforum = function (param) {	  
	    console.log(param);   
	    	return Transporter.post('edit_forum', param).then(function(response) {	    		
                return response;
            });
	    	
	    };
    
	    dataFactory.getAdminBadList = function () {
	    	// console.log(param);
	    	return Transporter.post('admin_get_bad_list').then(function(response) {
	    		//console.log(response);
                return response;
            });	    	
	    };
	    dataFactory.adminNotASpam = function (param) {
	    	//console.log(param);
	    	var fbUrl = 'admin_not_spam/' + param;
	        return Transporter.get(fbUrl);
	    };
	    dataFactory.adminMarkAsSpam = function (param) {
	    	//console.log(param);
	    	var fbUrl = 'admin_mark_spam/' + param;
	        return Transporter.get(fbUrl);
	    };
	    dataFactory.adminInappropriateComment = function () {	
	      	return Transporter.get('adminInappropriateComment').then(function(response) {
	    		//console.log(response);
                return response;
            });	 
	      };
	    dataFactory.getRequestedTopic = function () {	
	      	return Transporter.get('get_RequestedTopic').then(function(response) {
	    		//console.log(response);
                return response;
            });	 
	      };
	    return dataFactory;
	}]);

