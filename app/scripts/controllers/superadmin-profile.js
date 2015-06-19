'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:SuperadminProfileCtrl
 * @description
 * # SuperadminProfileCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('SuperadminProfileCtrl', function ($scope, adminOperations, localStorageService, config) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

     config.setConfigruation();

    var authData = localStorageService.get('authorizationData');
	
    if(authData.admin_role == 1) {
    	$scope.isSuper = true;
    }

adminOperations.adminGetAllProfileData().then(function (response) {
     
       $scope.admin = response.data.admins;
       $scope.act = response.data.active;
       $scope.blk = response.data.blocked;
       $scope.un = response.data.unread;
       
    });

  });
