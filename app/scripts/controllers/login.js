'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('LoginCtrl', function ($scope,$facebook,$rootScope, regService, localStorageService, $location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
   $rootScope.loggedin = false;
   var authData = localStorageService.get('authorizationData');
   if (authData != null){
       $rootScope.loggedin = true;
   }
    $scope.logout = function() {
    	localStorageService.clearAll();
    	$rootScope.loggedin = false;
      
    	$location.path('/');
      };
      $scope.adminLogout = function() {
      	localStorageService.clearAll();
      	$rootScope.loggedin = false;
        $location.path('/admin');
      };
  });
