'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:HeaderSignupCtrl
 * @description
 * # HeaderSignupCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('HeaderSignupCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    $scope.Header = 'views/header-signup.html';
  });
