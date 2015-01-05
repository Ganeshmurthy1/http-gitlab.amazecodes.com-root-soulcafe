'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:AdminBlockedUsersCtrl
 * @description
 * # AdminBlockedUsersCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('AdminBlockedUsersCtrl', function ($scope, adminOperations) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    function loadBlockedUsers() {
	  adminOperations.adminGetBlockedUsers().then(function (response) {
			 $scope.comm = response.data;
	  });
    }
   
    $scope.activateUser = function(id) {  
    	adminOperations.adminActivateUser(id).then(function (total) {    			
    		loadBlockedUsers();
    	});
    };
    
    loadBlockedUsers();
  });
