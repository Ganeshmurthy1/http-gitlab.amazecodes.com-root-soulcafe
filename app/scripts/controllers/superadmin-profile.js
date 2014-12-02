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
  });
