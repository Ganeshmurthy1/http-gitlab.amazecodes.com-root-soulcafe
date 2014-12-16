'use strict';

/**
 * @ngdoc function
 * @name sassApp.controller:LeftbarQuizCtrl
 * @description
 * # LeftbarQuizCtrl
 * Controller of the sassApp
 */
angular.module('sassApp')
  .controller('LeftbarQuizCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.LeftBar = 'views/leftbar-quiz.html';
  });
