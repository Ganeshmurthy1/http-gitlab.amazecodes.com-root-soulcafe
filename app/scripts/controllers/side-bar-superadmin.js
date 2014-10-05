'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:SideBarSuperadminCtrl
 * @description
 * # SideBarSuperadminCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('SideBarSuperadminCtrl', function ($scope, adminOperations, localStorageService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.SideBarSuperAdmin = 'views/side-bar-superadmin.html';
    $scope.isAdmin = false;
    var authData = localStorageService.get('authorizationData');
    if(authData.user_role == 1) {
    	$scope.isAdmin = true;
      $scope.isUser = true;
    }
  });
