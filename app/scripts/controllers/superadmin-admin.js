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
				console.log(response.data);
				$scope.admins = response.data;
		});
    }

     $scope.activateUser = function(id){
    	console.log(id);
    	adminOperations.activateUser(id).then(function (response) {
			console.log(response.data);
			if (response.data == 'true'){
				getadmin();
			}
		});
    }

    $scope.deactivateUser = function(id){
    	console.log(id);
    	adminOperations.deactivateUser(id).then(function (response) {
			console.log(response.data);
			if (response.data == 'true'){
				getadmin();
			}
		});
    }
    getadmin();
  });
