'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:LeftBarpCtrl
 * @description
 * # LeftBarpCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('LeftBarpCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

     $scope.LeftBarOther = 'views/left-barp.html';
  });
