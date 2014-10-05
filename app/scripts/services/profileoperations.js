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
    return dataFactory;
  }]);
