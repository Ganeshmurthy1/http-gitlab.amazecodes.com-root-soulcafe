'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:SuperadminAdminCtrl
 * @description
 * # SuperadminAdminCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('SuperadminAdminCtrl', function ($scope,adminOperations) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


    function getadmin(){
	    adminOperations.getAllAdmins().then(function (response) {
				$scope.admins = response.data;
		});
    }

     $scope.activateAdminUser = function(id){
    	
    	adminOperations.activateUser(id).then(function (response) {
		
			if (response.data == 'true'){
				getadmin();
			}
		});
    }

    $scope.deactivateAdminUser = function(id){
    	
    	adminOperations.deactivateUser(id).then(function (response) {
			
			if (response.data == 'true'){
				getadmin();
			}
		});
    }
    getadmin();
  });
