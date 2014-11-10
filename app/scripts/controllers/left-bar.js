'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:LeftBarCtrl
 * @description
 * # LeftBarCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('LeftBarCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.LeftBar = 'views/left-bar.html';
  });
