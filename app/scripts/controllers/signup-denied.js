'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:SignupDeniedCtrl
 * @description
 * # SignupDeniedCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('SignupDeniedCtrl', function ($scope, localStorageService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

     var deniedMessage = localStorageService.get('signupDeniedMessage');
    $scope.message = deniedMessage.message;
  });
