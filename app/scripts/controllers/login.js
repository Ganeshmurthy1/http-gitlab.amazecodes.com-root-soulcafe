'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('LoginCtrl', function ($scope,$facebook, regService, localStorageService, $location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    
    $scope.logout = function() {
    	localStorageService.set('authorizationData', {
            fb_id: '',
            user_id: '',
            userName: ''
        });
    	$scope.loggedin = false;
    	$location.path('/');
      };
  });
