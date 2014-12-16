'use strict';

/**
 * @ngdoc service
 * @name sassApp.profileOperations
 * @description
 * # profileOperations
 * Factory in the sassApp.
 */
angular.module('sassApp')
  .factory('profileOperations',['$http', 'localStorageService', function($http, localStorageService) {
    
    var urlBase = localStorageService.get('apiContext').base_path;
    var dataFactory = {};

    dataFactory.getUserMatch = function () { 
          return $http.get(urlBase + 'get_UserMatch').then(function(response) {
          //console.log(response);
                return response;
            });  
     };
     dataFactory.getBuddies = function () { 
          return $http.get(urlBase + 'get_Buddies').then(function(response) {
          //console.log(response);
                return response;
            });  
     };
     dataFactory.getBuddiesAll = function () { 
          return $http.get(urlBase + 'get_Buddies_All').then(function(response) {
          //console.log(response);
                return response;
            });  
     };
     dataFactory.getForumUpdates = function () { 
          return $http.get(urlBase + 'get_ForumUpdates').then(function(response) {
          //console.log(response);
                return response;
            });  
     };
     dataFactory.getforumsOther = function (id) { 
          return $http.get(urlBase + 'get_forumsOther/'+ id).then(function(response) {
          //console.log(response);
                return response;
            });  
     };
     dataFactory.addGTKYRequest = function (param) { 
          return $http.post(urlBase + 'add_GTKYRequest',param).then(function(response) {
          //console.log(response);
                return response;
            });  
     };
     dataFactory.checkGTKYRequest = function (id) { 
          return $http.get(urlBase + 'check_GTKYRequest/'+ id).then(function(response) {
          //console.log(response);
                return response;
            });  
     };
    dataFactory.addAbuseUser = function (param) { 
          return $http.post(urlBase + 'add_AbuseUser',param).then(function(response) {
          //console.log(response);
                return response;
            });  
     };
    dataFactory.checkAbuseUser = function (id) { 
          return $http.get(urlBase + 'check_AbuseUser/'+ id).then(function(response) {
          //console.log(response);
                return response;
            });  
     };
     dataFactory.getUserSendedGTKY = function () { 
          return $http.get(urlBase + 'get_UserSendedGTKY').then(function(response) {
          //console.log(response);
                return response;
            });  
     };
     dataFactory.acceptGTKY = function (id) { 
          return $http.get(urlBase + 'accept_GTKY/'+ id).then(function(response) {
          //console.log(response);
                return response;
            });  
     };
     dataFactory.rejectGTKY = function (id) { 
          return $http.get(urlBase + 'reject_GTKY/'+ id).then(function(response) {
          //console.log(response);
                return response;
            });  
     };
     
     dataFactory.getMyMatch = function (id) { 
         return $http.get(urlBase + 'alg_processor_one_one/'+ id).then(function(response) {
         //console.log(response);
               return response;
           });  
    };
     dataFactory.getMyProfileDetails = function () { 
         return $http.get(urlBase + 'get_MyProfileDetails').then(function(response) {
         //console.log(response);
               return response;
           });  
    };
    dataFactory.getCommentLike = function (id) { 
         return $http.get(urlBase + 'get_CommentLike/'+ id).then(function(response) {
         //console.log(response);
               return response;
           });  
    };
    return dataFactory;
  }]);
