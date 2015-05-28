'use strict';

/**
 * @ngdoc service
 * @name sassApp.adminOperations
 * @description
 * # adminOperations
 * Factory in the sassApp.
 */
angular.module('sassApp')
  .factory('adminOperations', ['Transporter', 'localStorageService', function(Transporter, localStorageService) {
	  	
	  
	    //var urlBase = localStorageService.get('apiContext').base_path;
	    var dataFactory = {};
	    dataFactory.signIn = function (param) {
	    	// console.log(param);
	    	return Transporter.post('admin_login', param).then(function(response) {
	    		//console.log(response);
                return response;
            });	    	
	    };
	    dataFactory.adminGetTotalUsersCount = function () {	
	      	return Transporter.get('admin_get_all_users_count').then(function(response) {
	    		//console.log(response);
                return response;
            });	 
	      };
	    
	    dataFactory.adminGetAllUsers = function () {	
	      	return Transporter.get('admin_get_all_users').then(function(response) {
	    		//console.log(response);
                return response;
            });	 
	      };
	      dataFactory.adminGetAllUsersPagination = function (param) {	    	  
	    	  return Transporter.post('admin_get_all_users_page', param).then(function(response) {
		    		//console.log(response);
	                return response;
	            });	   		      	
		  };
	    dataFactory.adminGetBlockedUsers = function () {	
		      	return Transporter.get('admin_get_blocked_users').then(function(response) {
		    		//console.log(response);
	                return response;
	            });	 
		  };
		 dataFactory.adminActivateUser = function (param) {
		    	//console.log(param);
		    	var fbUrl = 'admin_activate_user/' + param;
		        return Transporter.get(fbUrl);
		  };
		  dataFactory.admindeActivateUser = function (param) {
		    	//console.log(param);
		    	var fbUrl = 'admin_deactivate_user/' + param;
		        return Transporter.get(fbUrl);
		  };
		  
		  dataFactory.adminGetAllMessage = function () {	
		      	return Transporter.get('admin_get_all_message').then(function(response) {
		    		//console.log(response);
	                return response;
	            });	 
		      };
	      dataFactory.getMyMessage = function () {	
		      	return Transporter.get('get_my_message').then(function(response) {
		    		//console.log(response);
	                return response;
	            });	 
		  };
		  dataFactory.getPictureAndName = function (id) {	
		     	return Transporter.get('get_picture_name/'+ id).then(function(response) {
	                return response;
	            });	
		    };
	     dataFactory.sentMessage = function (comment) {	
	     	return Transporter.post('sent_message', comment).then(function(response) {
                return response;
            });	
	    };
	    dataFactory.getAllForum = function () {	
	      	return Transporter.get('get_all_forum').then(function(response) {
	    		//console.log(response);
                return response;
            });	 
	      };
	      dataFactory.addAdmin = function (param) {
		    	// console.log(param);
		    	return Transporter.post('admin_add_admin', param).then(function(response) {
		    		//console.log(response);
	                return response;
	            });
		};
		dataFactory.getAllAdmins = function () {	
	      	return Transporter.get('get_all_admins').then(function(response) {
	    		//console.log(response);
                return response;
            });	 
	    };
		dataFactory.adminGetMyForums = function () {	
		      	return Transporter.get('admin_get_my_forums').then(function(response) {
		    		//console.log(response);
	                return response;
	            });	 
		};
		dataFactory.activateUser = function (id) {	
		     	return Transporter.get('activate_user/'+ id).then(function(response) {
	                return response;
	            });	
		};
		dataFactory.deactivateUser = function (id) {	
		     	return Transporter.get('deactivate_user/'+ id).then(function(response) {
	                return response;
	            });	
		};
		dataFactory.getAdminData = function (id) {	
		     	return Transporter.get('get_admin_data/'+ id).then(function(response) {
	                return response;
	            });	
		};
		dataFactory.updateAdminData = function (param) {
		    	// console.log(param);
		    	return Transporter.post('update_admin_data', param).then(function(response) {
		    		//console.log(response);
	                return response;
	            });
		};
		dataFactory.viewProfileData = function (id) {	
		     	return Transporter.get('view_profile_data/'+ id).then(function(response) {
	                return response;
	            });	
		};
		dataFactory.userActivate = function (id) {	
		     	return Transporter.get('user_activate/'+ id).then(function(response) {
	                return response;
	            });	
		};
		dataFactory.userDeactivate = function (id) {	
		     	return Transporter.get('user_deactivate/'+ id).then(function(response) {
	                return response;
	            });	
		};
		dataFactory.deleteQuestion = function (id) {
		console.log(id);	
		     	return Transporter.get('delete_Question/'+ id).then(function(response) {
	                return response;
	            });	
		};
		
		dataFactory.adminGetThisUser = function (id) {	
	     	return Transporter.get('admin_get_this_user/'+ id).then(function(response) {
                return response;
            });	
		};
		dataFactory.addAdminMessage = function (param) {
	    	// console.log(param);
	    	return Transporter.post('admin_add_message', param).then(function(response) {
	    		//console.log(response);
                return response;
            });
		};
		dataFactory.getSysMessage = function () {	
	      	return Transporter.get('get_sys_message').then(function(response) {
	    		//console.log(response);
                return response;
            });	 
	  };
	  dataFactory.getAllQuestions = function () {	
	      	return Transporter.get('get_all_questions').then(function(response) {
	    		//console.log(response);
              return response;
          });	 
	    };
	    dataFactory.updateQuestionSeq = function (param) {
	    	// console.log(param);
	    	return Transporter.post('update_Question_Seq', param).then(function(response) {
	    		//console.log(response);
                return response;
            });
		};
		dataFactory.viewStatusAbuse = function (id) {
	    	// console.log(param);
	    	return Transporter.get('view_StatusAbuse/'+ id).then(function(response) {
	    		//console.log(response);
                return response;
            });
		};
		dataFactory.adminGetAllProfileData = function (id) {
	    	// console.log(param);
	    	return Transporter.get('admin_GetAllProfileData').then(function(response) {
	    		//console.log(response);
                return response;
            });
		};
		dataFactory.addRestrictionFeeling = function (param) {
	    	// console.log(param);
	    	return Transporter.post('add_RestrictionFeeling', param).then(function(response) {
	    		//console.log(response);
                return response;
            });
		};
		dataFactory.getRestrictionFeeling = function () {
	    	// console.log(param);
	    	return Transporter.post('get_RestrictionFeeling').then(function(response) {
	    		//console.log(response);
                return response;
            });
		};
		dataFactory.heartStatics = function () {
	    	// console.log(param);
	    	return Transporter.get('heart_Statics').then(function(response) {
	    		//console.log(response);
                return response;
            });
		};
		dataFactory.searchHeartStatics = function (param) {
	    	console.log(param);
	    	return Transporter.post('search_HeartStatics', param).then(function(response) {
	    		//console.log(response);
                return response;
            });
		};
		dataFactory.getContactUs = function () {
	    	// console.log(param);
	    	return Transporter.get('get_ContactUs').then(function(response) {
	    		//console.log(response);
                return response;
            });
		};
		dataFactory.getContactDetail = function (id) {
	    	 // console.log(id);
	    	return Transporter.get('get_ContactDetail/'+ id).then(function(response) {
	    		// console.log(response);
                return response;
            });
		};
	    return dataFactory;
	}]);


