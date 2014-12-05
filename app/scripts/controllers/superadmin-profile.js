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
	//console.log(authData);
    if(authData.admin_role == 1) {
    	$scope.isSuper = true;
    }

adminOperations.adminGetAllProfileData().then(function (response) {
      console.log(response.data);
       $scope.admin = response.data.admins;
       $scope.act = response.data.active;
       $scope.blk = response.data.blocked;
       $scope.un = response.data.unread;
       console.log($scope.admin[0].admins);
    });

  });
