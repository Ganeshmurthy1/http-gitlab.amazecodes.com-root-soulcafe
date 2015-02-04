'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:Header1Ctrl
 * @description
 * # Header1Ctrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('Header1Ctrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


    $scope.Header1 = 'views/header1.html';

    
  });
