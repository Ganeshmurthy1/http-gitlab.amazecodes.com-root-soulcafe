'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:AdminUserlistCtrl
 * @description
 * # AdminUserlistCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('AdminUserlistCtrl', function ($scope, adminOperations) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    function loadAllusers() {
	    adminOperations.adminGetAllUsers().then(function (response) {
			 $scope.comm = response.data;
		});
    }
    
    $scope.deactivateUser = function(id) {  
    	adminOperations.admindeActivateUser(id).then(function (total) {    			
    		loadAllusers();
    	});
    };
    
    loadAllusers();

  });
