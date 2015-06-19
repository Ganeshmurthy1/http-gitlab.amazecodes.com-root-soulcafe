'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:LeftbarSignupCtrl
 * @description
 * # LeftbarSignupCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('LeftbarSignupCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.LeftBar = 'views/leftbar-signup.html';
  });
